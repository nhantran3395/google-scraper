import Link from "next/link";

import useUser from "../../lib/use-auth.hook";
import NavigationBar from "../common/navigation-bar";

import KeywordGrid from "./keyword-grid";

export default function KeywordsPageContainer() {
  const { signOut } = useUser({
    redirectTo: "/login",
  });

  return (
    <div className="h-full w-full">
      <NavigationBar signOut={signOut} />
      <article className="mx-auto max-w-7xl py-6 px-6 sm:px-6 lg:px-8">
        <section>
          <Link
            href="/"
            className="text-sm leading-6 relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            Back to uploads
          </Link>
        </section>
        <section className="mt-4">
          <KeywordGrid />
        </section>
      </article>
    </div>
  );
}
