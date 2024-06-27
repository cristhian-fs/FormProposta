import { initServiceInput } from "./src/js/services-input";
import { initDatePicker } from "./src/js/date-picker";
import { initFinalUrl } from "./src/js/final-url";
import { initFormObject } from "./src/js/form-object";
import { handleTheme } from "./src/js/handleTheme";
import { initMoneyInputs } from "./src/js/money-inputs";
import { initNewParameters } from "./src/js/new-parameter";
import { initTooltips } from "./src/js/tooltip";

import "flatpickr/dist/flatpickr.min.css";

import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

document.addEventListener("DOMContentLoaded", () => {
  initServiceInput();
  initDatePicker();
  initFinalUrl();
  initFormObject();
  handleTheme();
  initMoneyInputs();
  initNewParameters();
  initTooltips();

  hljs.highlightAll();
});
