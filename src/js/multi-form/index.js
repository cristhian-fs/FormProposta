import gsap from "gsap";
import { DatePicker } from "../utils/date-picker";
import { initTogglePlansAmount } from "./togglePlansAmount";

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
}
