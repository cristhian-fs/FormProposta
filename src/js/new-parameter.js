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

export function initNewParameters() {
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

    let iconDeleteParamBtn = document.createElement("div");
    iconDeleteParamBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6" stroke="#F04438" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;
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
}
