import UserLayout from "./UserLayout";
import Spinner from "@/components/Spinner";

function loading() {
  return (
    <UserLayout>
      <div className="h-screen">
        <Spinner fullScreenSpinner={true} />
      </div>
    </UserLayout>
  );
}

export default loading;
