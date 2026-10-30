// ISO 3166-1 alpha-2 references backed by local SVGs from the flag-icons MIT set.
const countryCodes = Object.freeze(
  "AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW"
    .split(" "),
);
const countryNameCache = new Map();

// Browser-session examples only. No account, profile, or organization is saved.
const countryReferences = {
  alex: "BR", lucas: "BR", bruna: "BR", rafael: "PT", marina: "BR",
  agency: "BR", club: "BR",
};
const demoPlayers = {
  alex: ["Alex Silva", "AS", "Ponta-direita (Extremo)"],
  lucas: ["Lucas Moreira", "LM", "Meia-central"],
  bruna: ["Bruna Nunes", "BN", "Lateral-esquerdo"],
  rafael: ["Rafael Costa", "RC", "Goleiro"],
  marina: ["Marina Dias", "MD", "Centroavante"],
};
let countryAthlete = "lucas";
let countryOrganization = "agency";

function countryOwner(reference) {
  if (reference === "selected-athlete") return countryAthlete;
  if (reference === "organization") return countryOrganization;
  return reference;
}

function countryName(code, language = document.documentElement.lang) {
  const cacheKey = `${language}:${code}`;
  if (!countryNameCache.has(cacheKey)) {
    const displayNames = new Intl.DisplayNames([language], { type: "region" });
    countryNameCache.set(cacheKey, displayNames.of(code) || code);
  }
  return countryNameCache.get(cacheKey);
}

function createCountryFlag(code) {
  const flag = document.createElement("img");
  flag.className = "country-flag";
  flag.alt = "";
  flag.setAttribute("aria-hidden", "true");
  flag.src = `flags/${code.toLowerCase()}.svg`;
  flag.addEventListener("error", () => {
    const fallback = document.createElement("span");
    fallback.className = "country-flag country-flag-fallback";
    fallback.textContent = code;
    fallback.setAttribute("aria-hidden", "true");
    flag.replaceWith(fallback);
  }, { once: true });
  return flag;
}

function countryReference(reference) {
  const span = document.createElement("span");
  span.className = "country-reference";
  span.dataset.countryReference = reference;
  return span;
}

function countryField(reference, labelText, optional = false) {
  const id = `country-${reference}`;
  const field = document.createElement("div");
  field.id = id;
  field.className = "country-field";
  const label = document.createElement("label");
  label.htmlFor = `${id}-trigger`;
  label.id = `${id}-label`;
  label.append(document.createTextNode(labelText));
  if (optional) {
    const note = document.createElement("span");
    note.className = "optional";
    note.textContent = "(opcional)";
    label.append(" ", note);
  }

  const picker = document.createElement("div");
  picker.className = "country-picker";
  const trigger = document.createElement("button");
  trigger.id = `${id}-trigger`;
  trigger.type = "button";
  trigger.className = "country-trigger";
  trigger.dataset.countrySelect = reference;
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-labelledby", `${id}-label ${id}-value`);
  trigger.setAttribute("aria-controls", `${id}-options`);
  const value = document.createElement("span");
  value.className = "country-trigger-value";
  value.id = `${id}-value`;
  const arrow = document.createElement("span");
  arrow.className = "country-trigger-arrow";
  arrow.textContent = "▾";
  arrow.setAttribute("aria-hidden", "true");
  trigger.append(value, arrow);

  const popover = document.createElement("div");
  popover.className = "country-popover";
  popover.hidden = true;
  const search = document.createElement("input");
  search.type = "search";
  search.className = "country-search";
  search.dataset.countrySearch = "";
  search.placeholder = "Pesquisar país";
  search.setAttribute("aria-label", "Pesquisar país pelo nome em português ou inglês");
  search.autocomplete = "off";
  const options = document.createElement("div");
  options.className = "country-options";
  options.id = `${id}-options`;
  options.setAttribute("role", "listbox");
  options.setAttribute("aria-label", "Opções de país");
  popover.append(search, options);
  picker.append(trigger, popover);
  field.append(label, picker);
  return field;
}

function renderCountries() {
  const language = document.documentElement.lang;
  document.querySelectorAll("[data-country-reference]").forEach((element) => {
    const code = countryReferences[countryOwner(element.dataset.countryReference)];
    element.dataset.countryCode = code || "";
    if (!countryCodes.includes(code)) {
      element.textContent = wireframeI18n.t("Não informado");
      return;
    }
    const name = document.createElement("span");
    name.textContent = `${countryName(code, language)} · ${code}`;
    const flag = createCountryFlag(code);
    if (element.classList.contains("card-country")) flag.classList.add("card-flag");
    element.replaceChildren(flag, name);
  });
  document.querySelectorAll("[data-country-select]").forEach((trigger) => {
    const code = countryReferences[countryOwner(trigger.dataset.countrySelect)];
    const value = trigger.querySelector(".country-trigger-value");
    const arrow = trigger.querySelector(".country-trigger-arrow");
    if (!countryCodes.includes(code)) {
      value.textContent = wireframeI18n.t("Não informado");
      trigger.setAttribute("aria-label", wireframeI18n.t("Não informado"));
      trigger.removeAttribute("title");
      trigger.querySelector(".country-flag")?.remove();
      return;
    }
    const flag = createCountryFlag(code);
    trigger.replaceChildren(flag, value, arrow);
    value.textContent = countryName(code, language);
    trigger.title = value.textContent;
    trigger.setAttribute("aria-label", `${countryName(code, language)} · ${code}`);
  });
}

