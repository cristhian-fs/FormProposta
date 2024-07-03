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
        plan.classList.remove("hidden");

        gsap.set(plan, { opacity: 0, y: 100 });
        plan.classList.add("flex");
        gsap.to(plan, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: i * 0.1,
        });
      }
    }
    this.updatePlanCount();
  }

  hidePlans(count) {
    const plans = document.querySelectorAll("[data-service]");
    plans.forEach((plan, index) => {
      if (index >= count) {
        plan.classList.remove("flex");
        gsap.to(plan, {
          opacity: 0,
          y: 100,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            plan.classList.add("hidden");
          },
        });
      }
    });
    this.updatePlanCount();
  }

  updatePlanCount() {
    this.planCount = document.querySelectorAll(
      "[data-service]:not(.hidden)"
    ).length;
  }

  // createPlanDiv(planId) {
  //   const planDiv = document.createElement("div");
  //   planDiv.classList.add(
  //     "p-5",
  //     "col-span-1",
  //     "flex",
  //     "flex-col",
  //     "items-start",
  //     "justify-start",
  //     "gap-5",
  //     "rounded-2xl",
  //     "border",
  //     "border-gray-300",
  //     "w-full"
  //   );
  //   planDiv.setAttribute("id", `service${planId}`);
  //   planDiv.setAttribute("data-service", "");

  //   planDiv.innerHTML = `
  //     <div class="w-full">
  //       <label for="plan-name-${planId}" class="text-sm text-gray-500 font-semibold">Nome do plano</label>
  //       <input type="text" name="username" data-service-param="plan-name-${planId}" id="plan-name-${planId}" class="paramValue w-full block flex-1 mt-1.5 bg-gray-50 py-2 pl-3 border-0 ring-1 ring-inset ring-gray-200 text-gray-900  placeholder:text-gray-500 focus:ring-[3px] focus:ring-gray-400 sm:text-sm sm:leading-6 rounded-lg shadow-sm" placeholder="Nome do primeiro plano">
  //     </div>
  //     <div class="w-full">
  //       <label for="plan-${planId}-preco" class="block text-sm font-medium leading-6 text-gray-900 ">Valor do plano</label>
  //       <div class="relative mt-2 rounded-md shadow-sm w-full">
  //         <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
  //           <span class="text-gray-500 sm:text-sm prefixCurrency">R$</span>
  //         </div>
  //         <input type="text" name="plan-${planId}-preco" data-price data-service-param="plan-${planId}-preco" id="plan-${planId}-preco" class="paramValue bg-gray-50 block w-full rounded-md border-0 py-2 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6" placeholder="00,00" data-value>
  //         <div class="absolute inset-y-0 right-0 flex items-center">
  //           <label for="currency" class="sr-only">Currency</label>
  //           <div class="custom-select-container h-full">
  //             <select id="currency" name="currency" class="paramValue currencyInput h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm ">
  //               <option value="BRL" selected>BRL</option>
  //               <option value="USD">USD</option>
  //               <option value="EUR">EUR</option>
  //             </select>
  //             <img src="./src/svg/chevron-right.svg" class="inject-svg size-5 rotate-90 stroke-gray-500 absolute top-1/2 -translate-y-1/2 right-2" alt="">
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <div class="w-full">
  //       <label for="plan-${planId}-service-01" class="text-sm text-gray-500 font-semibold">Serviço 01</label>
  //       <input type="text" name="username" data-service-optn data-service-param="plan-${planId}-service-01" id="plan-${planId}-service-01" class="w-full block flex-1 mt-1.5 bg-gray-50 py-2 pl-3 border-0 ring-1 ring-inset ring-gray-200 text-gray-900  placeholder:text-gray-500 focus:ring-[3px] focus:ring-gray-400 sm:text-sm sm:leading-6 rounded-lg shadow-sm" placeholder="Adicione o nome do serviço">
  //     </div>

  //     <button type="button" class="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 shadow-sm group hover:shadow-md transition-all add-service-btn">
  //       <p class="text-sm font-semibold text-gray-600 group-hover:text-gray-900 transition-all">Adicionar serviço</p>
  //       <img src="./src/svg/plus.svg" class="inject-svg size-5 stroke-gray-600 group-hover:stroke-gray-900 dark:group-hover:stroke-white transition-all" alt="">
  //     </button>
  //   `;

  //   return planDiv;
  // }

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
