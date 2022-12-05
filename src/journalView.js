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
        <input
          class="author-name-box"
          type="text"
          maxlength="30"
          value="Diário de..."
        />
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
            <svg
              class="dark-mode-moon-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M10.719 2.082c-2.572 2.028-4.719 5.212-4.719 9.918 0 4.569 1.938 7.798 4.548 9.895-4.829-.705-8.548-4.874-8.548-9.895 0-5.08 3.808-9.288 8.719-9.918zm1.281-2.082c-6.617 0-12 5.383-12 12s5.383 12 12 12c1.894 0 3.87-.333 5.37-1.179-3.453-.613-9.37-3.367-9.37-10.821 0-7.555 6.422-10.317 9.37-10.821-1.74-.682-3.476-1.179-5.37-1.179zm0 10.999c1.437.438 2.562 1.564 2.999 3.001.44-1.437 1.565-2.562 3.001-3-1.436-.439-2.561-1.563-3.001-3-.437 1.436-1.562 2.561-2.999 2.999zm8.001.001c.958.293 1.707 1.042 2 2.001.291-.959 1.042-1.709 1.999-2.001-.957-.292-1.707-1.042-2-2-.293.958-1.042 1.708-1.999 2zm-1-9c-.437 1.437-1.563 2.562-2.998 3.001 1.438.44 2.561 1.564 3.001 3.002.437-1.438 1.563-2.563 2.996-3.002-1.433-.437-2.559-1.564-2.999-3.001z"
              />
            </svg>
          </div>
        </div>
        <div class="journal-box--journal">
          <div class="rich-text-editor">
            <button type="button" class="btn" data-edit="bold">
              <i class="fa-solid fa-bold fa-xl"></i>
            </button>
            <button type="button" class="btn" data-edit="italic">
              <i class="fa-solid fa-italic fa-xl"></i>
            </button>
            <button type="button" class="btn" data-edit="underline">
              <i class="fa-solid fa-underline fa-xl"></i>
            </button>
            <button type="button" class="btn" data-edit="insertUnorderedList">
              <i class="fa-solid fa-list-ul fa-xl"></i>
            </button>
            <button type="button" class="btn" data-edit="insertOrderedList">
              <i class="fa-solid fa-list-ol fa-xl"></i>
            </button>
            <button type="button" class="btn" data-edit="createLink">
              <i class="fa-solid fa-link fa-xl"></i>
            </button>
            <button type="button" class="btn" data-edit="justifyLeft">
              <i class="fa-solid fa-align-left fa-xl"></i>
            </button>
            <button type="button" class="btn" data-edit="justifyCenter">
              <i class="fa-solid fa-align-center fa-xl"></i>
            </button>
            <button type="button" class="btn" data-edit="justifyRight">
              <i class="fa-solid fa-align-right fa-xl"></i>
            </button>
            <button type="button" class="btn" data-edit="justifyFull">
              <i class="fa-solid fa-align-justify fa-xl"></i>
            </button>
          </div>
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

    addFileBtnElement.addEventListener("click", () => {
      this.onFileAdd();
    });

    [(journalFileName, journalTextArea)].forEach((input) => {
      input.addEventListener("blur", () => {
        const updatedTitle = journalFileName.value.trim();
        const updatedBody = journalTextArea.textContent.trim();

        this.onFileEdit(updatedTitle, updatedBody);
      });
    });
  }

  _createListItemHTML(id, title) {
    const MAX_BODY_LENGTH = 30;

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

    fileBoxListElement.querySelectorAll(".file-item").forEach((fileItem) => {
      fileItem.addEventListener("click", () => {
        this.onFileSelect(fileItem.dataset.fileId);
      });
    });
  }
}