function normalizeCountryName(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
}

function renderCountryOptions(picker) {
  const trigger = picker.querySelector("[data-country-select]");
  const selectedCode = countryReferences[countryOwner(trigger.dataset.countrySelect)];
  const list = picker.querySelector(".country-options");
  const language = document.documentElement.lang;
  const search = normalizeCountryName(picker.querySelector("[data-country-search]").value.trim());
  const entries = countryCodes.map((code) => ({
    code,
    name: countryName(code, language),
    searchNames: ["pt-BR", "en", "es"].map((locale) => countryName(code, locale)),
  })).sort((left, right) => new Intl.Collator(language, { sensitivity: "base" }).compare(left.name, right.name));
  const matches = entries.filter(({ code, name, searchNames }) =>
    !search || normalizeCountryName(`${name} ${code} ${searchNames.join(" ")}`).includes(search));
  list.replaceChildren();
  const unspecified = document.createElement("button");
  unspecified.type = "button";
  unspecified.className = "country-option country-option-empty";
  unspecified.dataset.countryOption = "";
  unspecified.setAttribute("role", "option");
  unspecified.setAttribute("aria-selected", String(!selectedCode));
  const unspecifiedFlag = document.createElement("span");
  unspecifiedFlag.className = "country-flag-placeholder";
  unspecifiedFlag.setAttribute("aria-hidden", "true");
  unspecified.append(unspecifiedFlag, document.createTextNode(wireframeI18n.t("Não informado")));
  if (!search || normalizeCountryName(unspecified.textContent).includes(search)) list.append(unspecified);
  if (!matches.length && !list.childElementCount) {
    const empty = document.createElement("p");
    empty.className = "country-empty";
    empty.textContent = wireframeI18n.t("Nenhum país encontrado");
    list.append(empty);
    return;
  }
  matches.forEach(({ code, name }) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "country-option";
    option.dataset.countryOption = code;
    option.setAttribute("role", "option");
    option.setAttribute("aria-selected", String(code === selectedCode));
    option.append(createCountryFlag(code), document.createTextNode(name));
    list.append(option);
  });
}

function closeCountryPicker(picker, restoreFocus = false) {
  const trigger = picker.querySelector("[data-country-select]");
  picker.querySelector(".country-popover").hidden = true;
  trigger.setAttribute("aria-expanded", "false");
  if (restoreFocus) trigger.focus();
}

function openCountryPicker(trigger) {
  document.querySelectorAll(".country-picker").forEach((picker) => closeCountryPicker(picker));
  const picker = trigger.closest(".country-picker");
  const search = picker.querySelector("[data-country-search]");
  picker.querySelector(".country-popover").hidden = false;
  trigger.setAttribute("aria-expanded", "true");
  search.value = "";
  renderCountryOptions(picker);
  search.focus();
}

function renderSelectedAthlete() {
  const [name, initials, position] = demoPlayers[countryAthlete];
  const root = document.querySelector("#screen-athlete");
  root.querySelector("h1").textContent = name;
  root.querySelector(".identity-card h2").textContent = name;
  root.querySelector(".portrait").textContent = initials;
  root.querySelector("[data-athlete-position]").textContent = wireframeI18n.t(position);
}

function setReportAthlete(reference) {
  if (!demoPlayers[reference]) return;
  document.querySelector("#report-athlete").value = reference;
  document.querySelectorAll("[data-report-country]").forEach((element) => {
    element.dataset.countryReference = reference;
  });
  document.querySelector("[data-report-subject]").textContent = demoPlayers[reference][0];
  renderCountries();
}

