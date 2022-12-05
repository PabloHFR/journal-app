import FilesView from "./journalView";
import FilesAPI from "./filesAPI";
import JournalApp from "./journalApp";

const mainHtmlElement = document.querySelector(".main");
const journalApp = new JournalApp(mainHtmlElement);

// const richTextEditorButtonsElement = document.querySelectorAll(".btn");

// richTextEditorButtonsElement.forEach((button) => {
//   button.addEventListener("click", () => {
//     let command = button.dataset.edit;

//     document.execCommand(command, false, null);
//   });
// });
