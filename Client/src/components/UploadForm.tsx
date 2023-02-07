import { useStoreon } from "storeon/react";
import { uploadFile } from "../services";

export const UploadForm = (): JSX.Element => {
  const { dispatch } = useStoreon();
  return (
    <form
      method="post"
      action="/upload"
      encType="multipart/form-data"
      onSubmit={(e) => {
        e.preventDefault();
        uploadFile();
        dispatch("getFiles");
      }}
    >
      <label htmlFor="upload">Choose a file to upload.</label>
      <input id="upload" type={"file"} name="upload"></input>
      <input type={"submit"} value="Upload"></input>
    </form>
  );
};
