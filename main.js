import { initServiceInput } from "./src/js/services-input";
import { initDatePicker } from "./src/js/date-picker";
import { initFinalUrl } from "./src/js/final-url";
import { initFormObject } from "./src/js/form-object";
import { handleTheme } from "./src/js/handleTheme";
import { initDocumentation } from "./src/js/how-it-works";
import { initMoneyInputs } from "./src/js/money-inputs";
import { initNewParameters } from "./src/js/new-parameter";
import { initTooltips } from "./src/js/tooltip";

import hljs from "highlight.js";

document.addEventListener("DOMContentLoaded", () => {
  initServiceInput();
  initDatePicker();
  initFinalUrl();
  initFormObject();
  handleTheme();
  initDocumentation();
  initMoneyInputs();
  initNewParameters();
  initTooltips();

  hljs.highlightAll();
});
