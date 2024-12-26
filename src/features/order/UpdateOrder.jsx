import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

// eslint-disable-next-line
function UpdateOrder() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';

  return (
    <fetcher.Form className="sm:text-right" method="PATCH">
      <Button
        type="primary"
        disabled={isSubmitting}
        extraStyles="w-full text-sm sm:w-fit"
      >
        {isSubmitting ? 'Updating order...' : 'Make Priority'}
      </Button>
    </fetcher.Form>
  );
}

export async function action({ params }) {
  const payload = { priority: true };
  await updateOrder(params.orderId, payload);
  return null;
}

export default UpdateOrder;
