import { FormEvent, useState } from "react";
import { DocumentTextIcon, XCircleIcon } from "@heroicons/react/24/solid";

import fetchJson from "../../../lib/fetch-json";
import LocalStorageService from "../../../lib/local-storage.service.ts";
import configs from "../../../configs.ts";

export default function FileUpload() {
  const [file, setFile] = useState<unknown>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      return;
    }

    const formData = new FormData();
    // @ts-ignore
    formData.append("file", file);

    try {
      await fetchJson(`${configs.BASE_API_URL}/keywords`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${LocalStorageService.getUserInfo()?.token}`,
        },
      });
    } catch (error) {
      console.error("an unexpected error happened");
    }
  }

  function onChange(event: FormEvent<HTMLFormElement>) {
    const file = event.currentTarget.fileUpload.files[0];
    setFile(file);
  }

  function clearFile() {
    setFile(null);
  }

  return (
    <form className={"space-y-4"} onSubmit={onSubmit} onChange={onChange}>
      <div className="col-span-full">
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <DocumentTextIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            {!file ? (
              <>
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="fileUpload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="fileUpload"
                      name="fileUpload"
                      type="file"
                      accept="text/csv"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  CSV file up to 1KB
                </p>
              </>
            ) : (
              <div className={"flex justify-center items-center"}>
                <span className="ml-2 mt-4 flex text-sm leading-6 text-gray-600 text-center">
                  {(file as { name: string }).name}
                </span>
                <XCircleIcon
                  className="ml-2 mt-4 h-5 w-5 text-gray-600"
                  onClick={clearFile}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="flex w-36 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Scrape
      </button>
    </form>
  );
}
