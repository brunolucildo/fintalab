wireframeI18n.init();
const screens = [...document.querySelectorAll(".screen")];
const navButtons = [...document.querySelectorAll(".nav-link")];
const sidebar = document.querySelector("#sidebar");
const menuToggle = document.querySelector("#menu-toggle");
const mobileNavigation = window.matchMedia("(max-width: 800px)");
const currentSection = document.querySelector("#current-section");
const toast = document.querySelector("#toast");
let toastTimer;
let toastMessage;
let toastParameters;

function renderPositionOptions() {
  document.querySelectorAll("[data-position-select]").forEach((select) => {
    const selected = select.multiple
      ? [...select.selectedOptions].map((option) => option.value)
      : [select.value];
    const filter = select.hasAttribute("data-position-filter");
    const placeholder = filter
      ? "Todas as posições"
      : select.multiple
        ? ""
        : "Selecione a posição";
    select.replaceChildren();
    if (placeholder) {
      const option = new Option(wireframeI18n.t(placeholder), "");
      select.append(option);
    }
    athletePositionGroups.forEach(({ label, positions }) => {
      const group = document.createElement("optgroup");
      group.label = wireframeI18n.t(label);
      positions.forEach((position) => {
        group.append(new Option(wireframeI18n.t(position), position));
      });
      select.append(group);
    });
    [...select.options].forEach((option) => {
      option.selected = selected.includes(option.value);
    });
  });
  document.querySelectorAll("[data-position-reference]").forEach((element) => {
    const position = demoPlayers[element.dataset.positionReference]?.[2];
    if (position) element.textContent = wireframeI18n.t(position);
  });
}

renderPositionOptions();

function setMenuOpen(open) {
  const expanded = mobileNavigation.matches && open;
  sidebar.classList.toggle("open", expanded);
  sidebar.inert = mobileNavigation.matches && !expanded;
  menuToggle.setAttribute("aria-expanded", String(expanded));
  menuToggle.setAttribute("aria-label", wireframeI18n.t(expanded ? "Fechar navegação" : "Abrir navegação"));
}

function showScreen(name) {
  const target = document.querySelector(`#screen-${name}`);
  if (!target) return;

  screens.forEach((screen) => {
    const active = screen === target;
    screen.classList.toggle("active", active);
    screen.hidden = !active;
  });

  const title = target.dataset.title || "Prévia";
  currentSection.textContent = title;
  document.title = `FintaLab — ${title}`;
  navButtons.forEach((button) => {
    if (button.dataset.screen === name) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
  setMenuOpen(false);
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
}

function announce(message, parameters = {}) {
  toastMessage = message;
  toastParameters = parameters;
  toast.textContent = wireframeI18n.t(message, parameters);
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
    announce("A confirmação é simulada; nenhum vínculo foi alterado.");
    return;
  }

  const screenButton = event.target.closest("[data-screen]");
  if (screenButton) {
    event.preventDefault();
    const signupRole = {
      "player-signup": "player",
      "agency-signup": "agency",
      "club-signup": "club",
    }[screenButton.dataset.screen];
    if (signupRole) {
      document.querySelector("#role-preview").value = signupRole;
      updateRolePreview(false);
    }
    const flowRole = screenButton.closest("[data-flow-role]")?.dataset.flowRole;
    if (flowRole && flowRole !== document.querySelector("#role-preview").value) {
      document.querySelector("#role-preview").value = flowRole;
      updateRolePreview(false);
    }
    const athleteRow = screenButton.closest("[data-athlete]");
    if (athleteRow && screenButton.dataset.screen === "athlete") {
      countryAthlete = athleteRow.dataset.athlete;
      renderSelectedAthlete();
      renderCountries();
    }
    if (screenButton.dataset.screen === "report") {
      const source = screenButton.closest(".screen")?.id;
      if (source === "screen-athlete") setReportAthlete(countryAthlete);
      else if (document.querySelector("#role-preview").value === "player") setReportAthlete("alex");
      else setReportAthlete(countryAthlete);
    }
    showScreen(screenButton.dataset.screen);
    return;
  }

  const toastButton = event.target.closest("[data-toast]");
  if (toastButton) announce(toastButton.dataset.toast);

  const segment = event.target.closest("[data-mode]");
  if (segment) {
    document.querySelectorAll(".segment").forEach((item) => item.classList.toggle("active", item === segment));
    announce(segment.dataset.mode === "request"
      ? "Prévia de solicitação de vínculo selecionada. Nenhum atleta foi contatado."
      : "Prévia de novo perfil selecionada. Nada foi salvo.");
  }
});

document.querySelectorAll(".demo-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.hasAttribute("data-demo-auth")) {
      const screen = document.querySelector("#role-preview").value === "player"
        ? "player-dashboard"
        : "org-dashboard";
      announce("Apenas protótipo: entrada simulada, sem autenticação real.");
      showScreen(screen);
      return;
    }
    if (form.dataset.demoNext) {
      announce("Apenas protótipo: nada foi salvo, enviado ou carregado.");
      showScreen(form.dataset.demoNext);
      return;
    }
    announce("Apenas protótipo: nada foi salvo, enviado ou carregado.");
  });
});

document.querySelectorAll(".settings-tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".settings-tabs button").forEach((item) => item.classList.toggle("active", item === button));
    announce("Prévia de {section} selecionada. Nenhuma configuração foi alterada.", {
      section: button.textContent.trim(),
    });
  });
});

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && sidebar.classList.contains("open")) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

window.addEventListener("resize", () => setMenuOpen(false));

