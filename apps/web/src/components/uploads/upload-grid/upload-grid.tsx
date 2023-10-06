import useSWR from "swr";
import { MouseEvent } from "react";
import Router from "next/router";

import configs from "../../../configs";
import { fetchJsonAuthenticated } from "../../../lib/fetch-json";
import { GetUploadsResponse } from "../../../types";

export default function UploadGrid() {
  const { data } = useSWR<GetUploadsResponse>(
    `${configs.BASE_API_URL}/uploads`,
    fetchJsonAuthenticated
  );

  const uploads = data?.uploads || [];

  function onClick(event: MouseEvent<HTMLElement>) {
    const id = event.currentTarget.getAttribute("data-upload-id");
    Router.push(`/keywords?uploadId=${id}`);
  }

  return (
    <div className="flex flex-col overflow-x-auto">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b bg-slate-100 font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    File name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Keywords
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload) => (
                  <tr
                    key={upload.uploadId}
                    className="border-b hover:bg-slate-100 cursor-pointer"
                    data-upload-id={upload.uploadId}
                    onClick={onClick}
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {upload.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {upload.keywordCount}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {new Date(upload.createdAt).toLocaleString()}
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
