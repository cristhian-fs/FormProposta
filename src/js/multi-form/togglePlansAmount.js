export function initTogglePlansAmount() {
  let togglePlansBtns = document.querySelectorAll(".togglePlanBtn");
  let themeToggleParent = document.querySelector("#plans-handler");

  function updateElement() {
    let toggleBtnActive = document.querySelector(".togglePlanBtn.active");
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
      `${toggleBtnActiveRect.top - parentRect.top}px`
    );
  }

  updateElement();

  togglePlansBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      togglePlansBtns.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      updateElement();
    });
  });

  window.addEventListener("resize", updateElement);
}
