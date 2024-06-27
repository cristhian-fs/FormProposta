import { createDynamicInputWithTabs } from "./inputs-aux-functions.js";

// document.addEventListener("DOMContentLoaded", (e) => {
//   const input = document.getElementById("inclui");
//   const servicesTabs = document.getElementById("includesTabs");

//   let selectedOptions = [];

//   // Adicionar evento keydown fora do evento input
//   input.addEventListener("keydown", (e) => {
//     if (!selectedOptions.lenght > 0) {
//       input.setAttribute("placeholder", "");
//     }

//     if (e.key === "Enter") {
//       e.preventDefault(); // Prevenir comportamento padrão do Enter
//       let text = input.value.trim();

//       if (text && !selectedOptions.includes(text)) {
//         let newTab = document.createElement("div");
//         newTab.classList.add(
//           "px-1",
//           "py-0.5",
//           "relative",
//           "rounded-md",
//           "transition-all",
//           "group",
//           "flex",
//           "items-center",
//           "justify-center",
//           "whitespace-nowrap",
//           "text-gray-900",
//           "gap-1",
//           "border-2",
//           "border-gray-200",
//           "bg-gray-100"
//         );
//         newTab.innerHTML = `
//           <p class="text-sm font-medium">${text}</p>
//           <button class="deleteServiceBtn">
//             <img src="./svg/x.svg" onload="SVGInject(this)" class="size-5 stroke-current" alt="">
//           </button>
//         `;

//         servicesTabs.insertBefore(newTab, input);

//         selectedOptions.push(text);
//         input.value = ""; // Limpar o input após adicionar a nova aba
//         updateInput();

//         // Adicionar evento de clique ao botão de deletar
//         newTab
//           .querySelector(".deleteServiceBtn")
//           .addEventListener("click", () => {
//             newTab.remove();
//             selectedOptions = selectedOptions.filter(
//               (option) => option !== text
//             );
//             updateInput();
//           });
//       }
//     }
//   });

//   function updateInput() {
//     input.setAttribute("data-value", selectedOptions.join(", "));

//     // Simular o evento de input
//     document.dispatchEvent(
//       new CustomEvent("serviceAdded", {
//         detail: selectedOptions,
//         bubbles: true,
//       })
//     );
//   }
// });

export function initServiceInput() {
  createDynamicInputWithTabs("inclui", "includesTabs");
}
