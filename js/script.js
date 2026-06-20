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
              toggleBtn.contains(event.target) ||
              dropMenu.contains(event.target);
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