import FilesAPI from "./filesAPI";
import FilesView from "./journalView";

export default class JournalApp {
  constructor(root) {
    this.files = [];
    this.activeFile = null;
    this.view = new FilesView(root, this._handlers());

    this._refreshFiles();
  }

  _refreshFiles() {
    const files = FilesAPI.getAllFiles();
    const filesLastIndex = files.length - 1;

    this._setFiles(files);

    if (files.length > 0) {
      this._setActiveFile(files[filesLastIndex]);
    }
  }

  _setFiles(files) {
    this.files = files;
    this.view.updateFileBoxList(files);
    this.view.updateJournalVisibility(files.length > 0);
  }

  _setActiveFile(file) {
    this.activeFile = file;
    this.view.updateActiveFile(file);
  }

  _handlers() {
    return {
      onFileSelect: (fileId) => {
        const selectedFile = this.files.find((file) => file.id === +fileId);
        this._setActiveFile(selectedFile);
      },

      onFileAdd: () => {
        const newFile = {
          title: "Nome do arquivo...",
          body: "Comece a escrever!",
        };

        FilesAPI.saveFile(newFile);
        this._refreshFiles();
      },

      onFileEdit: (title, body) => {
        FilesAPI.saveFile({
          id: this.activeFile.id,
          title: title,
          body: body,
        });

        this._refreshFiles();
      },

      onFileDelete: (fileId) => {
        FilesAPI.deleteFile(fileId);
        this._refreshFiles();
      },
    };
  }
}
