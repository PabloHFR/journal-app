import FilesView from "./journalView";

const mainHtmlElement = document.querySelector(".main");
const richTextEditorButtonsElement = document.querySelectorAll(".btn");

const view = new FilesView(mainHtmlElement, {
  onFileSelect() {
    console.log("File has been selected!");
  },
});

richTextEditorButtonsElement.forEach((button) => {
  button.addEventListener("click", () => {
    let command = button.dataset.edit;

    document.execCommand(command, false, null);
  });
});
