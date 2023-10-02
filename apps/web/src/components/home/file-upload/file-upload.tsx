import { FormEvent } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";

import fetchJson from "../../../lib/fetch-json";
import configs from "../../../configs.ts";
import LocalStorageService from "../../../lib/local-storage.service.ts";

export default function FileUpload() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { files, value } = event.currentTarget.fileUpload;

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      await fetchJson(`${configs.BASE_API_URL}/keywords`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${LocalStorageService.getUserInfo()?.token}`,
        },
      });
    } catch (error) {
      console.log("an unexpected error occurred");
    }
  }

  return (
    <form className={"space-y-2"} onSubmit={onSubmit}>
      <div className="col-span-full">
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
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
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              CSV file up to 10MB
            </p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Scrape
      </button>
    </form>
  );
}
