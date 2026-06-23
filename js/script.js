(function () {
  // ----- HAMBURGER (smooth toggle) -----
  const hamburger = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      this.classList.toggle("active");
      mobileNav.classList.toggle("open");
    });

    // close mobile nav when a link is clicked (with smooth transition)
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        mobileNav.classList.remove("open");
      });
    });
  }

  // ----- DESKTOP DROPDOWN -----
  const toggleBtn = document.getElementById("dropdownToggle");
  const dropMenu = document.getElementById("dropdownMenu");
  if (toggleBtn && dropMenu) {
    function toggleDropdown(e) {
      e.stopPropagation();
      dropMenu.classList.toggle("open");
      toggleBtn.classList.toggle("active");
    }
    toggleBtn.addEventListener("click", toggleDropdown);

    document.addEventListener("click", function (event) {
      const inside =
        toggleBtn.contains(event.target) || dropMenu.contains(event.target);
      if (!inside) {
        dropMenu.classList.remove("open");
        toggleBtn.classList.remove("active");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        dropMenu.classList.remove("open");
        toggleBtn.classList.remove("active");
      }
    });

    dropMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        dropMenu.classList.remove("open");
        toggleBtn.classList.remove("active");
      });
    });
    dropMenu.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  // ----- close mobile nav on resize to desktop -----
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) {
      if (mobileNav) mobileNav.classList.remove("open");
      if (hamburger) hamburger.classList.remove("active");
    }
  });
})();
// go to top

const goToTopBtn = document.getElementById("goToTopBtn");

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    goToTopBtn.classList.remove("opacity-0", "invisible", "translate-y-4");
    goToTopBtn.classList.add("opacity-100", "visible", "translate-y-0");
  } else {
    goToTopBtn.classList.add("opacity-0", "invisible", "translate-y-4");
    goToTopBtn.classList.remove("opacity-100", "visible", "translate-y-0");
  }
});

goToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// counter dynamic

const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {
  const target = Number(counter.dataset.target);
  const duration = 2000;
  const start = performance.now();

  function update(currentTime) {
    const progress = Math.min((currentTime - start) / duration, 1);
    counter.textContent = Math.floor(progress * target);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // Run only once
      }
    });
  },
  {
    threshold: 0.5,
  },
);

counters.forEach((counter) => observer.observe(counter));
// steps journey section
let activeStep = 0;
const totalSteps = 4;

function setActiveStep(stepIndex) {
  activeStep = stepIndex;

  // Get all steps
  const steps = document.querySelectorAll(".step");
  const circles = document.querySelectorAll(".step-circle");
  const texts = document.querySelectorAll(".step-text");
  const progressFill = document.getElementById("progressFill");

  // Update each step
  steps.forEach((step, index) => {
    const circle = circles[index];
    const text = texts[index];

    if (index <= activeStep) {
      // Active or completed steps
      circle.className =
        "w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold transition-all duration-300 step-circle";
      text.className =
        "mt-2 text-sm font-medium text-blue-600 transition-all duration-300 step-text";

      // Add scale animation to circle
      if (index === activeStep) {
        circle.style.transform = "scale(1.15)";
        setTimeout(() => {
          circle.style.transform = "scale(1)";
        }, 300);
      }
    } else {
      // Inactive steps
      circle.className =
        "w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-sm font-semibold transition-all duration-300 step-circle";
      text.className =
        "mt-2 text-sm font-medium text-gray-500 transition-all duration-300 step-text";
    }
  });

  // Update progress line
  const progressPercentage = (activeStep / (totalSteps - 1)) * 100;
  progressFill.style.width = progressPercentage + "%";

  // You can add your navigation logic here
  console.log("Active Step:", activeStep + 1);
}

// Optional: Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight" && activeStep < totalSteps - 1) {
    setActiveStep(activeStep + 1);
  } else if (e.key === "ArrowLeft" && activeStep > 0) {
    setActiveStep(activeStep - 1);
  }
});

// Initialize first step as active
setActiveStep(0);
