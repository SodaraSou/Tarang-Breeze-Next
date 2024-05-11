import UserLayout from "./UserLayout";
import Spinner from "@/components/Spinner";

function loading() {
  return (
    <>
      <Spinner fullScreenSpinner={true} />
    </>
  );
}

export default loading;
