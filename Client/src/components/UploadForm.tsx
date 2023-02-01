import { uploadFile } from "../services";

export const UploadForm = (): JSX.Element => {
  return (
    <form
      method="post"
      action="/upload"
      encType="multipart/form-data"
      onSubmit={(e) => {
        e.preventDefault();
        uploadFile();
      }}
    >
      <label htmlFor="upload">Choose a file to upload.</label>
      <input id="upload" type={"file"} name="upload"></input>
      <input type={"submit"} value="Upload"></input>
    </form>
  );
};
