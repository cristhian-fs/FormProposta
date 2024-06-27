import {
  getNewParams,
  getParamsValue,
  createDynamicInputWithTabs,
} from "./inputs-aux-functions.js";

let formValues = {};
let inputs = getNewParams();
formValues.services = [];

function getServices(callback) {
  document.addEventListener("serviceAdded", (e) => {
    const serviceInput = document.getElementById("inclui");
    const serviceParamValues = serviceInput
      .getAttribute("data-value")
      .split(",");

    // Atualiza os valores de serviço
    formValues.services = serviceParamValues
      .map((value) => value.trim())
      .filter((value) => value !== "");

    callback(); // Chama a função de callback, que pode ser para atualizar o armazenamento
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const domainURL = document.querySelector("#domainURL");
  const pageSlug = document.querySelector("#pageSlug");
  [domainURL, pageSlug].forEach((input) => {
    getParamsValue(input, (paramName, paramValue) => {
      formValues[paramName] = paramValue;
      updateStorage(); // Atualiza o storage com o novo estado de formValues
    });
  });

  inputs.forEach((input) => {
    getParamsValue(input, (paramName, paramValue) => {
      formValues[paramName] = paramValue;
      updateStorage();
    });
  });

  // Quando precisar começar a monitorar os serviços
  getServices(updateStorage); // updateStorage é uma função que você deve definir para atualizar o localStorage

  function updateStorage() {
    formValues.timestamp = new Date().getTime(); // Armazenar o timestamp atual
    localStorage.setItem("formData", JSON.stringify(formValues));
  }

  const notification = document.querySelector("#notificationForm");
  const notificationClose = document.querySelectorAll(".dismissForm");
  const restoreFormBtn = document.querySelector("#restoreForm");

  function updateFields() {
    let paramInputs = document.querySelectorAll(
      ".paramValue, #domainURL, #pageSlug"
    );
    let savedForm = localStorage.getItem("formData");

    if (savedForm) {
      let savedData = JSON.parse(savedForm);
      paramInputs.forEach((input) => {
        if (savedData[input.id]) {
          input.value = savedData[input.id]; // Atribui o valor primeiro
          let event = new Event("input", { bubbles: true, cancelable: true }); // Cria um evento de input
          input.dispatchEvent(event); // Dispara o evento de input
        }
      });
      if (savedData.services) {
        const uniqueServices = [...new Set(savedData.services)];
        createDynamicInputWithTabs("inclui", "includesTabs", uniqueServices);
      }
    }
  }

  gsap.set(notification, {
    opacity: 1,
    translateX: `150%`,
    duration: 0.5,
    ease: "expo.out",
  });

  function showNotification(e) {
    const sectionForm = document.querySelector("#form-section");
    const { top } = sectionForm.getBoundingClientRect();
    let savedForm = localStorage.getItem("formData");
    if (top < 200 && savedForm) {
      gsap.to(notification, {
        opacity: 1,
        translateX: `00%`,
        duration: 0.5,
        ease: "expo.out",
      });
    }
  }

  function closeNotification() {
    gsap.to(notification, {
      opacity: 0,
      translateY: `150%`,
      duration: 0.5,
      ease: "expo.out",
    });
  }

  notificationClose.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      closeNotification();
    })
  );

  restoreFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    updateFields();
    closeNotification();
  });

  document.addEventListener("scroll", showNotification);

  function handleFirstInput() {
    closeNotification();
    document.removeEventListener("input", handleFirstInput, true);
  }

  // Adicionar o ouvinte de evento ao documento
  document.addEventListener("input", handleFirstInput, true);

  // Inicializar os dados do formulário ao carregar a página
  const savedData = localStorage.getItem("formData");
  if (savedData) {
    const dataObject = JSON.parse(savedData);
    const currentTime = new Date().getTime();
    const timeLimit = 5 * 60 * 1000; // 5 minutos

    if (currentTime - dataObject.timestamp > timeLimit) {
      // Se os dados ultrapassaram o tempo limite
      localStorage.removeItem("formData");
    }
  }
});
