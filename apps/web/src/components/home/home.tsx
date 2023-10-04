import useUser from "../../lib/use-auth.hook.ts";
import NavigationBar from "../common/navigation-bar";

import FileUpload from "./file-upload";

export default function HomeContainer() {
  const { signOut } = useUser({
    redirectTo: "/login",
  });

  return (
    <div className="h-full w-full">
      <NavigationBar signOut={signOut} />
      <div className="mx-auto max-w-7xl py-6 px-6 sm:px-6 lg:px-8">
        <FileUpload />
      </div>
    </div>
  );
}