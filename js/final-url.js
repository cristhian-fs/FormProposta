function getNewParams() {
  return document.querySelectorAll(".paramValue");
}

document.addEventListener("DOMContentLoaded", (e) => {
  const domainURL = document.querySelector("#domainURL");
  let domainURLValue;
  domainURL.addEventListener("input", (e) => {
    domainURLValue = e.target.value;
    generateLink();
    verificarValores();
  });

  const pageSlug = document.querySelector("#pageSlug");
  let pageSlugValue;
  pageSlug.addEventListener("input", (e) => {
    pageSlugValue = e.target.value;
    generateLink();
    verificarValores();
  });

  const copyUrlButton = document.querySelector("#copy-url-btn");
  const acessLink = document.getElementById("url-navigator-btn");
  function verificarValores() {
    if (domainURLValue && pageSlugValue) {
      copyUrlButton.removeAttribute("disabled");
      acessLink.removeAttribute("disabled");
    }
  }

  copyUrlButton.addEventListener("click", (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(finalUrlInput.getAttribute("value"));
    Toastify({
      text: "URL Copiada",
      duration: 3000,
      hideProgressBar: false,
      progress: 3000,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#FCFAFF",
        border: "1px solid #D6BBFB",
        borderRadius: "12px",
        color: "#6941C6",
      },
    }).showToast();
  });

  let paramInputs = getNewParams();

  let params = [];

  document.addEventListener("serviceAdded", (e) => {
    const serviceInput = document.getElementById("inclui");
    const paramName = serviceInput.getAttribute("id");
    const serviceParamValue = encodeURIComponent(
      serviceInput.getAttribute("data-value")
    );

    if (!serviceParamValue) {
      params = params.filter((param) => !param.startsWith(`${paramName}=`));
    }

    if (serviceParamValue.trim() !== "") {
      params = params.filter((param) => !param.startsWith(`${paramName}=`)); // Remove o antigo para evitar duplicados
      params.push(`${paramName}=${serviceParamValue}`);
    }

    generateLink(); // Verifique os parâmetros atualizados
  });

  function getParamsValue(input) {
    input.addEventListener("input", (e) => {
      const paramName = input.getAttribute("id");

      let paramValue;

      // Verifica se o parâmetro é price, discount ou totalPrice
      if (
        paramName === "preco" ||
        paramName === "desconto" ||
        paramName === "preco-total"
      ) {
        paramValue = encodeURIComponent(input.getAttribute("data-value"));
      } else {
        paramValue = encodeURIComponent(e.target.value);
      }

      // Remove o parâmetro antigo se existir
      params = params.filter((param) => !param.startsWith(`${paramName}=`));

      // Adiciona o novo parâmetro se o valor não estiver vazio
      if (paramValue.trim() !== "") {
        params.push(`${paramName}=${paramValue}`);
      }

      // Gera o link com base nos valores atualizados
      generateLink();
    });
  }

  paramInputs.forEach((input) => {
    getParamsValue(input);
  });

  // Escute o evento "inputAdicionado" para atualizar a lista de inputs
  document.body.addEventListener("inputAdicionado", () => {
    paramInputs = getNewParams();
    paramInputs.forEach((input) => {
      getParamsValue(input);
    });
  });

  document.body.addEventListener("inputRemovido", () => {
    paramInputs = getNewParams();
    // Crie uma lista de IDs dos inputs
    const inputIDs = Array.from(paramInputs).map((input) =>
      input.getAttribute("id")
    );

    params = params.filter((param) => {
      const paramName = param.split("=")[0];
      return inputIDs.includes(paramName);
    });

    generateLink();
    return params;
  });

  const finalUrlInput = document.querySelector("#finalURL");
  const acessBtn = document.querySelector("#proposta-url");
  function generateLink() {
    if (domainURLValue && pageSlugValue) {
      finalUrlInput.value = `http://${domainURLValue}/${pageSlugValue}?${params.join(
        "&"
      )}`;
      finalUrlInput.setAttribute(
        "value",
        `http://${domainURLValue}/${pageSlugValue}?${params.join("&")}`
      );

      acessBtn.setAttribute(
        "href",
        `http://${domainURLValue}/${pageSlugValue}?${params.join("&")}`
      );
    }

    finalUrlInput.setAttribute(
      "placeholder",
      "Por favor preencha os campos de dominio e slug"
    );
  }
});
