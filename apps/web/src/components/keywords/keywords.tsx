import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";

import useUser from "../../lib/use-auth.hook";
import { GetKeywordsResponse } from "../../types";
import configs from "../../configs";
import { fetchJsonAuthenticated } from "../../lib/fetch-json";

import NavigationBar from "../common/navigation-bar";
import LoadingIndicator from "../common/loading-indicator";

import KeywordGrid from "./keyword-grid";

export default function KeywordsPageContainer() {
  const { signOut } = useUser({
    redirectTo: "/login",
  });

  const { query } = useRouter();
  const uploadId = query.uploadId || "";

  const { data, isLoading } = useSWR<GetKeywordsResponse>(
    `${configs.BASE_API_URL}/keywords?uploadId=${uploadId}`,
    fetchJsonAuthenticated
  );

  const keywords = data?.keywords || [];

  return (
    <div className="h-full w-full">
      <NavigationBar signOut={signOut} />
      <article className="mx-auto max-w-7xl py-6 px-6 sm:px-6 lg:px-8">
        <section>
          {uploadId ? (
            <Link
              href="/"
              className="text-sm leading-6 relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              Back to uploads
            </Link>
          ) : null}
        </section>
        <section className="mt-4">
          <KeywordGrid keywords={keywords} />
        </section>
      </article>

      <LoadingIndicator isLoading={isLoading} />
    </div>
  );
}
