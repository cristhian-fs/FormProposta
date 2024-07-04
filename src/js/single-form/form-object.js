import {
  getNewParams,
  getParamsValue,
  createDynamicInputWithTabs,
} from "../utils/inputs-aux-functions.js";

import gsap from "gsap";

export function initFormObject() {
  let formValues = {};
  let inputs = getNewParams();
  formValues.services = [];

  function getServices(callback) {
    document.addEventListener("serviceAdded", (e) => {
      const serviceInput = document.getElementById("inclui");
      if (serviceInput) {
        const serviceParamValues = serviceInput
          .getAttribute("data-value")
          .split(",");

        formValues.services = serviceParamValues
          .map((value) => value.trim())
          .filter((value) => value !== "");

        callback();
      }
    });
  }

  const domainURL = document.querySelector("#domainURL");
  const pageSlug = document.querySelector("#pageSlug");
  [domainURL, pageSlug].forEach((input) => {
    if (input) {
      getParamsValue(input, (paramName, paramValue) => {
        formValues[paramName] = paramValue;
        updateStorage();
      });
    }
  });

  inputs.forEach((input) => {
    if (input) {
      getParamsValue(input, (paramName, paramValue) => {
        formValues[paramName] = paramValue;
        updateStorage();
      });
    }
  });

  getServices(updateStorage);

  function updateStorage() {
    formValues.timestamp = new Date().getTime();
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
          input.value = savedData[input.id];
          let event = new Event("input", { bubbles: true, cancelable: true });
          input.dispatchEvent(event);
        }
      });
      if (savedData.services) {
        const uniqueServices = [...new Set(savedData.services)];
        createDynamicInputWithTabs("inclui", "includesTabs", uniqueServices);
      }
    }
  }

  if (notification) {
    gsap.set(notification, {
      opacity: 1,
      translateX: `150%`,
      duration: 0.5,
      ease: "expo.out",
    });
  }

  function showNotification(e) {
    let savedForm = localStorage.getItem("formData");
    const activeSingleForm = document.querySelector(
      "#single-form:not(.hidden)"
    );
    if (savedForm && activeSingleForm) {
      gsap.to(notification, {
        opacity: 1,
        translateX: `00%`,
        duration: 0.5,
        ease: "expo.out",
      });
    } else {
      closeNotification();
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

  document.addEventListener("input", handleFirstInput, true);

  const savedData = localStorage.getItem("formData");
  if (savedData) {
    const dataObject = JSON.parse(savedData);
    const currentTime = new Date().getTime();
    const timeLimit = 5 * 60 * 1000;

    if (currentTime - dataObject.timestamp > timeLimit) {
      localStorage.removeItem("formData");
    }
  }
}
