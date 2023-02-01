import { useCallback, useEffect, useState } from "react";
import { deleteReq, downloadReq, getFiles, PORT } from "../services";
import { File } from "../types";

export const FileTable = (): JSX.Element => {
  const tableHeaders = ["File", "Size", "Download", "Delete"];
  //   const fileList: File[] = [
  //     { name: "xy.txt", size: "1 kb" },
  //     { name: "xyz.txt", size: "2 kb" },
  //   ];

  const [fileList, getFileList] = useState<File[]>([]);

  const fetchData = useCallback(async () => {
    const files = await getFiles();
    getFileList(files ? files : []);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
                  <i className="fa fa-download"></i>
                </button>
              </a>
            </td>
            <td>
              <button onClick={() => deleteReq(file.name)}>
                <i className="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
