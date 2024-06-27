export function initMoneyInputs() {
  const currencyInputs = document.querySelectorAll("#preco, #desconto");
  const currencyOptions = document.querySelectorAll(".currencyInput");
  const prefixOptionsText = document.querySelectorAll(".prefixCurrency");

  let activeCurrency = "BRL";
  let prefixCurrencyOptions = {
    BRL: "R$",
    USD: "$",
    EUR: "€",
  };

  // Atualiza a moeda ativa e os prefixos de moeda
  currencyOptions[0].addEventListener("input", (e) => {
    activeCurrency = e.target.value;
    currencyOptions.forEach((option) => {
      option.value = e.target.value;
    });
    prefixOptionsText.forEach((text) => {
      text.textContent = prefixCurrencyOptions[e.target.value];
    });

    currencyInputs.forEach((input) => {
      if (input.value) {
        let valorNaoFormatado = input.getAttribute("data-value");
        input.value = formatarNumeroParaMoeda(parseFloat(valorNaoFormatado));
      }
    });
  });

  currencyInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      const valorSemFormatacao = e.target.value.replace(/[^\d]/g, "");
      const valorNumerico = parseInt(valorSemFormatacao);
      if (!isNaN(valorNumerico)) {
        input.value = formatarNumeroParaMoeda(valorNumerico);
        input.setAttribute("data-value", valorNumerico);

        const totalPrice = document.querySelector("#preco-total");
        let price = document.querySelector("#preco").getAttribute("data-value");
        let discount = document
          .querySelector("#desconto")
          .getAttribute("data-value");

        if (price && discount) {
          let totalPriceValue = parseInt(price) - parseInt(discount);
          totalPrice.setAttribute(
            "value",
            formatarNumeroParaMoeda(totalPriceValue)
          );
          totalPrice.setAttribute("data-value", totalPriceValue);

          // Disparar evento personalizado
          const totalPriceEvent = new Event("input", {
            bubbles: true,
          });
          totalPrice.dispatchEvent(totalPriceEvent);
        } else {
          totalPrice.setAttribute("value", "");
          totalPrice.setAttribute("data-value", "");
        }
      } else {
        // Se o valor inserido não for um número válido, limpa o campo
        input.value = "";
        input.setAttribute("data-value", "");
      }
    });
  });

  function formatarNumeroParaMoeda(valor) {
    let numeroFormatado;

    switch (activeCurrency.toUpperCase()) {
      case "BRL":
        numeroFormatado = new Intl.NumberFormat("pt-BR").format(valor);
        break;
      case "USD":
        numeroFormatado = new Intl.NumberFormat("en-US").format(valor);
        break;
      case "EUR":
        numeroFormatado = new Intl.NumberFormat("de-DE").format(valor);
        break;
      default:
        numeroFormatado = "Moeda não suportada";
    }
    return numeroFormatado;
  }
}
