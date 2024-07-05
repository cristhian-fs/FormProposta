export function initMoneyInputs() {
  const form = document.querySelector("#single-form");
  const currencyInputs = form.querySelectorAll("#preco, #desconto");
  const currencyOptions = form.querySelectorAll(".currencyInput");
  const prefixOptionsText = form.querySelectorAll(".prefixCurrency");

  let activeCurrency = "BRL";
  const prefixCurrencyOptions = {
    BRL: "R$",
    USD: "$",
    EUR: "€",
  };

  function updateCurrencyOptions(selectedCurrency) {
    currencyOptions.forEach((option) => {
      option.value = selectedCurrency;
    });
    prefixOptionsText.forEach((text) => {
      text.textContent = prefixCurrencyOptions[selectedCurrency];
    });
  }

  function formatNumberToCurrency(value) {
    let formattedNumber;
    switch (activeCurrency.toUpperCase()) {
      case "BRL":
        formattedNumber = new Intl.NumberFormat("pt-BR").format(value);
        break;
      case "USD":
        formattedNumber = new Intl.NumberFormat("en-US").format(value);
        break;
      case "EUR":
        formattedNumber = new Intl.NumberFormat("de-DE").format(value);
        break;
      default:
        formattedNumber = "Unsupported currency";
    }
    return formattedNumber;
  }

  function updateInputValue(input) {
    if (input.value) {
      const unformattedValue = input.getAttribute("data-value");
      input.value = formatNumberToCurrency(parseFloat(unformattedValue));
    }
  }

  function handleCurrencyChange(event) {
    activeCurrency = event.target.value;
    updateCurrencyOptions(activeCurrency);

    currencyInputs.forEach((input) => {
      updateInputValue(input);
    });
  }

  function handleInput(event) {
    const input = event.target;
    const unformattedValue = input.value.replace(/[^\d]/g, "");
    const numericValue = parseInt(unformattedValue, 10);

    if (!isNaN(numericValue)) {
      input.value = formatNumberToCurrency(numericValue);
      input.setAttribute("data-value", numericValue);

      updateTotalPrice();
    } else {
      input.value = "";
      input.setAttribute("data-value", "");
    }
  }

  function updateTotalPrice() {
    const totalPriceElement = document.querySelector("#preco-total");
    const price = parseInt(
      document.querySelector("#preco").getAttribute("data-value"),
      10
    );
    const discount = parseInt(
      document.querySelector("#desconto").getAttribute("data-value"),
      10
    );

    if (!isNaN(price) && !isNaN(discount)) {
      const totalPriceValue = price - discount;
      totalPriceElement.setAttribute(
        "value",
        formatNumberToCurrency(totalPriceValue)
      );
      totalPriceElement.setAttribute("data-value", totalPriceValue);

      const totalPriceEvent = new Event("input", { bubbles: true });
      totalPriceElement.dispatchEvent(totalPriceEvent);
    } else {
      totalPriceElement.setAttribute("value", "");
      totalPriceElement.setAttribute("data-value", "");
    }
  }

  // Adicionar evento para alteração de moeda
  currencyOptions[0].addEventListener("input", handleCurrencyChange);

  // Adicionar eventos para os inputs de preço e desconto
  currencyInputs.forEach((input) => {
    input.addEventListener("input", handleInput);
  });
}
