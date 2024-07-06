export function initMultiFormTest() {
  const telefone = "11999999999";

  const stringParams = window.location.search;
  const urlParams = new URLSearchParams(stringParams);
  const paramsWords = document.querySelectorAll("[data-param]");

  function getPlanParams() {
    const planParams = {};

    urlParams.forEach((value, key) => {
      if (key.startsWith("plan-")) {
        const planMatch = key.match(/plan-(\d+)-(.*)/);
        if (planMatch) {
          const planIndex = planMatch[1];
          const paramType = planMatch[2];

          if (!planParams[planIndex]) {
            planParams[planIndex] = {};
          }

          if (paramType.startsWith("service")) {
            if (!planParams[planIndex].services) {
              planParams[planIndex].services = [];
            }
            planParams[planIndex].services.push(value);
          } else {
            planParams[planIndex][paramType] = value;
          }
        }
      }
    });

    return planParams;
  }

  function renderPlans(planParams) {
    Object.keys(planParams).forEach((planIndex) => {
      let planDiv = document.querySelector(`[data-param="plan-${planIndex}"]`);
      if (planDiv) {
        const { name, preco, services } = planParams[planIndex];

        if (name) {
          let nameElements = planDiv.querySelectorAll("[data-plan-param=name]");
          if (nameElements) {
            nameElements.forEach((el) => (el.textContent = name));
          }
        }

        if (preco) {
          let priceElement = planDiv.querySelector("[data-plan-param=preco]");
          if (priceElement) {
            let formattedValue = formatMoney(
              preco,
              urlParams.get("currency") || "BRL"
            );
            priceElement.textContent = formattedValue;

            let href = `https://wa.me/${telefone}?text=Quero garantir o plano ${name} pelo valor de ${formattedValue}`;
            const cta = planDiv
              .querySelector("[data-plan-param=cta]")
              .querySelector("a");
            if (cta) {
              cta.setAttribute("href", href);
            }
          }
        }

        if (services && services.length > 0) {
          let servicesContainer = planDiv.querySelector(".services");
          servicesContainer.innerHTML = ""; // Clear any previous services
          services.forEach((service) => {
            let serviceElement = document.createElement("div");
            serviceElement.classList.add("serviceElement");

            serviceElement.innerHTML = `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#7F56D9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p>
                ${service}
              </p>
              `;
            servicesContainer.appendChild(serviceElement);
          });
        }
      }
    });
  }

  if (urlParams) {
    const planParams = getPlanParams();

    if (planParams) {
      renderPlans(planParams);
      // Hide plans not in URL
      const activePlans = Object.keys(planParams).map(
        (index) => `plan-${index}`
      );
      const allPlanDivs = document.querySelectorAll("[data-param^='plan-']");
      allPlanDivs.forEach((planDiv) => {
        const planAttr = planDiv.getAttribute("data-param");
        if (!activePlans.includes(planAttr)) {
          planDiv.style.display = "none";
        }
      });
    }

    paramsWords.forEach((element) => {
      let dataParam = element.getAttribute("data-param");

      if (urlParams.has(dataParam)) {
        let value = urlParams.get(dataParam);

        if (dataParam === "data-envio" || dataParam === "data-validade") {
          if (value !== null && value.trim() !== "") {
            let dateFormat = value.replaceAll("-", "/");
            element.textContent = dateFormat;
          } else {
            element.textContent = "Data não definida";
          }
        } else if (!dataParam.startsWith("plan")) {
          element.textContent = value;
        }
      }
    });
  }

  function formatMoney(value, currency) {
    let numeroFormatado;

    switch (currency.toUpperCase()) {
      case "BRL":
        numeroFormatado = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value);
        break;
      case "USD":
        numeroFormatado = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value);
        break;
      case "EUR":
        numeroFormatado = new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(value);
        break;
      default:
        numeroFormatado = "Moeda não suportada";
    }
    return numeroFormatado;
  }
}
