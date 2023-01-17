async function getFiles() {
  let url = "http://localhost:5500/list";

  try {
    let res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderFiles() {
  let files = await getFiles();

  files.forEach((file) => {
    appendData(file);
  });
}
renderFiles();

async function uploadFile() {
  let url = "http://localhost:5500/upload";

  const file = new FormData(document.querySelector("form"));

  try {
    await fetch(url, { method: "post", body: file });
    document.querySelector(".table tbody").replaceChildren();
    renderFiles();
  } catch (error) {
    console.log(error);
  }
}

async function downloadReq(name) {
  let url = `http://localhost:5500/download/${name}`;
  try {
    await fetch(url, { method: "get" });
  } catch (error) {
    console.log(error);
  }
}

async function deleteReq(name) {
  let url = `http://localhost:5500/remove/${name}`;

  try {
    await fetch(url, { method: "delete", body: { name } });
    document.querySelector(".table tbody").replaceChildren();
    renderFiles();
  } catch (error) {
    console.log(error);
  }
}

const main = document.querySelector("div#main");

let pageHeader = document.createElement("h1");
pageHeader.innerText = "Simple Cloud Storage";
main.appendChild(pageHeader);

createUploadForm();

let fileList = document.createElement("h2");
fileList.innerText = "List of files";
main.appendChild(fileList);

let hr = document.createElement("hr");
main.appendChild(hr);

const tableHeaders = ["File", "Size", "Download", "Delete"];
createTable(tableHeaders);

function createTable(tableHeaders) {
  let table = document.createElement("table");
  table.className = "table";
  table.id = "sortable";

  let tableHead = document.createElement("thead");
  let tableHeadRow = document.createElement("tr");

  tableHeaders.forEach((header, index) => {
    let tableHeadCol = document.createElement("th");
    tableHeadCol.innerText = header;
    tableHeadCol.setAttribute("click", `sortBy(${index})`);
    tableHeadRow.append(tableHeadCol);
  });

  tableHead.append(tableHeadRow);
  table.append(tableHead);

  let tableBody = document.createElement("tbody");

  table.append(tableBody);
  main.append(table);
}

function appendData(file) {
  const tableBody = document.querySelector(".table tbody");

  let bodyRow = document.createElement("tr");

  Object.keys(file).forEach((key) => {
    let keyElement = document.createElement("td");
    keyElement.innerText = file[key];
    bodyRow.append(keyElement);
  });

  let downloadTD = document.createElement("td");
  let downloadLink = document.createElement("a");
  downloadLink.addEventListener("click", () => downloadReq(file["name"]));
  downloadLink.setAttribute(
    "href",
    `http://localhost:5500/download/${file["name"]}`
  );
  let download = document.createElement("button");
  download.innerHTML = '<i class="fa fa-download"></i>';
  downloadTD.appendChild(downloadLink);
  downloadLink.appendChild(download);
  bodyRow.append(downloadTD);

  let delTD = document.createElement("td");
  let del = document.createElement("button");
  del.addEventListener("click", () => deleteReq(file["name"]));
  del.innerHTML = '<i class="fa fa-trash"></i>';
  delTD.append(del);
  bodyRow.append(delTD);

  tableBody.append(bodyRow);
}

function createUploadForm() {
  let form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "/upload");
  form.setAttribute("enctype", "multipart/form-data");

  let uploadLabel = document.createElement("label");
  uploadLabel.setAttribute("for", "upload");
  uploadLabel.innerText = "Choose a file to upload.";
  form.appendChild(uploadLabel);

  let upload = document.createElement("input");
  upload.id = "upload";
  upload.type = "file";
  upload.name = "upload";
  form.appendChild(upload);

  let submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Upload");
  form.appendChild(submit);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    uploadFile();
  });

  main.appendChild(form);
}
