const inputClassList = [
  "paramValue",
  "w-full",
  "block",
  "flex-1",
  "mt-1.5",
  "bg-gray-50",
  "py-2",
  "pl-3",
  "border-0",
  "ring-1",
  "ring-inset",
  "ring-gray-200",
  "text-gray-900",
  "placeholder:text-gray-500",
  "focus:ring-[3px]",
  "focus:ring-gray-400",
  "focus-within:ring-gray-400",
  "sm:text-sm",
  "sm:leading-6",
  "rounded-lg",
  "shadow-sm",
];

document.addEventListener("DOMContentLoaded", (e) => {
  const newParamButton = document.querySelector(".new-parameter-button");
  const paramsParent = document.getElementById("params-field");
  const formNewParam = document.querySelector(".form-new-param");

  let isOpenNewParam = false;

  newParamButton.addEventListener("click", (e) => {
    if (!isOpenNewParam) {
      formNewParam.classList.replace("hidden", "flex");
      isOpenNewParam = true;
    } else {
      formNewParam.classList.replace("flex", "hidden");
      isOpenNewParam = false;
    }
  });

  const cancelSubmitButton = formNewParam.querySelector(".cancelAddParam");

  cancelSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    formNewParam.classList.replace("flex", "hidden");
    isOpenNewParam = false;
  });

  const submitButton = formNewParam.querySelector(".addParamBtn");
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newParamInput = formNewParam.querySelector('input[type="text"]');
    const newParam = newParamInput.value;

    let paramDivAdded = document.createElement("div");
    paramDivAdded.classList.add("w-full", "extraParamDiv");

    let paramLabel = document.createElement("label");
    paramLabel.setAttribute("for", slugify(newParam));
    paramLabel.classList.add(
      "text-sm",
      "text-gray-600",
      "font-semibold",
      "block"
    );
    paramLabel.textContent = newParam;

    let inputDiv = document.createElement("div");
    inputDiv.classList.add("w-full", "relative", "group");

    let inputParam = document.createElement("input");
    inputParam.setAttribute("type", "text");
    inputParam.setAttribute("id", slugify(newParam));
    inputParam.setAttribute("name", slugify(newParam));
    inputParam.classList.add(...inputClassList);

    let deleteParamButton = document.createElement("button");
    deleteParamButton.classList.add("deleteParam");

    let iconDeleteParamBtn = document.createElement("img");
    iconDeleteParamBtn.setAttribute("src", "./svg/trash-01.svg");
    SVGInject(iconDeleteParamBtn);
    iconDeleteParamBtn.classList.add("size-5");

    deleteParamButton.appendChild(iconDeleteParamBtn);
    inputDiv.appendChild(inputParam);
    inputDiv.appendChild(deleteParamButton);

    paramDivAdded.appendChild(paramLabel);
    paramDivAdded.appendChild(inputDiv);
    paramsParent.appendChild(paramDivAdded);
    // limpando valor do input e retirando a div da visão do usuário
    newParamInput.value = "";
    formNewParam.classList.replace("flex", "hidden");
    isOpenNewParam = false;

    deleteParamButton.addEventListener("click", () => {
      paramDivAdded.remove();
      const inputRemovido = new Event("inputRemovido", {
        bubbles: true,
      });
      document.body.dispatchEvent(inputRemovido);
    });

    // Disparar evento personalizado
    const eventoInputAdicionado = new CustomEvent("inputAdicionado", {
      bubbles: true,
    });
    document.body.dispatchEvent(eventoInputAdicionado);
  });

  function slugify(text) {
    return text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
});