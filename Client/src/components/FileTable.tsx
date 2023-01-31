import { File } from "../types";

export const FileTable = (): JSX.Element => {
  const tableHeaders = ["File", "Size", "Download", "Delete"];
  const files: File[] = [
    { name: "xy.txt", size: "1 kb" },
    { name: "xyz.txt", size: "2 kb" },
  ];

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
        {files.map((file) => (
          <tr key={file.name}>
            <td>{file.name}</td>
            <td>{file.size}</td>
            <td>
              <a href={`http://localhost:3000/download/${file.name}`}>
                <button>
                  <i className="fa fa-download"></i>
                </button>
              </a>
            </td>
            <td>
              <button>
                <i className="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
