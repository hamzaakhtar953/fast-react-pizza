import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';

import store from '../../store';
import Button from '../../ui/Button';
import EmptyCart from '../cart/EmptyCart';
import { formatCurrency } from '../../utils/helpers';
import { createOrder } from '../../services/apiRestaurant';
import { actions, getCart, getTotalPrice } from '../cart/cartSlice';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export default function CreateOrder() {
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);
  const formErrors = useActionData();
  const navigation = useNavigation();
  const cart = useSelector(getCart);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';
  const isAddressError = addressStatus === 'error';

  const totalCartPrice = useSelector(getTotalPrice);
  const priorityPrice = 1.2;
  const finalPrice = withPriority
    ? totalCartPrice * priorityPrice
    : totalCartPrice;

  const isSubmitting = navigation.state === 'submitting';

  function handleFetchPosition(evt) {
    // We need to call evt.preventDefault() here
    // otherwise this will trigger form submission
    evt.preventDefault();

    dispatch(fetchAddress());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-bold">Ready to order? Let&apos;s go!</h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            defaultValue={username}
          />
        </div>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="sm:grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="ml-2 mt-1 text-xs font-medium text-red-400 sm:text-sm">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>
        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="sm:grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              defaultValue={address}
              disabled={isLoadingAddress}
              required
            />
            {isAddressError && (
              <p className="ml-2 mt-1 text-xs font-medium text-red-400 sm:text-sm">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span
              className={`absolute bottom-[3px] right-1.5 z-50 sm:bottom-1.5 ${isAddressError && 'top-[2.18rem] sm:top-[5px]'}`}
            >
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={handleFetchPosition}
              >
                📍
              </Button>
            </span>
          )}
        </div>
        <div className="mb-12 flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-600 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Do you want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? 'Placing order...'
              : `Order now from ${formatCurrency(finalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone =
      'Invalid phone number provided. We may need to contact you later';
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  // Do NOT overuse this technique. This will deactivate
  // some performance optimizations on this page by redux
  store.dispatch(actions.clearCart());

  // if no errors, create order and redirect
  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}
