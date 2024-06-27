document.addEventListener("DOMContentLoaded", (e) => {
  flatpickr("#data-envio", {
    locale: "pt",
    minDate: "today",
    dateFormat: "d-m-Y",
  });
  flatpickr("#data-validade", {
    locale: "pt",
    minDate: "today",
    dateFormat: "d-m-Y",
  });
});
