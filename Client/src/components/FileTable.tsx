import { useEffect } from "react";
import { useStoreon } from "storeon/react";
import { deleteReq, downloadReq, PORT } from "../services";
import { Events, State } from "../types";

const tableHeaders = ["File", "Size", "Download", "Delete"];

export const FileTable = (): JSX.Element => {
  const { dispatch, files: fileList } = useStoreon<State, Events>("files");

  useEffect(() => {
    dispatch("getFiles");
  }, [dispatch]);

  return (
    <table className="table">
      <thead>
        <tr>
          {tableHeaders.map((th) => (
            <th key={th}>{th}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {fileList.map((file) => (
          <tr key={file.name}>
            <td>{file.name}</td>
            <td>{file.size}</td>
            <td>
              <a
                href={`http://localhost:${PORT}/download/${file.name}`}
                onClick={() => downloadReq(file.name)}
              >
                <button>
                  <i className="fa fa-download" />
                </button>
              </a>
            </td>
            <td>
              <button
                onClick={() => {
                  deleteReq(file.name);
                  dispatch("getFiles");
                }}
              >
                <i className="fa fa-trash" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
