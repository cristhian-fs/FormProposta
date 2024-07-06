export function initSingleFormTest() {
  const stringParams = window.location.search;
  const urlParams = new URLSearchParams(stringParams);

  const paramsWords = document.querySelectorAll("[data-param]");

  if (urlParams) {
    paramsWords.forEach((element) => {
      let dataParam = element.getAttribute("data-param");

      if (urlParams.has(dataParam)) {
        let value = urlParams.get(dataParam);

        if (dataParam === "data-envio" || dataParam === "data-validade") {
          // Verifica se o valor está presente na URL e não é nulo ou indefinido
          if (value !== null && value.trim() !== "") {
            // Formatar data de d-m-Y para d/m/Y
            let dateFormat = value.replaceAll("-", "/");
            element.textContent = dateFormat;
          } else {
            // Se o valor estiver ausente, exibir "Data não definida"
            element.textContent = "Data não definida";
          }
        } else if (dataParam === "preco" || dataParam === "desconto") {
          // Formatar preço ou desconto com prefixo monetário
          let priceFormat = `${formatMoney(
            parseFloat(value),
            urlParams.get("currency") || "BRL"
          )}`;
          element.textContent = priceFormat;
        } else if (dataParam === "preco-total") {
          // Calcular o total price
          let price = parseFloat(urlParams.get("preco")) || 0;
          let discount = parseFloat(urlParams.get("desconto")) || 0;
          let totalPrice = price - discount;

          element.textContent = `${formatMoney(
            totalPrice,
            urlParams.get("currency") || "BRL"
          )}`;
        } else if (dataParam === "inclui") {
          let includesString = decodeURI(urlParams.get("inclui"));
          let includesArray = includesString.split(",");

          let itemsWrapper = document.getElementById("includeItemsWrapper");

          if (includesArray) {
            includesArray.forEach((includeItem) => {
              let item = document.createElement("div");

              item.classList.add("include-item");

              item.innerHTML = `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#7F56D9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p>
                ${includeItem}
              </p>
              `;

              itemsWrapper.appendChild(item);
            });
          }
        } else {
          // Formatação padrão para outros parâmetros
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
