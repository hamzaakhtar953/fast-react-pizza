import { useDispatch } from "react-redux";

import Button from "../../ui/Button";
import { actions } from "./cartSlice";

/* eslint-disable-next-line react/prop-types */
function RemoveItem({ pizzaId, children }) {
  const dispatch = useDispatch();

  function handleRemoveItem() {
    dispatch(actions.removeItem(pizzaId));
  }

  return (
    <Button type="small" onClick={handleRemoveItem}>
      {children}
    </Button>
  );
}

export default RemoveItem;
