import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";

import { fetchJsonAuthenticated } from "lib/fetch-json";
import { GetKeywordsResponse, Keyword } from "types";
import configs from "configs";
import LoadingIndicator from "components/common/loading-indicator";
import { AuthenticatedLayout } from "components/common/layout";
import KeywordGrid from "./keyword-grid";
import SearchBar from "./search-bar";

export default function KeywordsPageContainer() {
  const { query } = useRouter();
  const uploadId = query.uploadId || "";

  const { data, isLoading } = useSWR<GetKeywordsResponse>(
    `${configs.BASE_API_URL}/keywords?uploadId=${uploadId}`,
    fetchJsonAuthenticated
  );

  useEffect(() => {
    setKeywords(data?.keywords || []);
  }, [data]);

  const originalKeywords = data?.keywords || [];
  const [keywords, setKeywords] = useState<Array<Keyword>>(originalKeywords);

  function executeSearch(searchTerm: string) {
    if (!searchTerm) {
      setKeywords(originalKeywords);
    }

    const newKeywords = originalKeywords.filter((keyword) =>
      keyword.body.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

    setKeywords(newKeywords);
  }

  return (
    <AuthenticatedLayout>
      <section className={"flex flex-row justify-between gap-x-4"}>
        <Link
          href="/"
          className="text-sm leading-6 relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
        >
          {uploadId ? "Back to uploads" : null}
        </Link>
        <SearchBar executeSearch={executeSearch} />
      </section>
      <section className="mt-4">
        <KeywordGrid keywords={keywords} />
      </section>

      <LoadingIndicator isLoading={isLoading} />
    </AuthenticatedLayout>
  );
}
