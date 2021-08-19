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
    const isAction = ["Space", "Enter"].includes(e.code);
    if (isAction) {
      e.preventDefault();
      toggle();
    }

    const isNext = ["ArrowRight", "ArrowDown"].includes(e.code);
    const isPrev = ["ArrowLeft", "ArrowUp"].includes(e.code);
    if (!(isNext || isPrev)) return;
    e.preventDefault();
    const total = tabs.length;

    const nextIndex = isNext ? (i + 1) % total : (i - 1 + total) % total;
    tabs[nextIndex].focus();
  });
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function (navEl) {
    if (navEl.id === selectedNav) {
      navEl.classList.add("is-active");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function (tab) {
    if (tab.id === targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
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
