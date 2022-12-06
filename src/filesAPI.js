export default class FilesAPI {
  static getAllFiles() {
    const files = JSON.parse(localStorage.getItem("files") || "[]");

    return files.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? 1 : -1;
    });
  }

  static saveFile(fileToSave) {
    const files = FilesAPI.getAllFiles();
    const existingFile = files.find((file) => file.id === fileToSave.id);

    // Update/Create logic
    if (existingFile) {
      existingFile.title = fileToSave.title;
      existingFile.body = fileToSave.body;
      existingFile.updated = new Date().toISOString();
    } else {
      fileToSave.id = Math.floor(Math.random() * 1000000);
      fileToSave.updated = new Date().toISOString();
      files.push(fileToSave);
    }

    localStorage.setItem("files", JSON.stringify(files));
  }

  static deleteFile(id) {
    const files = FilesAPI.getAllFiles();
    const newFiles = files.filter((file) => file.id != id);

    localStorage.setItem("files", JSON.stringify(newFiles));
  }
}
