import { formatCurrency } from "../../utils/helpers";
import RemoveItem from "./RemoveItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

/* eslint-disable-next-line react/prop-types */
function CartItem({ item }) {
  /* eslint-disable-next-line react/prop-types */
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 text-sm sm:flex sm:items-center sm:justify-between sm:text-base">
      <p className="italic">
        <span>{quantity}&times;</span>&nbsp;
        {name}
      </p>
      <div className="flex items-center justify-between text-sm font-semibold sm:gap-6 sm:text-base">
        <p>{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={quantity} />
        <RemoveItem pizzaId={pizzaId}>Remove</RemoveItem>
      </div>
    </li>
  );
}

export default CartItem;
