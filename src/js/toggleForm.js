import gsap from "gsap";

import { initSingleServiceForm } from "./single-form";
import { initMultiForm } from "./multi-form";

export function initToggleForm() {
  let themeToggleBtns = document.querySelectorAll(".toggleFormBtn");
  let themeToggleParent = document.querySelector("#toggleForm");

  function updateElement() {
    let activeForm = localStorage.getItem("activeForm");

    const toggleBtns = document.querySelectorAll(".toggleFormBtn");

    toggleBtns.forEach((btn) => {
      if (btn.dataset.form === activeForm) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    if (!activeForm) {
      toggleBtns[0].classList.add("active");
    }

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
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
      themeToggleBtns.forEach((btn) => btn.classList.remove("active"));

      this.classList.add("active");
      handleForm(this.dataset.form);
      localStorage.setItem("activeForm", this.dataset.form);
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
    display: "none",
  });

  function handleForm(id) {
    const scrollPosition = window.scrollY;
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
          onComplete: () => {
            gsap.set("#plans-handler", {
              display: "none",
            });
          },
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
    window.scrollTo(0, scrollPosition);
  }

  updateElement();

  const activeForm = localStorage.getItem("activeForm");
  handleForm(activeForm || "single-form");
}
