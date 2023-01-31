import { FileList } from "./components/FileList";
import { Header } from "./components/Header";
import { UploadForm } from "./components/UploadForm";

function App(): JSX.Element {
  return (
    <div className="main">
      <Header />
      <UploadForm />
      <FileList />
    </div>
  );
}

export default App;
