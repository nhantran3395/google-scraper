import useSWR from "swr";
import { MouseEvent } from "react";
import Router, { useRouter } from "next/router";

import configs from "../../../configs";
import { fetchJsonAuthenticated } from "../../../lib/fetch-json";
import { GetKeywordsResponse } from "../../../types";

export default function KeywordGrid() {
  const { query } = useRouter();
  const uploadId = query.uploadId || "";

  const { data } = useSWR<GetKeywordsResponse>(
    `${configs.BASE_API_URL}/keywords?uploadId=${uploadId}`,
    fetchJsonAuthenticated
  );

  const keywords = data?.keywords || [];

  const onClick = (event: MouseEvent<HTMLElement>) => {
    const keywordId = event.currentTarget.getAttribute("data-keyword-id");
    const uploadId = event.currentTarget.getAttribute("data-upload-id");
    Router.push(`details?keywordId=${keywordId}&uploadId=${uploadId}`);
  };

  return (
    <div className="flex flex-col overflow-x-auto">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b bg-slate-100 font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Keyword
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Total result count
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Ads link
                  </th>
                </tr>
              </thead>
              <tbody>
                {keywords.map((keyword) => (
                  <tr
                    key={keyword.keywordId}
                    className="border-b hover:bg-slate-100 cursor-pointer"
                    data-keyword-id={keyword.keywordId}
                    data-upload-id={keyword.uploadId}
                    onClick={onClick}
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {keyword.body}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {keyword.resultCount.toString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {keyword.adWordsCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
