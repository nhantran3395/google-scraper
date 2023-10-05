import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

import useUser from "../../lib/use-auth.hook";
import NavigationBar from "../common/navigation-bar";
import { type GetKeywordResponse } from "../../types";
import configs from "../../configs";
import { fetchJsonAuthenticated } from "../../lib/fetch-json";

export default function DetailPageContainer() {
  const { signOut } = useUser({
    redirectTo: "/login",
  });

  const { query } = useRouter();
  const uploadId = query.uploadId || "";
  const keywordId = query.keywordId || "";

  const { data } = useSWR<GetKeywordResponse>(
    `${configs.BASE_API_URL}/keywords/${keywordId}`,
    fetchJsonAuthenticated
  );

  const keyword = data?.keyword || {
    keywordId: "",
    body: "",
    uploadId: "",
    adWordsCount: 0,
    rawHtmlResult: "",
    resultCount: 0,
    createdAt: "",
    updatedAt: "",
  };

  return (
    <div className="h-full w-full">
      <NavigationBar signOut={signOut} />
      <article className="mx-auto max-w-7xl py-6 px-6 sm:px-6 lg:px-8">
        <section>
          <Link
            href={`/keywords?uploadId=${uploadId}`}
            className="text-sm leading-6 relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            Back to keywords
          </Link>
        </section>
        <section className={"mt-4"}>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Keyword
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {keyword.body}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Total search result
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {keyword.resultCount.toString()}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Ads link
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {keyword.adWordsCount}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Raw HTML
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <iframe
                    srcDoc={keyword.rawHtmlResult}
                    width={800}
                    height={800}
                    className={"border"}
                  />
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </article>
    </div>
  );
}