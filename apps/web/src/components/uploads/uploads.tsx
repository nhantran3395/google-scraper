import useUser from "lib/use-auth.hook";
import NavigationBar from "components/common/navigation-bar";
import Dialog from "components/common/loading-indicator";

import FileUpload from "./file-upload";
import UploadGrid from "./upload-grid";
import useFileUpload from "./use-file-upload.hook";

export default function UploadsContainer() {
  const { signOut } = useUser({
    redirectTo: "/login",
  });

  const fileUpload = useFileUpload();

  return (
    <div className="h-full w-full">
      <NavigationBar signOut={signOut} />

      <article className="mx-auto max-w-7xl py-6 px-6 sm:px-6 lg:px-8">
        <section>
          <FileUpload {...fileUpload} />
        </section>

        <section className="mt-4">
          <UploadGrid />
        </section>
      </article>

      <Dialog isLoading={fileUpload.isProcessing} />
    </div>
  );
}
