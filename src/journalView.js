export default class FilesView {
  constructor(
    root,
    { onFileSelect, onFileAdd, onFileEdit, onFileDelete } = {}
  ) {
    this.root = root;
    this.onFileSelect = onFileSelect;
    this.onFileAdd = onFileAdd;
    this.onFileEdit = onFileEdit;
    this.onFileDelete = onFileDelete;
    this.root.innerHTML = `
      <aside class="sidebar">
        <div
          class="app-name-box"
        >
        Journal App
        </div>
        <ul class="file-box"></ul>
        <button class="add-file-btn">
          <i class="fa-regular fa-plus"></i>
        </button>
      </aside>
      <div class="journal-box">
        <div class="journal-box--header">
          <input
            type="text"
            class="journal-file-name"
            value="Nome do Arquivo"
          />
          <div class="icons-div">
            <svg
              class="save-disk-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z"
              />
            </svg>
          </div>
        </div>
        <div class="journal-box--journal">
          <div
            class="journal-text-area"
            contenteditable="true"
            spellcheck="false"
          ></div>
        </div>
      </div>
    `;

    const journalTextArea = this.root.querySelector(".journal-text-area");
    const journalFileName = this.root.querySelector(".journal-file-name");
    const addFileBtnElement = this.root.querySelector(".add-file-btn");
    const saveDiskBtnElement = this.root.querySelector(".save-disk-icon");

    addFileBtnElement.addEventListener("click", () => {
      this.onFileAdd();
    });

    [journalFileName, journalTextArea].forEach((input) => {
      input.addEventListener("blur", () => {
        setTimeout(() => {
          const updatedTitle = journalFileName.value.trim();
          const updatedBody = journalTextArea.innerHTML.trim();

          this.onFileEdit(updatedTitle, updatedBody);
        }, 500);
      });
    });

    saveDiskBtnElement.addEventListener("click", () => {
      const updatedTitle = journalFileName.value.trim();
      const updatedBody = journalTextArea.innerHTML.trim();

      this.onFileEdit(updatedTitle, updatedBody);
    });

    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        const updatedTitle = journalFileName.value.trim();
        const updatedBody = journalTextArea.innerHTML.trim();

        this.onFileEdit(updatedTitle, updatedBody);
      }
    });

    this.updateJournalVisibility(false);
  }

  _createListItemHTML(id, title) {
    const MAX_BODY_LENGTH = 20;

    return `
    <li class="file-item" data-file-id="${id}">
            <svg
              clip-rule="evenodd"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"
              />
            </svg>
            <span class="file-title">
              ${title.substring(0, MAX_BODY_LENGTH)}
              ${title.length > MAX_BODY_LENGTH ? "..." : ""}
            </span>
          </li>
    `;
  }

  updateFileBoxList(files) {
    const fileBoxListElement = document.querySelector(".file-box");

    // Empty list
    fileBoxListElement.innerHTML = "";

    files.forEach((file) => {
      const fileMarkup = this._createListItemHTML(file.id, file.title);

      fileBoxListElement.insertAdjacentHTML("beforeend", fileMarkup);
    });

    // Adds select and delete events for each file item
    fileBoxListElement.querySelectorAll(".file-item").forEach((fileItem) => {
      fileItem.addEventListener("click", () => {
        this.onFileSelect(fileItem.dataset.fileId);
      });

      fileItem.addEventListener("contextmenu", (e) => {
        e.preventDefault();

        const doDelete = confirm(
          "Tem certeza que deseja deletar este arquivo?"
        );

        if (doDelete) {
          this.onFileDelete(fileItem.dataset.fileId);
        }
      });
    });
  }

  updateActiveFile(file) {
    this.root.querySelector(".journal-file-name").value = file.title;
    this.root.querySelector(".journal-text-area").innerHTML = file.body;

    this.root.querySelectorAll(".file-item").forEach((fileItem) => {
      fileItem.classList.remove("active");
    });

    this.root
      .querySelector(`.file-item[data-file-id="${file.id}"]`)
      .classList.add("active");
  }

  updateJournalVisibility(visible) {
    this.root.querySelector(".journal-box").style.visibility = visible
      ? "visible"
      : "hidden";
  }
}
