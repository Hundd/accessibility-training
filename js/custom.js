const SNACKBAR_INTERVAL = 60 * 1000;

(function () {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function () {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });

  initSnackbar();
})();

const tabs = document.querySelectorAll("#nav li");

tabs.forEach(function (navEl, i) {
  const toggle = () => {
    toggleTab(navEl.id, navEl.dataset.target);
  };
  navEl.addEventListener("click", toggle);
  navEl.addEventListener("keydown", function (e) {
    const total = tabs.length;
    let nextIndex;

    switch (e.code) {
      case "Space":
      case "Enter":
        toggle();
        break;

      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (i + 1) % total;
        break;

      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (i - 1 + total) % total;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = total - 1;
        break;

      default:
        return;
    }
    e.preventDefault();
    if (nextIndex !== undefined) {
      tabs[nextIndex].focus();
    }
  });
});

function toggleTab(selectedNav, targetId) {
  tabs.forEach((tab) => {
    if (tab.id === selectedNav) {
      tab.classList.add("is-active");
      tab.tabIndex = 0;
      tab.ariaSelected = true;
    } else {
      if (tab.classList.contains("is-active")) {
        tab.classList.remove("is-active");
        tab.tabIndex = -1;
        tab.ariaSelected = false;
      }
    }
  });

  const tabPanels = document.querySelectorAll(".tab-pane");

  tabPanels.forEach(function (tab) {
    if (tab.id === targetId) {
      tab.style.display = "block";
      tab.tabIndex = 0;
    } else {
      tab.style.display = "none";
      tab.tabIndex = -1;
    }
  });
}

function initSnackbar() {
  const snackBar = document.getElementById("snackbar");
  const closeButton = snackBar.querySelector(".delete");
  const title = snackBar.querySelector(".snackbar-title");
  const text = snackBar.querySelector(".message-body");

  const interval = setInterval(() => {
    getRandomComment().then(({ name, body }) => {
      title.textContent = name;
      text.textContent = body;
      snackBar.hidden = false;
      snackBar.ariaHidden = false;
      snackBar.ariaLive = "assertive";
    });
  }, SNACKBAR_INTERVAL);

  closeButton.addEventListener("click", () => {
    clearInterval(interval);
    snackBar.hidden = true;
    snackBar.ariaHidden = true;
    snackBar.ariaLive = "off";
  });
}

function getRandomComment() {
  const id = Math.floor(100 * Math.random() + 1);
  return fetch(`https://jsonplaceholder.typicode.com/comments/${id}`).then(
    (res) => res.json()
  );
}

const navbarDropdown = document.getElementById("navbar-dropdown");
const administration = document.getElementById("administration");

function openNavbarDropdown() {
  navbarDropdown.style.display = "block";
  administration.ariaExpanded = true;
  navbarDropdown.firstElementChild.focus();
}

function closeNavbarDropdown() {
  navbarDropdown.style.display = "none";
  administration.ariaExpanded = false;
}

administration.addEventListener("click", () => {
  const isVisible = navbarDropdown.style.display === "block";
  if (isVisible) {
    closeNavbarDropdown();
  } else {
    openNavbarDropdown();
  }
});

const dropdownMenuItems = navbarDropdown.querySelectorAll(".navbar-item");
dropdownMenuItems.forEach((item, i) => {
  item.addEventListener("keydown", (e) => {
    const total = dropdownMenuItems.length;
    let nextIndex;

    switch (e.code) {
      case "Tab":
        closeNavbarDropdown();
        return;

      case "Escape":
        closeNavbarDropdown();
        administration.focus();
        return;

      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (i + 1) % total;
        break;

      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (i - 1 + total) % total;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = total - 1;
        break;

      default:
        return;
    }
    e.stopPropagation();
    e.preventDefault();
    if (nextIndex !== undefined) {
      dropdownMenuItems[nextIndex].focus();
    }
  });
});
