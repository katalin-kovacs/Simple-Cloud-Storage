import { createStoreon, StoreonModule } from "storeon";
import { getFiles } from "../services";
import { Events, State } from "../types";
import { storeonDevtools } from "storeon/devtools";

let filesModule: StoreonModule<State, Events> = (store) => {
  store.on("@init", () => ({
    files: [{ name: "test1.txt", size: "1 kb" }],
  }));
  store.on("getFiles", async () => {
    try {
      let files = await getFiles();
      console.log("files: ", files);
      store.dispatch("setFiles", files);
    } catch (e) {
      console.log(e);
    }
  });
  store.on("setFiles", (state, files) => {
    return { files: files };
  });
};

export const store = createStoreon<State, Events>([
  filesModule,
  process.env.NODE_ENV !== "production" && storeonDevtools,
]);
