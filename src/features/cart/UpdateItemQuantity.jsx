import { useDispatch } from "react-redux";

import Button from "../../ui/Button";
import { actions } from "./cartSlice";

/* eslint-disable-next-line react/prop-types */
function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  function handleDecreaseItemQuantity() {
    dispatch(actions.decreaseItemQuantity(pizzaId));
  }

  function handleIncreaseItemQuantity() {
    dispatch(actions.increaseItemQuantity(pizzaId));
  }

  return (
    <div className="flex items-center gap-3 md:gap-4">
      <Button type="round" onClick={handleDecreaseItemQuantity}>
        -
      </Button>
      <p>{currentQuantity}</p>
      <Button type="round" onClick={handleIncreaseItemQuantity}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
