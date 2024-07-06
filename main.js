import { handleTheme } from "./src/js/handleTheme";
import { initTooltips } from "./src/js/tooltip";
import { initSvgInject } from "./src/js/svg-inject.min";
import { initSingleServiceForm } from "./src/js/single-form/index";

import { initToggleForm } from "./src/js/toggleForm";

import "flatpickr/dist/flatpickr.min.css";

import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

document.addEventListener("DOMContentLoaded", () => {
  initToggleForm();
  handleTheme();
  initTooltips();
  initSvgInject();

  SVGInject(document.querySelectorAll("img.inject-svg"));

  hljs.highlightAll();
});
