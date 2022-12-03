const richTextEditorButtonsElement = document.querySelectorAll(".btn");

richTextEditorButtonsElement.forEach((button) => {
  button.addEventListener("click", () => {
    let command = button.dataset.edit;

    document.execCommand(command, false, null);
  });
});
