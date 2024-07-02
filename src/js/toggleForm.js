import gsap from "gsap";

import { initSingleServiceForm } from "./single-form";
import { initMultiForm } from "./multi-form";

export function initToggleForm() {
  let themeToggleBtns = document.querySelectorAll(".toggleFormBtn");
  let themeToggleParent = document.querySelector("#toggleForm");

  function updateElement() {
    let toggleBtnActive = document.querySelector(".toggleFormBtn.active");
    let toggleBtnActiveRect = toggleBtnActive.getBoundingClientRect();
    let parentRect = themeToggleParent.getBoundingClientRect();

    themeToggleParent.style.setProperty(
      "--content-width",
      `${toggleBtnActiveRect.width}px`
    );
    themeToggleParent.style.setProperty(
      "--content-height",
      `${toggleBtnActiveRect.height}px`
    );

    themeToggleParent.style.setProperty(
      "--x-position",
      `${toggleBtnActiveRect.left - parentRect.left}px`
    );
    themeToggleParent.style.setProperty(
      "--y-position",
      `${toggleBtnActiveRect.top - parentRect.top - 1}px`
    );
  }

  themeToggleBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      themeToggleBtns.forEach((btn) => btn.classList.remove("active"));

      this.classList.add("active");
      handleForm(this.dataset.form);
      updateElement();
    });
  });

  window.addEventListener("resize", updateElement);

  gsap.set("#plans-handler", {
    x: -80,
    filter: "blur(8px)",
    opacity: 0,
    duration: 0.5,
    ease: "expo.out",
  });

  function handleForm(id) {
    const forms = document.querySelectorAll("#single-form, #multi-form");
    forms.forEach((form) => {
      gsap.set(form, {
        opacity: 0,
        y: 50,
        filter: "blur(8px)",
        duration: 0.5,
        ease: "expo.out",
      });

      if (id === "single-form") {
        initSingleServiceForm();
        gsap.to("#plans-handler", {
          x: -80,
          filter: "blur(8px)",
          opacity: 0,
          duration: 0.5,
          ease: "expo.out",
        });
      } else {
        initMultiForm();
      }

      if (form.id === id) {
        form.classList.remove("hidden");
        form.classList.add("flex");
        gsap.to(form, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "expo.out",
        });
      } else {
        form.classList.remove("flex");
        form.classList.add("hidden");
      }
    });
    updateElement();
  }

  handleForm("multi-form");
}
