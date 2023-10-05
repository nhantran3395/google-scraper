import { useState } from "react";
import { mutate } from "swr";

import fetchJson, { FetchError } from "../../../lib/fetch-json";
import configs from "../../../configs";
import LocalStorageService from "../../../lib/local-storage.service";

export default function useFileUpload() {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const isError = !!errorMsg;

  async function uploadFile(file: unknown) {
    resetError();

    if (!file) {
      setErrorMsg("must select a file");
    }

    const formData = new FormData();
    // @ts-ignore
    formData.append("file", file);

    try {
      await fetchJson(`${configs.BASE_API_URL}/uploads`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${LocalStorageService.getUserInfo()?.token}`,
        },
      });

      // trigger update to upload lists
      await mutate(`${configs.BASE_API_URL}/uploads`);
    } catch (error) {
      if (error instanceof FetchError) {
        console.log(error.data);
        setErrorMsg(error.data.message);
      } else {
        console.error("An unexpected error happened:", error);
        setErrorMsg("An unexpected error happened");
      }
    }
  }

  function resetError() {
    setErrorMsg("");
  }

  return { isError, errorMsg, resetError, uploadFile };
}
