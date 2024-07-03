import gsap from "gsap";
import { DatePicker } from "../utils/date-picker";
import { initTogglePlansAmount } from "./togglePlansAmount";
import { ClipboardManager } from "./clipboardManager";
import { UrlGenerator } from "./final-url";
import { COPY_BUTTON_SELECTOR, FINAL_URL_SELECTOR } from "./constants.js";
import { PriceInputsMultiForm } from "./money-inputs.js";
import { CreatePlans } from "./createPlans.js";

export function initMultiForm() {
  const plansSelector = document.querySelector("#plans-handler");

  gsap.to(plansSelector, {
    x: 0,
    filter: "blur(0px)",
    opacity: 1,
    duration: 0.5,
    ease: "expo.out",
  });

  gsap.set("#notificationForm", {
    opacity: 1,
    translateX: `150%`,
    duration: 0.5,
    ease: "expo.out",
  });

  const datePicker = new DatePicker("data-envio-multi", "data-validade-multi");

  initTogglePlansAmount();
  PriceInputsMultiForm();
  const createPlans = new CreatePlans();
  new UrlGenerator();
  new ClipboardManager(COPY_BUTTON_SELECTOR, FINAL_URL_SELECTOR);
}