function updateRolePreview(navigate = true) {
  const role = document.querySelector("#role-preview").value;
  const organization = role !== "player";
  document.querySelectorAll("[data-nav-role]").forEach((button) => {
    const visible = button.dataset.navRole === "shared"
      || (role === "player" && button.dataset.navRole === "player")
      || (organization && button.dataset.navRole === "organization");
    button.hidden = !visible;
  });
  document.querySelector("#org-kind").textContent = wireframeI18n.t(role === "club"
    ? "ESPAÇO DO CLUBE · DADOS FICTÍCIOS"
    : "ESPAÇO DA AGÊNCIA · DADOS FICTÍCIOS");
  document.querySelector("#org-greeting").textContent = wireframeI18n.t(role === "club"
    ? "Clube Cidade Modelo"
    : "Agência Northstar");
  countryOrganization = role === "club" ? "club" : "agency";
  renderCountries();
  if (organization && document.querySelector("#screen-org-dashboard").classList.contains("active")) {
    currentSection.textContent = wireframeI18n.t("Painel da organização");
  }
  const currentScreen = document.querySelector(".screen.active")?.id;
  if (navigate && role === "player" && ["screen-org-dashboard", "screen-roster", "screen-athlete", "screen-athlete-edit", "screen-settings"].includes(currentScreen)) {
    showScreen("player-dashboard");
  } else if (navigate && organization && ["screen-player-dashboard", "screen-player-profile"].includes(currentScreen)) {
    showScreen("org-dashboard");
  }
}
document.querySelector("#role-preview").addEventListener("change", () => updateRolePreview());

const rosterSearch = document.querySelector("#athlete-search");
const positionFilter = document.querySelector("#position-filter");
const rosterRows = [...document.querySelectorAll("#roster-table tbody tr")];
const rosterEmpty = document.querySelector("#roster-empty");

// Five-by-seven bitmap glyphs keep card lettering sharp without a remote font.
const cardGlyphs = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  G: ["01111", "10000", "10000", "10111", "10001", "10001", "01111"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  J: ["00111", "00010", "00010", "00010", "10010", "10010", "01100"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  Q: ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
  W: ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
  X: ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
  Z: ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
  0: ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  1: ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  2: ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  3: ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
  4: ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  5: ["11111", "10000", "10000", "11110", "00001", "00001", "11110"],
  6: ["01110", "10000", "10000", "11110", "10001", "10001", "01110"],
  7: ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  8: ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  9: ["01110", "10001", "10001", "01111", "00001", "00001", "01110"],
  " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
  "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
  "—": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
};

function renderCardPixelText(element) {
  const text = element.textContent.trim();
  const glyphs = [...text.toUpperCase()].map((character) => cardGlyphs[character]);
  // Preserve ordinary text for names/scripts outside this small display alphabet.
  if (!glyphs.length || glyphs.some((glyph) => !glyph)) {
    element.textContent = text;
    return;
  }
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("pixel-text");
  svg.setAttribute("viewBox", `0 0 ${glyphs.length * 6 - 1} 7`);
  svg.setAttribute("width", String(glyphs.length * 6 - 1));
  svg.setAttribute("height", "7");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  const path = document.createElementNS(svg.namespaceURI, "path");
  const pixels = [];
  glyphs.forEach((glyph, index) => {
    glyph.forEach((row, y) => {
      [...row].forEach((pixel, x) => {
        if (pixel === "1") pixels.push(`M${index * 6 + x} ${y}h1v1h-1z`);
      });
    });
  });
  path.setAttribute("d", pixels.join(""));
  svg.append(path);
  const accessibleText = document.createElement("span");
  accessibleText.className = "sr-only";
  accessibleText.textContent = text;
  element.replaceChildren(accessibleText, svg);
}

function getCardTier(overall) {
  if (typeof overall !== "number" || !Number.isInteger(overall) || overall < 0 || overall > 100) return "unrated";
  return overall <= 64 ? "bronze" : overall <= 74 ? "silver" : "gold";
}

// data-overall is the card's single rating source; changes also refresh its tier.
function renderPlayerCard(card) {
  const rawOverall = card.dataset.overall?.trim();
  const overall = rawOverall ? Number(rawOverall) : NaN;
  const tier = getCardTier(overall);
  card.dataset.tier = tier;
  card.querySelector(".overall strong").textContent = tier === "unrated" ? "—" : String(overall);
  const tierLabels = { bronze: "BRONZE", silver: "PRATA", gold: "OURO" };
  card.querySelector(".card-tier").textContent = tier === "unrated" ? "—" : wireframeI18n.t(tierLabels[tier]);
  card.querySelectorAll("[data-pixel-text]").forEach(renderCardPixelText);
}

document.querySelectorAll(".player-card").forEach((card) => {
  renderPlayerCard(card);
  new MutationObserver(() => renderPlayerCard(card)).observe(card, {
    attributes: true,
    attributeFilter: ["data-overall"],
  });
});

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
document.addEventListener("wireframe-language-change", () => {
  updateRolePreview(false);
  renderPositionOptions();
  document.querySelectorAll(".country-picker").forEach((picker) => closeCountryPicker(picker));
  renderSelectedAthlete();
  setReportAthlete(document.querySelector("#report-athlete").value);
  document.querySelectorAll(".player-card").forEach(renderPlayerCard);
  const title = document.querySelector(".screen.active")?.dataset.title || wireframeI18n.t("Prévia");
  currentSection.textContent = title;
  document.title = `FintaLab — ${title}`;
  setMenuOpen(menuToggle.getAttribute("aria-expanded") === "true");
  if (toast.classList.contains("visible") && toastMessage) {
    const activeTab = document.querySelector(".settings-tabs .active");
    const parameters = toastParameters.section ? { section: activeTab.textContent.trim() } : toastParameters;
    toast.textContent = wireframeI18n.t(toastMessage, parameters);
  }
});
renderSelectedAthlete();
showScreen("landing");
