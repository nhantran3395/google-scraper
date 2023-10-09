import { ReactNode } from "react";

import useUser from "lib/use-auth.hook";

import NavigationBar from "../navigation-bar";

type AuthenticatedLayoutProps = {
  children: ReactNode;
};

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const { signOut } = useUser({
    redirectTo: "/login",
  });

  return (
    <main className={"min-h-screen bg-slate-50 flex flex-1"}>
      <div className="h-full w-full">
        <NavigationBar signOut={signOut} />
        <article className="mx-auto max-w-7xl py-6 px-6 sm:px-6 lg:px-8">
          {children}
        </article>
      </div>
    </main>
  );
}
