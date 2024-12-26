import { formatCurrency } from '../../utils/helpers';

// eslint-disable-next-line
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  // eslint-disable-next-line
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-2">
      <div className="flex items-center justify-between gap-5 text-sm sm:text-base">
        <div className="space-y-1 italic">
          <span className="font-bold">{quantity}&times;</span> {name}
          <p className="text-xs capitalize text-stone-500 sm:text-sm">
            {/* eslint-disable-next-line */}
            {isLoadingIngredients ? 'Loading ingredients...' : ingredients.join(', ')}
          </p>
        </div>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
