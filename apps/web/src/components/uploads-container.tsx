import LoadingIndicator from "@/components/spinner";

import { AuthenticatedLayout } from "@/layout/authenticated-layout";

import UploadForm from "@/components/upload-form";
import UploadList from "@/components/upload-list";

import useFileUpload from "@/hooks/use-file-upload.hook";

export default function UploadsContainer() {
  const fileUpload = useFileUpload();

  return (
    <AuthenticatedLayout>
      <section>
        <UploadForm {...fileUpload} />
      </section>

      <section className="mt-4">
        <UploadList />
      </section>

      <LoadingIndicator isLoading={fileUpload.isProcessing} />
    </AuthenticatedLayout>
  );
}
