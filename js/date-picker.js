document.addEventListener("DOMContentLoaded", (e) => {
  flatpickr("#data-envio", {
    minDate: "today",
    dateFormat: "d-m-Y",
  });
  flatpickr("#data-validade", {
    minDate: "today",
    dateFormat: "d-m-Y",
  });
});