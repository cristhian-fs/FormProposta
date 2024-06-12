import {
  computePosition,
  flip,
  shift,
  offset,
} from "https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.5/+esm";

const tooltipBtn = document.querySelectorAll(".tooltipBtn");
const tooltipItem = document.querySelectorAll(".tooltipItem");

tooltipBtn.forEach((btn, i) => {
  function update() {
    computePosition(btn, tooltipItem[i], {
      placement: "top",
      middleware: [offset(4), flip(), shift({ padding: 5 })],
    }).then(({ x, y }) => {
      Object.assign(tooltipItem[i].style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }

  function showTooltip() {
    tooltipItem[i].classList.remove("hidden");
    update();
  }

  function hideTooltip() {
    tooltipItem[i].classList.add("hidden");
  }

  [
    ["mouseenter", showTooltip],
    ["mouseleave", hideTooltip],
    ["focus", showTooltip],
    ["blur", hideTooltip],
  ].forEach(([event, listener]) => {
    btn.addEventListener(event, listener);
  });
});
