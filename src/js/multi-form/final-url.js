import {
  DOMAIN_SELECTOR,
  COPY_BUTTON_SELECTOR,
  ACCESS_BUTTON_SELECTOR,
  ACCESS_LINK_SELECTOR,
  SLUG_SELECTOR,
  FINAL_URL_SELECTOR,
} from "./constants";

// clipboardManager.js
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export class UrlGenerator {
  constructor() {
    this.form = document.querySelector("#multi-form");
    this.copyBtn = document.querySelector(COPY_BUTTON_SELECTOR);
    this.domainUrl = this.form.querySelector(DOMAIN_SELECTOR);
    this.pageSlug = this.form.querySelector(SLUG_SELECTOR);
    this.finalUrlInput = document.querySelector(FINAL_URL_SELECTOR);
    this.accessBtn = document.querySelector(ACCESS_BUTTON_SELECTOR);
    this.acessLink = document.querySelector(ACCESS_LINK_SELECTOR);
    this.params = [];
    this.plans = this.form.querySelectorAll("[data-service]");
    this.paramInputs = this.form.querySelectorAll("[data-param]");

    this.init();
  }

  init() {
    this.addEventListeners();
    this.initParamInputs();
    this.updatePlansParams(); // Adicionado para inicializar os parâmetros dos serviços
    this.inputsObserver();
  }

  initParamInputs() {
    this.paramInputs.forEach((input) => this.addParamInputListener(input));
  }

  addParamInputListener(input) {
    input.addEventListener("input", (e) => this.handleParamInput(e, input));
  }

  addEventListeners() {
    this.domainUrl.addEventListener("input", () => this.handleInputChange());
    this.pageSlug.addEventListener("input", () => this.handleInputChange());
  }

  handleInputChange() {
    this.generateLink();
  }

  handleParamInput(e, input) {
    const paramName = input.dataset.param;
    let paramValue = encodeURIComponent(e.target.value);

    this.updateParam(paramName, paramValue);
    this.generateLink();
  }

  handleServiceParamInput(e, input) {
    let paramName = input.dataset.serviceParam;
    let paramValue;
    if (paramName.includes("preco")) {
      paramValue = encodeURIComponent(input.getAttribute("data-value"));
    } else {
      paramValue = encodeURIComponent(e.target.value);
    }

    this.updateParam(paramName, paramValue);
    this.generateLink();
  }

  updatePlansParams() {
    this.plans.forEach((plan) => {
      let params = plan.querySelectorAll("[data-service-param]");

      params.forEach((param) => {
        param.addEventListener("input", (e) =>
          this.handleServiceParamInput(e, param)
        );
      });
    });
  }

  updateParam(paramName, paramValue) {
    this.params = this.params.filter(
      (param) => !param.startsWith(`${paramName}=`)
    );
    if (paramValue.trim() !== "") {
      this.params.push(`${paramName}=${paramValue}`);
    }
  }

  inputsObserver() {
    const observer = new MutationObserver((mutationList) => {
      mutationList.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeName === "DIV") {
              this.updatePlansParams();
              this.generateLink();
            }
          });

          mutation.removedNodes.forEach((node) => {
            if (node.nodeName === "DIV") {
              this.removeParams(node);
              this.generateLink();
            }
          });
        }
      });
    });

    observer.observe(this.form, { childList: true, subtree: true });
    this.disconnectObserver = () => observer.disconnect();
  }

  removeParams(node) {
    const params = node.querySelectorAll("[data-service-param]");
    params.forEach((param) => {
      const paramName = param.dataset.serviceParam;
      this.params = this.params.filter((p) => !p.startsWith(`${paramName}=`));
    });
  }

  disconnect() {
    if (this.disconnectObserver) {
      this.disconnectObserver();
    }
  }
  generateLink() {
    const domainURLValue = this.domainUrl.value;
    const pageSlugValue = this.pageSlug.value;

    if (domainURLValue && pageSlugValue) {
      const url = `http://${domainURLValue}/${pageSlugValue}?${this.params.join(
        "&"
      )}`;

      this.copyBtn.removeAttribute("disabled");
      this.accessBtn.removeAttribute("disabled");
      this.finalUrlInput.value = url;
      this.acessLink.setAttribute("href", url);
    } else {
      this.finalUrlInput.setAttribute(
        "placeholder",
        "Por favor preencha os campos de dominio e slug"
      );
    }
  }
}
