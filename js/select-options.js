document.addEventListener("DOMContentLoaded", (e) => {
  const input = document.getElementById("services");
  const dropdown = document.getElementById("dropdown-services");

  input.addEventListener("click", (e) => {
    dropdown.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    e.preventDefault();
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  });

  const items = dropdown.querySelectorAll("li");
  let selectedOptions = [];

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const text = item.textContent.trim();
      if (!selectedOptions.includes(text)) {
        selectedOptions.push(text);
        item.classList.add("is-selected");
      } else {
        selectedOptions = selectedOptions.filter((option) => option !== text);
        item.classList.remove("is-selected");
      }
      updateInput();
    });
  });

  function updateInput() {
    input.value = selectedOptions.join(", ");
  }
});
