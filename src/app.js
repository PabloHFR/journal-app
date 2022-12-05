import FilesView from "./journalView";
import FilesAPI from "./filesAPI";

const mainHtmlElement = document.querySelector(".main");
const richTextEditorButtonsElement = document.querySelectorAll(".btn");

const view = new FilesView(mainHtmlElement, {
  onFileAdd() {
    console.log("Add button clicked");
  },

  onFileSelect(id) {
    console.log("File:" + id);
  },

  onFileDelete(id) {
    console.log("File deleted:" + id);
  },

  onFileEdit(newTitle, newBody) {
    console.log(newTitle, newBody);
  },
});

// Init

const files = FilesAPI.getAllFiles();

view.updateFileBoxList(files);
view.updateActiveFile(files[0]);

richTextEditorButtonsElement.forEach((button) => {
  button.addEventListener("click", () => {
    let command = button.dataset.edit;

    document.execCommand(command, false, null);
  });
});
