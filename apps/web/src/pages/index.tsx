import NavigationBar from "../components/common/navigation-bar";
import useUser from "../lib/use-auth.hook.ts";

export default function ScrapperHome() {
  const { signOut } = useUser({
    redirectTo: "/login",
  });

  return (
    <div className="h-full w-full">
      <NavigationBar signOut={signOut} />

      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {/* Your content */}
      </div>
    </div>
  );
}
