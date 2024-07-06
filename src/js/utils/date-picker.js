import flatpickr from "flatpickr";
import { Portuguese } from "flatpickr/dist/l10n/pt.js";

export class DatePicker {
  constructor(dataEnvioId, dataValidadeId, flatpickrOptions = {}) {
    this.dataEnvio = document.getElementById(dataEnvioId);
    this.dataValidade = document.getElementById(dataValidadeId);

    this.flatpickrOptions = flatpickrOptions;
    this.defaultOptions = {
      locale: Portuguese,
      minDate: "today",
      dateFormat: "d-m-Y",
    };

    this.init();
  }

  init() {
    if (this.dataEnvio && this.dataValidade) {
      this.setPlaceholders();
      this.initFlatpickr();
    } else {
      console.error("Os elementos fornecidos não foram encontrados.");
    }
  }

  setPlaceholders() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    [this.dataEnvio, this.dataValidade].forEach((input) => {
      input.setAttribute("placeholder", `${day}-${month}-${year}`);
    });
  }

  initFlatpickr() {
    const options = { ...this.defaultOptions, ...this.flatpickrOptions };

    flatpickr(this.dataEnvio, options);
    flatpickr(this.dataValidade, options);
  }
}
