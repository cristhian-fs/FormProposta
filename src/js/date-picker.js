import flatpickr from "flatpickr";
import { Portuguese } from "flatpickr/dist/l10n/pt.js";

export function initDatePicker() {
  const dataEnvio = document.querySelector("#data-envio");
  const dataValidade = document.querySelector("#data-validade");

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
