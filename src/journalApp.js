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

    this._setFiles(files);

    if (files.length > 0) {
      this._setActiveFile(files[0]);
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
        console.log("Note selected: " + fileId);
      },
      onFileAdd: () => {
        console.log("Note add");
      },
      onFileEdit: (title, body) => {
        console.log(title, body);
      },
      onFileDelete: (fileId) => {
        console.log("Note deleted: " + fileId);
      },
    };
  }
}
