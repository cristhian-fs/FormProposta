export function getParamsValue(input, callback) {
  input.addEventListener("input", (e) => {
    const paramName = input.getAttribute("id");
    let paramValue = e.target.value;
    callback(paramName, paramValue); // Chama o callback com os parâmetros
  });
}

export function getNewParams() {
  return document.querySelectorAll(".paramValue");
}

export function createDynamicInputWithTabs(
  inputId,
  tabsContainerId,
  initialData = []
) {
  const serviceClass = [
    "px-1",
    "py-0.5",
    "relative",
    "rounded-md",
    "transition-all",
    "group",
    "flex",
    "items-center",
    "justify-center",
    "whitespace-nowrap",
    "text-gray-900",
    "gap-1",
    "border-2",
    "border-gray-200",
    "bg-gray-100",
  ];
  const input = document.getElementById(inputId);
  const servicesTabs = document.getElementById(tabsContainerId);
  let selectedOptions = initialData.slice(); // Cria uma cópia do array de dados inicial

  function updateInput() {
    input.setAttribute("data-value", selectedOptions.join(", "));

    // Simular o evento de input
    document.dispatchEvent(
      new CustomEvent("serviceAdded", {
        detail: selectedOptions,
        bubbles: true,
      })
    );
  }

  function createTab(text) {
    let newTab = document.createElement("div");
    newTab.classList.add(...serviceClass);
    newTab.innerHTML = `
      <p class="text-sm font-medium">${text}</p>
      <button class="deleteServiceBtn">
        <svg width="24" height="24" class="stroke-current size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 7L7 17M7 7L17 17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `;

    // Adicionar evento de clique ao botão de deletar
    newTab.querySelector(".deleteServiceBtn").addEventListener("click", () => {
      newTab.remove();
      selectedOptions = selectedOptions.filter((option) => option !== text);
      updateInput(); // Atualizar o input após remover uma aba
    });

    servicesTabs.insertBefore(newTab, input);
  }

  // Inicializa as tabs com dados salvos
  selectedOptions.forEach((item) => createTab(item));
  updateInput(); // Atualizar o input após inicializar as abas

  // Adicionar evento keydown ao input
  input.addEventListener("keydown", (e) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault(); // Prevenir comportamento padrão do Enter
      let text = input.value.trim();

      if (text && !selectedOptions.includes(text)) {
        createTab(text);
        selectedOptions.push(text);
        input.value = ""; // Limpar o input após adicionar a nova aba
        updateInput(); // Atualizar o input após adicionar uma nova aba
      }
    }
  });
}
