// clipboardManager.js
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export class ClipboardManager {
  constructor(buttonSelector, urlInputSelector) {
    this.copyUrlButton = document.querySelector(buttonSelector);
    this.finalUrlInput = document.querySelector(urlInputSelector);

    this.init();
  }

  init() {
    this.copyUrlButton.addEventListener("click", (e) => {
      this.handleCopyClick(e);
    });
  }

  handleCopyClick(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    navigator.clipboard.writeText(this.finalUrlInput.value);
    this.toastUrl();
  }

  toastUrl() {
    Toastify({
      text: "URL da proposta copiada para sua area de transferência",
      duration: 3000,
      hideProgressBar: false,
      progress: 3000,
      gravity: "bottom",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "#262626",
        border: "1px solid #373737",
        borderRadius: "6px",
        color: "#fafafa",
      },
    }).showToast();
  }
}
