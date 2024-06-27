document.addEventListener("DOMContentLoaded", () => {
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  if (mediaQuery.matches) {
    const howItWorksButton = document.querySelectorAll(
      "[button-mobile-toggle]"
    );
    const howItWorksContent = document.querySelectorAll("[content-toggle]");

    function init() {
      howItWorksContent.forEach((content) => {
        content.style.margin = "32px 0";
        content.style.padding = "0px 16px";
        content.setAttribute("data-state", "opened");
        howItWorksButton.forEach((button) => {
          let isOpen =
            content.getAttribute("data-state") === "opened" &&
            button.getAttribute("button-mobile-toggle") ===
              content.getAttribute("content-toggle");
          isOpen && button.classList.toggle("open");
        });
      });
    }

    init();

    function toggleContent(button, contents) {
      const buttonToggleAttribute = button.getAttribute("button-mobile-toggle");
      contents.forEach((content) => {
        const contentToggleAttribute = content.getAttribute("content-toggle");
        if (contentToggleAttribute === buttonToggleAttribute) {
          const isOpen = content.getAttribute("data-state") === "opened";
          animateContent(content, isOpen);
          content.setAttribute("data-state", isOpen ? "closed" : "opened");
        }
      });
    }

    function animateContent(content, isOpen = false) {
      const animationProps = isOpen
        ? { height: 0, padding: 0, margin: 0 }
        : { height: "auto", padding: "0px 16px", margin: "32px 0" };
      gsap.to(content, { ...animationProps, duration: 0.5, ease: "expo.out" });

      const items = content.querySelectorAll("h3, p, img, button");
      const itemAnimationProps = isOpen
        ? { opacity: 0, x: -20, filter: "blur(8px)" }
        : { opacity: 1, x: 0, filter: "none" };
      gsap.to(items, {
        ...itemAnimationProps,
        duration: 0.5,
        delay: { each: 0.1 },
        ease: "expo.out",
      });
    }

    howItWorksButton.forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.toggle("open");
        toggleContent(button, howItWorksContent);
      });
    });
  } else {
    const howItWorksContent = document.querySelectorAll("[content-toggle]");
    const howItWorksButtons = document.querySelectorAll("[data-sticky]");

    let activeIndex;
    function updateButton() {
      howItWorksContent.forEach((content, index) => {
        let coords = content.getBoundingClientRect();
        if (coords.top <= 100 && coords.bottom > 0) {
          activeIndex = content.getAttribute("content-toggle");
          howItWorksButtons.forEach((button) => {
            button.classList.remove("active");
            if (button.getAttribute("data-sticky") === activeIndex) {
              button.classList.add("active");
            }
          });
        }
      });
    }

    function createSubNavigation() {
      howItWorksContent.forEach((content) => {
        // Encontre os elementos .child-navigation dentro deste conteúdo específico.
        const childNavs = content.querySelectorAll(".child-navigation");

        childNavs.forEach((child) => {
          let textSubNav = child.querySelector("h3").textContent;
          let linkSubNav = child.getAttribute("id");

          let newLink = document.createElement("a");
          newLink.classList.add(
            "sub-nav-link",
            "text-sm",
            "text-gray-500",
            "hover:text-gray-900"
          );

          newLink.setAttribute("href", `#${linkSubNav}`);
          newLink.textContent = textSubNav;

          // Encontre o botão correspondente para este conteúdo.
          howItWorksButtons.forEach((button) => {
            if (
              button.getAttribute("data-sticky") ===
              content.getAttribute("content-toggle")
            ) {
              button.parentElement.appendChild(newLink.cloneNode(true)); // Usa cloneNode para criar uma cópia do link.
            }
          });
        });
      });
    }

    function updateSubNav() {
      const howItWorksSubContent =
        document.querySelectorAll(".child-navigation");
      const howItWorksSubNav = document.querySelectorAll(".sub-nav-link");

      howItWorksSubContent.forEach((content) => {
        let coords = content.getBoundingClientRect();
        if (coords.top <= 100 && coords.bottom > 0) {
          activeIndex = content.getAttribute("id");
          howItWorksSubNav.forEach((button) => {
            button.style.removeProperty("--active-color");
            button.classList.remove("is-active");
            if (button.getAttribute("href") === `#${activeIndex}`) {
              button.style.setProperty("--active-color", "#818cf8");
              button.classList.add("is-active");
            }
          });
        }
      });
    }

    createSubNavigation();
    updateButton();
    updateSubNav();
    window.addEventListener("scroll", updateButton);
    window.addEventListener("scroll", updateSubNav);
  }
});
