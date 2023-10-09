import LoadingIndicator from "components/common/loading-indicator";
import { AuthenticatedLayout } from "components/common/layout";

import FileUpload from "./file-upload";
import UploadGrid from "./upload-grid";
import useFileUpload from "./use-file-upload.hook";

export default function UploadsContainer() {
  const fileUpload = useFileUpload();

  return (
    <AuthenticatedLayout>
      <section>
        <FileUpload {...fileUpload} />
      </section>

      <section className="mt-4">
        <UploadGrid />
      </section>

      <LoadingIndicator isLoading={fileUpload.isProcessing} />
    </AuthenticatedLayout>
  );
}
