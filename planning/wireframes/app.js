const screens = [...document.querySelectorAll(".screen")];
const navButtons = [...document.querySelectorAll(".nav-link")];
const sidebar = document.querySelector("#sidebar");
const menuToggle = document.querySelector("#menu-toggle");
const currentSection = document.querySelector("#current-section");
const toast = document.querySelector("#toast");
let toastTimer;

function showScreen(name) {
  const target = document.querySelector(`#screen-${name}`);
  if (!target) return;

  screens.forEach((screen) => {
    const active = screen === target;
    screen.classList.toggle("active", active);
    screen.hidden = !active;
  });

  const title = target.dataset.title || "Preview";
  currentSection.textContent = title;
  document.title = `FintaLab — ${title}`;
  navButtons.forEach((button) => {
    if (button.dataset.screen === name) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
  sidebar.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
}

function announce(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 3200);
}

document.addEventListener("click", (event) => {
  const openDialog = event.target.closest("[data-dialog-open]");
  if (openDialog) {
    document.querySelector("#demo-dialog").showModal();
    return;
  }

  const closeDialog = event.target.closest("[data-dialog-close]");
  if (closeDialog) {
    document.querySelector("#demo-dialog").close();
    return;
  }

  const confirmDialog = event.target.closest("[data-dialog-confirm]");
  if (confirmDialog) {
    document.querySelector("#demo-dialog").close();
    announce("Confirmation is simulated; no relationship changed.");
    return;
  }

  const screenButton = event.target.closest("[data-screen]");
  if (screenButton) {
    event.preventDefault();
    showScreen(screenButton.dataset.screen);
    return;
  }

  const toastButton = event.target.closest("[data-toast]");
  if (toastButton) announce(toastButton.dataset.toast);

  const segment = event.target.closest("[data-mode]");
  if (segment) {
    document.querySelectorAll(".segment").forEach((item) => item.classList.toggle("active", item === segment));
    announce(segment.dataset.mode === "request"
      ? "Relationship request preview selected. No athlete was contacted."
      : "New profile preview selected. Nothing was saved.");
  }
});

document.querySelectorAll(".demo-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    announce("Prototype only — nothing was saved, uploaded, or sent.");
  });
});

document.querySelectorAll(".settings-tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".settings-tabs button").forEach((item) => item.classList.toggle("active", item === button));
    announce(`${button.textContent.trim()} preview selected. No settings were changed.`);
  });
});

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  sidebar.classList.toggle("open", !expanded);
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  menuToggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && sidebar.classList.contains("open")) {
    sidebar.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.focus();
  }
});

document.querySelector("#role-preview").addEventListener("change", (event) => {
  const role = event.target.value;
  const organization = role !== "player";
  document.querySelectorAll("[data-nav-role]").forEach((button) => {
    const visible = button.dataset.navRole === "shared"
      || (role === "player" && button.dataset.navRole === "player")
      || (organization && button.dataset.navRole === "organization");
    button.hidden = !visible;
  });
  document.querySelector("#org-kind").textContent = event.target.value === "club"
    ? "CLUB WORKSPACE · FICTIONAL DATA"
    : "AGENCY WORKSPACE · FICTIONAL DATA";
  document.querySelector("#org-greeting").textContent = event.target.value === "club"
    ? "Sample City Club"
    : "Northstar Agency";
  if (organization && document.querySelector("#screen-org-dashboard").classList.contains("active")) {
    currentSection.textContent = "Organization dashboard";
  }
  const currentScreen = document.querySelector(".screen.active")?.id;
  if (role === "player" && ["screen-org-dashboard", "screen-roster", "screen-athlete", "screen-athlete-edit", "screen-settings"].includes(currentScreen)) {
    showScreen("player-dashboard");
  } else if (organization && ["screen-player-dashboard", "screen-player-profile"].includes(currentScreen)) {
    showScreen("org-dashboard");
  }
});

const rosterSearch = document.querySelector("#athlete-search");
const positionFilter = document.querySelector("#position-filter");
const rosterRows = [...document.querySelectorAll("#roster-table tbody tr")];
const rosterEmpty = document.querySelector("#roster-empty");

function filterRoster() {
  const query = rosterSearch.value.trim().toLowerCase();
  const position = positionFilter.value;
  let visible = 0;
  rosterRows.forEach((row) => {
    const matches = row.dataset.name.includes(query) && (!position || row.dataset.position === position);
    row.hidden = !matches;
    if (matches) visible += 1;
  });
  rosterEmpty.hidden = visible !== 0;
}

rosterSearch.addEventListener("input", filterRoster);
positionFilter.addEventListener("change", filterRoster);
showScreen("landing");
