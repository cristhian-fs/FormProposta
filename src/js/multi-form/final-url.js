import {
  DOMAIN_SELECTOR,
  COPY_BUTTON_SELECTOR,
  ACCESS_BUTTON_SELECTOR,
  ACCESS_LINK_SELECTOR,
  SLUG_SELECTOR,
  FINAL_URL_SELECTOR,
} from "./constants";

export class UrlGenerator {
  constructor() {
    this.form = document.querySelector("#multi-form");
    this.domainUrl = this.form.querySelector(DOMAIN_SELECTOR);
    this.pageSlug = this.form.querySelector(SLUG_SELECTOR);
    this.finalUrlInput = document.querySelector(FINAL_URL_SELECTOR);
    this.accessBtn = document.querySelector(ACCESS_BUTTON_SELECTOR);
    this.params = [];
    this.plans = this.form.querySelectorAll("[data-service]");
    this.paramInputs = this.form.querySelectorAll("[data-param]");

    this.init();
  }

  init() {
    this.addEventListeners();
    this.initParamInputs();
    this.updatePlansParams(); // Adicionado para inicializar os parâmetros dos serviços
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
      let combinedServices = [];

      params.forEach((param) => {
        param.addEventListener("input", (e) =>
          this.handleServiceParamInput(e, param)
        );

        let paramName = param.dataset.serviceParam;
        let paramValue = encodeURIComponent(param.value);

        if (paramName.includes("servico")) {
          combinedServices.push(paramValue);
        } else {
          this.updateParam(paramName, paramValue);
        }
      });

      if (combinedServices.length > 0) {
        this.updateParam(
          `${plan.dataset.service}-services`,
          combinedServices.join("%20")
        );
      }
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

  generateLink() {
    const domainURLValue = this.domainUrl.value;
    const pageSlugValue = this.pageSlug.value;

    if (domainURLValue && pageSlugValue) {
      const url = `http://${domainURLValue}/${pageSlugValue}?${this.params.join(
        "&"
      )}`;
      this.finalUrlInput.value = url;
      this.finalUrlInput.setAttribute("value", url);
      this.accessBtn.setAttribute("href", url);
    } else {
      this.finalUrlInput.setAttribute(
        "placeholder",
        "Por favor preencha os campos de dominio e slug"
      );
    }
  }
}
