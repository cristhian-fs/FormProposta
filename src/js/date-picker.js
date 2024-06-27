import flatpickr from "flatpickr";
import { Portuguese } from "flatpickr/dist/l10n/pt.js";

export function initDatePicker() {
  const dataEnvio = document.querySelector("#data-envio");
  const dataValidade = document.querySelector("#data-validade");

  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  [dataEnvio, dataValidade].forEach((input) => {
    input.setAttribute("placeholder", `${day}-${month}-${year}`);
  });

  flatpickr(dataEnvio, {
    locale: Portuguese,
    minDate: "today",
    dateFormat: "d-m-Y",
  });
  flatpickr(dataValidade, {
    locale: Portuguese,
    minDate: "today",
    dateFormat: "d-m-Y",
  });
}
