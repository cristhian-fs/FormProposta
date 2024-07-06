import gsap from "gsap";

export class CreatePlans {
  constructor() {
    this.plansContainer = document.querySelector("#plans-parent");
    this.planCount = document.querySelectorAll("[data-service]").length;
    this.activePlans = document.querySelectorAll("[data-plans]");
    this.addServiceBtns = document.querySelectorAll(".add-service-btn");
    this.init();
  }

  init() {
    this.addEventListeners();
    this.updatePlanCount();
  }

  addEventListeners() {
    this.activePlans.forEach((btn) => {
      btn.addEventListener("click", () => {
        let plansData = parseFloat(btn.dataset.plans);
        if (plansData > this.planCount) {
          this.showPlans(plansData);
        } else {
          this.hidePlans(plansData);
        }
      });
    });
    this.addServiceBtns.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.stopImmediatePropagation(); // Impede múltiplos eventos
        this.addService(btn.parentElement);
      });
    });
  }

  showPlans(count) {
    for (let i = 1; i <= count; i++) {
      const plan = document.querySelector(`#plan-${i}`);
      if (plan.classList.contains("hidden")) {
        plan.style.viewTransitionName = `plan-${i}`;
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            plan.classList.remove("hidden");
            plan.classList.add("flex");
            this.updatePlanCount();
          });
        } else {
          plan.classList.remove("hidden");
          plan.classList.add("flex");
          this.updatePlanCount();
        }
      }
    }
  }

  hidePlans(count) {
    const plans = document.querySelectorAll("[data-service]");
    plans.forEach((plan, index) => {
      if (index >= count) {
        plan.style.viewTransitionName = `plan-${index + 1}`;
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            plan.classList.remove("flex");
            plan.classList.add("hidden");
            this.updatePlanCount();
          });
        } else {
          plan.classList.remove("flex");
          plan.classList.add("hidden");
          this.updatePlanCount();
        }
      }
    });
  }

  updatePlanCount() {
    this.planCount = document.querySelectorAll(
      "[data-service]:not(.hidden)"
    ).length;
  }

  addService(planDiv) {
    const serviceCount =
      planDiv.querySelectorAll("[data-service-optn]").length + 1;
    const planId = planDiv.getAttribute("id");

    const serviceDiv = document.createElement("div");
    serviceDiv.classList.add("w-full");
    serviceDiv.innerHTML = `
      <label for="${planId}-service-${serviceCount}" class="text-sm text-gray-500 font-semibold">Serviço ${serviceCount}</label>
      <div class="relative">
        <input type="text" name="username" data-service-optn data-service-param="${planId}-service-${serviceCount}" id="${planId}-service-${serviceCount}" class="w-full block flex-1 mt-1.5 bg-gray-50 py-2 pl-3 border-0 ring-1 ring-inset ring-gray-200 text-gray-900  placeholder:text-gray-500 focus:ring-[3px] focus:ring-gray-400 sm:text-sm sm:leading-6 rounded-lg shadow-sm" placeholder="Adicione o nome do serviço">
      </div>
    `;

    let deleteServiceBtn = document.createElement("button");
    deleteServiceBtn.classList.add("deleteParam");

    let iconDeleteParamBtn = document.createElement("div");
    iconDeleteParamBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6" stroke="#F04438" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;
    iconDeleteParamBtn.classList.add("size-5");

    deleteServiceBtn.appendChild(iconDeleteParamBtn);

    const relativeDiv = serviceDiv.querySelector("div");
    relativeDiv.appendChild(deleteServiceBtn);

    deleteServiceBtn.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      e.preventDefault();
      serviceDiv.remove();
      this.updateServicesIndex(planDiv, serviceDiv);
    });

    planDiv.insertBefore(serviceDiv, planDiv.querySelector(".add-service-btn"));
  }

  updateServicesIndex(planDiv) {
    const services = planDiv.querySelectorAll("[data-service-optn]");

    services.forEach((service, index) => {
      const newAttribute = `${planDiv.getAttribute("id")}-service-${index + 1}`;
      service.setAttribute("data-service-param", newAttribute);
      service.setAttribute("id", newAttribute);

      let label = service.parentElement.previousElementSibling;

      label.setAttribute("for", newAttribute);
      label.innerText = `Serviço ${index + 1}`;
    });
  }
}
