import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const error = useRouteError();

  return (
    <div className="py-5 px-3">
      <h1 className="text-3xl font-bold tracking-widest">Error</h1>
      <h1 className="mt-5">Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <LinkButton className="mt-5" to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