function initializeCountries() {
  const fieldScreens = {
    "player-signup": "alex", "agency-signup": "agency", "club-signup": "club",
    "athlete-edit": "selected-athlete", settings: "organization",
  };
  Object.entries(fieldScreens).forEach(([screen, owner]) => {
    const root = document.querySelector(`#screen-${screen}`);
    [...root.querySelectorAll("label")].forEach((label) => {
      const source = label.textContent.trim();
      if (!/^(País|Nacionalidade)/.test(source)) return;
      const isNationality = screen === "player-signup" || screen === "athlete-edit";
      const optional = isNationality;
      const field = countryField(
        owner,
        isNationality ? "Nacionalidade" : "País da organização",
        optional,
      );
      label.classList.forEach((className) => field.classList.add(className));
      label.replaceWith(field);
    });
  });
  const labels = ["lucas", "bruna", "rafael", "marina"];
  document.querySelectorAll("#roster-table tbody tr").forEach((row, index) => {
    row.dataset.athlete = labels[index];
    row.querySelector('[data-label="Nacionalidade"]').replaceChildren(countryReference(labels[index]));
  });
  ["player-dashboard", "player-profile", "athlete"].forEach((screen) => {
    const root = document.querySelector(`#screen-${screen}`);
    const reference = screen === "athlete" ? "selected-athlete" : "alex";
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const replacements = [];
    while (walker.nextNode()) {
      if (walker.currentNode.textContent.trim() === "Brasileiro") replacements.push(walker.currentNode);
    }
    replacements.forEach((node) => node.replaceWith(countryReference(reference)));
    const details = root.querySelector(".detail-list");
    if (details && screen === "athlete") {
      const row = document.createElement("div");
      const label = document.createElement("span");
      label.textContent = "Nacionalidade";
      row.append(label, countryReference(reference));
      details.prepend(row);
      const paragraph = root.querySelector(".page-heading p");
      const position = document.createElement("span");
      position.dataset.athletePosition = "";
      position.textContent = demoPlayers[countryAthlete][2];
      paragraph.firstChild.replaceWith(position, document.createTextNode(" "));
    }
  });
  document.querySelectorAll("#screen-org-dashboard .list-row").forEach((row, index) => {
    row.querySelector("small").after(countryReference(labels[index]));
    row.dataset.athlete = labels[index];
  });
  document.querySelector("#org-greeting").after(countryReference("organization"));

  const reportSelect = document.querySelector("#screen-report select");
  reportSelect.id = "report-athlete";
  reportSelect.replaceChildren(...Object.entries(demoPlayers).map(([id, [name]]) =>
    new Option(`${name} (${["bruna", "marina"].includes(id) ? "fictícia" : "fictício"})`, id)));
  const reportCountry = countryReference("alex");
  reportCountry.dataset.reportCountry = "";
  reportSelect.after(reportCountry);
  reportSelect.addEventListener("change", () => setReportAthlete(reportSelect.value));

  const processingSubject = document.createElement("p");
  const subjectName = document.createElement("span");
  subjectName.dataset.reportSubject = "";
  subjectName.textContent = "Alex Silva";
  const processingCountry = countryReference("alex");
  processingCountry.dataset.reportCountry = "";
  processingSubject.append(subjectName, document.createTextNode(" · "), processingCountry);
  document.querySelector("#screen-processing h1").after(processingSubject);
  const historySubject = document.createElement("p");
  historySubject.append(document.createTextNode("Alex Silva · "), countryReference("alex"));
  document.querySelector("#screen-history .page-heading p").after(historySubject);

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-country-select]");
    if (trigger) {
      const open = trigger.getAttribute("aria-expanded") === "true";
      if (open) closeCountryPicker(trigger.closest(".country-picker"));
      else openCountryPicker(trigger);
      return;
    }
    const option = event.target.closest("[data-country-option]");
    if (option) {
      const picker = option.closest(".country-picker");
      const triggerButton = picker.querySelector("[data-country-select]");
      countryReferences[countryOwner(triggerButton.dataset.countrySelect)] = option.dataset.countryOption;
      closeCountryPicker(picker, true);
      renderCountries();
      return;
    }
    if (!event.target.closest(".country-picker")) {
      document.querySelectorAll(".country-picker").forEach((picker) => closeCountryPicker(picker));
    }
  });
  document.addEventListener("input", (event) => {
    if (event.target.matches("[data-country-search]")) renderCountryOptions(event.target.closest(".country-picker"));
  });
  document.addEventListener("keydown", (event) => {
    const picker = event.target.closest(".country-picker");
    if (!picker) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeCountryPicker(picker, true);
      return;
    }
    const options = [...picker.querySelectorAll("[data-country-option]")];
    const currentIndex = options.indexOf(event.target);
    if (event.key === "ArrowDown" && event.target.matches("[data-country-search]")) {
      event.preventDefault();
      options[0]?.focus();
    } else if (event.key === "ArrowDown" && currentIndex >= 0) {
      event.preventDefault();
      options[Math.min(currentIndex + 1, options.length - 1)]?.focus();
    } else if (event.key === "ArrowUp" && currentIndex > 0) {
      event.preventDefault();
      options[currentIndex - 1].focus();
    } else if (event.key === "ArrowUp" && currentIndex === 0) {
      event.preventDefault();
      picker.querySelector("[data-country-search]").focus();
    }
  });
}

initializeCountries();
