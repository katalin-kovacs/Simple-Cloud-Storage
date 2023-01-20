import { Request, Response } from "express";
import fs from "fs";
import { Files } from "../types/types";
import uploadFile from "../middleware/upload";

const fileFolder = "/resources/static/assets/uploads";
const directoryPath = `${process.cwd()}${fileFolder}`;

const listFilesSync = (req: Request, res: Response) => {
  let files: Files[] = [];

  fs.readdirSync(directoryPath).forEach((file) => {
    let fileSize = fs.statSync(`${directoryPath}/${file}`).size + " b";
    files.push({ name: file, size: fileSize });
  });

  //fs.statSync(`${directoryPath}/${file}`).size + " b")
  //fs.statSync(`${directoryPath}/${file}`).size / (1024 * 100) + " kB"
  //fs.statSync(`${directoryPath}/${file}`).size / (1024 * 1000) + " MB"

  res.status(200).json(files);
};

const listFiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = await fs.promises.readdir(directoryPath);
    let fileInfos = files.map((file) => {
      let fileSize = fs.statSync(`${directoryPath}/${file}`).size + " b";
      return { name: file, size: fileSize };
    });
    res.status(200).send(fileInfos);
  } catch (err) {
    res.status(500).send({ message: "Unable to scan files!" });
  }
};

const download = (req: Request, res: Response) => {
  const fileName = req.params.name;

  res.download(`${directoryPath}/${fileName}`, (err) => {
    if (err) {
      res.status(500).send({ message: `Could not download file. ${err}` });
    }
  });
};

const remove = (req: Request, res: Response) => {
  const fileName = req.params.name;

  fs.unlink(`${directoryPath}/${fileName}`, (err) => {
    if (err) {
      res.status(500).send({ message: `Could not delete file. ${err}` });
      throw err;
    }

    res.status(200).send({ message: `${fileName} is deleted.` });
  });
};

const removeSync = (req: Request, res: Response) => {
  const fileName = req.params.name;

  try {
    fs.unlinkSync(`${directoryPath}/${fileName}`);
    res.status(200).send({ message: `${fileName} is deleted.` });
  } catch (err) {
    res.status(500).send({ message: `Could not delete file. ${err}` });
  }
};

const upload = async (req: Request, res: Response) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: `File upload successful. ${req.file.originalname}`,
    });
  } catch (err) {
    // if (err.code == "LIMIT_FILE_SIZE") {
    //   return res.status(500).send({
    //     message: "File size cannot be larger than 2MB!",
    //   });
    // }

    res.status(500).send({
      message: `Could not upload file. ${err}`,
    });
  }
};

export default {
  remove,
  removeSync,
  listFilesSync,
  listFiles,
  download,
  upload,
};
