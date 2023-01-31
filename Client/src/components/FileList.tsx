import { FileListHeader } from "./FileListHeader";
import { FileTable } from "./FileTable";

export const FileList = (): JSX.Element => {
  return (
    <>
      <FileListHeader />
      <FileTable />
    </>
  );
};
