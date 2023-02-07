import { File } from "./types";
export const PORT = 5500;

export async function getFiles(): Promise<File[] | undefined> {
  let url = `http://localhost:${PORT}/list`;

  try {
    let res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function uploadFile(): Promise<void> {
  let url = `http://localhost:${PORT}/upload`;

  const form = document.querySelector("form");

  if (!form) {
    throw new Error("There is no form to work with.");
  }
  const file: FormData = new FormData(form);

  try {
    await fetch(url, { method: "post", body: file });
  } catch (error) {
    console.log(error);
  }
}

export async function downloadReq(name: string): Promise<void> {
  let url = `http://localhost:${PORT}/download/${name}`;
  try {
    await fetch(url, { method: "get" });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteReq(name: string): Promise<void> {
  let url = `http://localhost:${PORT}/remove/${name}`;

  try {
    await fetch(url, { method: "delete" });
  } catch (error) {
    console.log(error);
  }
}
