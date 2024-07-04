import { initServiceInput } from "./services-input";
import { initFinalUrl } from "./final-url";
import { initFormObject } from "./form-object";
import { initMoneyInputs } from "./money-inputs";
import { initNewParameters } from "./new-parameter";
import { DatePicker } from "../utils/date-picker";

export function initSingleServiceForm() {
  initServiceInput();
  const datePicker = new DatePicker("data-envio", "data-validade");
  initFormObject();
  initMoneyInputs();
  // initNewParameters();
  initFinalUrl();
}
