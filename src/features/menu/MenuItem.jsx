import { useDispatch, useSelector } from "react-redux";

import Button from "../../ui/Button";
import RemoveItem from "../cart/RemoveItem";
import { formatCurrency } from "../../utils/helpers";
import { actions, getCurrentQuantityById } from "../cart/cartSlice";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

// eslint-disable-next-line react/prop-types
function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line react/prop-types
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(actions.addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="text-sm font-medium sm:text-base">{name}</p>
        {/* eslint-disable-next-line react/prop-types */}
        <p className="text-sm capitalize italic text-stone-500 sm:text-base">
          {/* eslint-disable-next-line react/prop-types */}
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between font-bold">
          {!soldOut ? (
            <p className="text-sm text-green-700 sm:text-base">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-sm uppercase text-red-500 sm:text-base">
              Sold out
            </p>
          )}
          {currentQuantity > 0 ? (
            <div className="flex gap-5">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <RemoveItem pizzaId={id}>Remove</RemoveItem>
            </div>
          ) : (
            <Button type="small" disabled={soldOut} onClick={handleAddToCart}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
