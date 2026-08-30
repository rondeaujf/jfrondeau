+++
title = "Classroom Layout"
date = 2026-08-30T00:00:00+02:00
draft = false
ShowToc = false
hideMeta = true
ShowShareButtons = false
+++

**`ltn-classroom-layout`** is a standalone vanilla-JavaScript module (no framework, zero
runtime dependencies) that renders an interactive classroom seating chart: a desk grid,
round and oval tables, per-desk rotation and colour, drag-and-drop student assignment,
border objects (wall, board, door, window), wheel zoom, print / PDF export and JSON
import / export.

I originally built it for [Le Tableau Noir](https://letableaunoir.fr) and released it as a
reusable package so any teacher or app can embed it.

## Get the code

{{< rawhtml >}}
<div class="project-links">
  <a class="btn btn-primary btn-rounded" href="https://github.com/rondeaujf/LTN-My-Classroom-Layout" target="_blank" rel="noopener noreferrer">GitHub repository</a>
  <a class="btn btn-primary btn-rounded" href="https://www.npmjs.com/package/ltn-classroom-layout" target="_blank" rel="noopener noreferrer">npm package</a>
</div>
{{< /rawhtml >}}

```bash
npm install ltn-classroom-layout
```

```js
import { ClassroomLayout } from "ltn-classroom-layout";
import "ltn-classroom-layout/style.css";

const layout = new ClassroomLayout(document.getElementById("app"), {
  students: [{ id: "1", firstName: "Ada", lastName: "Lovelace", level: "Grade 5" }],
});
await layout.ready;
```

## Live demo

This demo loads `ltn-classroom-layout@1.3.0` — the current npm release — straight from the
jsDelivr CDN. On the left, **every option** accepted by `new ClassroomLayout(…)` shown with
its default value; on the right, the **live result**. Edit the JSON and press *Apply* to
re-render. The roster is the 29 physicists of the
[1927 Solvay Conference](https://en.wikipedia.org/wiki/Fifth_Solvay_Conference), with their
Nobel year as the desk badge.

{{< rawhtml >}}
<div class="classroom-demo">
  <button type="button" id="ltn-demo-launch" class="btn btn-primary btn-rounded">Launch the interactive demo</button>
  <p id="ltn-demo-status" class="classroom-demo-status" role="status"></p>

  <div id="ltn-demo-breakout" class="classroom-demo-breakout" hidden>
    <div class="classroom-demo-grid">
      <div class="classroom-demo-config">
        <label for="ltn-demo-config">Init options (JSON) — edit a value, then Apply</label>
        <div class="json-editor">
          <pre class="json-editor__hl" aria-hidden="true"><code id="ltn-demo-hl"></code></pre>
          <textarea id="ltn-demo-config" spellcheck="false" autocapitalize="off" autocomplete="off" wrap="off"></textarea>
        </div>
        <div class="classroom-demo-actions">
          <button type="button" id="ltn-demo-apply" class="btn btn-primary btn-rounded">Apply</button>
          <button type="button" id="ltn-demo-reset" class="btn btn-rounded">Reset</button>
        </div>
        <p class="classroom-demo-note">
          A <code>persistence</code> adapter (localStorage, key
          <code>jfr-projects-classroom-demo</code>) and the <code>onChange</code> /
          <code>onPrint</code> callbacks are added in code on top of the options above.
          <em>Apply</em> and <em>Reset</em> clear the saved state so the view reflects the init options.
        </p>
      </div>
      <div class="classroom-demo-stage">
        <div id="ltn-demo-app"></div>
      </div>
    </div>
  </div>
</div>

<style>
  .project-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin: 1rem 0 1.5rem;
  }
  .classroom-demo {
    margin: 1.5rem 0;
  }
  .classroom-demo-status {
    margin: 0.75rem 0 0;
    min-height: 1.2em;
    font-size: 0.9rem;
    color: var(--secondary);
  }
  .classroom-demo-status.classroom-demo-error {
    color: #d64545;
    white-space: pre-wrap;
  }

  /* The demo escapes the text column: width = 200% of the column
     (column + 50% on each side), capped to the viewport. */
  .classroom-demo-breakout {
    --demo-w: min(200%, calc(100vw - 2rem));
    width: var(--demo-w);
    margin-left: calc((100% - var(--demo-w)) / 2);
  }

  .classroom-demo-grid {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: 1.25rem;
    align-items: start;
    margin-top: 1rem;
  }

  .classroom-demo-config {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    min-width: 0;
  }
  /* Le style de #ltn-demo-config (éditeur JSON) et du <label> vit dans
     assets/css/extended/custom.css, avec le reste du CSS des blocs de code. */
  .classroom-demo-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .classroom-demo-actions .btn {
    padding: 0.35rem 1rem;
    font-size: 0.9rem;
  }
  .classroom-demo-note {
    margin: 0;
    font-size: 0.8rem;
    line-height: 1.45;
    color: var(--secondary);
  }

  .classroom-demo-stage {
    min-height: 460px;
    padding: 1rem;
    background: var(--entry);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: auto;
  }

  @media (max-width: 960px) {
    .classroom-demo-breakout {
      --demo-w: 100%;
      margin-left: 0;
    }
    .classroom-demo-grid {
      grid-template-columns: 1fr;
    }
    .json-editor {
      height: 320px;
    }
  }
</style>

<script type="module">
  const VERSION = "1.3.0";
  const MODULE_URL = `https://cdn.jsdelivr.net/npm/ltn-classroom-layout@${VERSION}/+esm`;
  const STYLE_URL = `https://cdn.jsdelivr.net/npm/ltn-classroom-layout@${VERSION}/src/style.css`;
  const STORAGE_KEY = "jfr-projects-classroom-demo";

  // 1927 Solvay Conference attendees — [lastName, firstName, Nobel year(s)].
  const solvay1927 = [
    ["Piccard", "Auguste", ""],
    ["Verschaffelt", "Jules-Émile", ""],
    ["Henriot", "Émile", ""],
    ["Ehrenfest", "Paul", ""],
    ["Herzen", "Édouard", ""],
    ["De Donder", "Théophile", ""],
    ["Schrödinger", "Erwin", "1933"],
    ["Pauli", "Wolfgang", "1945"],
    ["Heisenberg", "Werner", "1932"],
    ["Fowler", "Ralph", ""],
    ["Brillouin", "Léon", ""],
    ["Debye", "Peter", "1936"],
    ["Knudsen", "Martin", ""],
    ["Bragg", "William Lawrence", "1915"],
    ["Kramers", "Hendrik Anthony", ""],
    ["Dirac", "Paul", "1933"],
    ["Compton", "Arthur", "1927"],
    ["de Broglie", "Louis", "1929"],
    ["Born", "Max", "1954"],
    ["Bohr", "Niels", "1922"],
    ["Langmuir", "Irving", "1932"],
    ["Planck", "Max", "1918"],
    ["Curie", "Marie", "1903 / 1911"],
    ["Lorentz", "Hendrik", "1902"],
    ["Einstein", "Albert", "1921"],
    ["Langevin", "Paul", ""],
    ["Guye", "Charles-Eugène", ""],
    ["Wilson", "Charles Thomson Rees", "1927"],
    ["Richardson", "Owen Willans", "1928"],
  ];

  // Every JSON-serialisable option accepted by `new ClassroomLayout(el, …)`,
  // shown with its default value — parameters first, then the data (teacher,
  // colours, the 29-physicist roster). The `persistence` adapter and the
  // callbacks (`onChange`, `onPrint`) are wired in code, they can't be JSON.
  const DEFAULT_CONFIG = {
    gridDefault: { cols: 6, rows: 5 },
    showLevel: true,
    nameDisplay: "full",
    nameFit: { max: 12, min: 5 },
    levelFit: { max: 8, min: 5 },
    editableBorders: true,
    toolbar: { subtitle: true, settings: true, print: true },
    printOrientation: "landscape",
    printPaper: "A4",
    pdfChrome: true,
    logoUrl: "",
    teacher: {
      firstName: "Ernest",
      lastName: "Solvay",
      className: "Solvay Conference 1927",
      school: "jfrondeau.fr",
      year: "1927",
    },
    colors: [
      { label: "Physics", value: "#2f6f9e" },
      { label: "Chemistry", value: "#e07a5f" },
      { label: "Mathematics", value: "#81b29a" },
      { label: "Laureate", value: "#f2cc8f" },
    ],
    students: solvay1927.map((p, i) => ({
      id: String(i + 1),
      firstName: p[1],
      lastName: p[0],
      level: p[2],
    })),
  };
  const DEFAULT_JSON = JSON.stringify(DEFAULT_CONFIG, null, 2);

  const launch = document.getElementById("ltn-demo-launch");
  const breakout = document.getElementById("ltn-demo-breakout");
  const configEl = document.getElementById("ltn-demo-config");
  const hlCode = document.getElementById("ltn-demo-hl");
  const applyBtn = document.getElementById("ltn-demo-apply");
  const resetBtn = document.getElementById("ltn-demo-reset");
  const statusEl = document.getElementById("ltn-demo-status");
  const app = document.getElementById("ltn-demo-app");

  // --- Minimal JSON syntax highlighting under the textarea -----------------
  const escapeHtml = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  function highlightJson(src) {
    return escapeHtml(src).replace(
      /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false)\b|\b(null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|([{}[\],:])/g,
      (m, str, colon, boolTok, nullTok, num, punc) => {
        if (str !== undefined) {
          return colon !== undefined
            ? `<span class="json-tok-key">${str}</span>${colon}`
            : `<span class="json-tok-str">${str}</span>`;
        }
        if (boolTok !== undefined) return `<span class="json-tok-bool">${boolTok}</span>`;
        if (nullTok !== undefined) return `<span class="json-tok-null">${nullTok}</span>`;
        if (num !== undefined) return `<span class="json-tok-num">${num}</span>`;
        if (punc !== undefined) return `<span class="json-tok-punc">${punc}</span>`;
        return m;
      },
    );
  }

  function syncScroll() {
    hlCode.parentElement.scrollTop = configEl.scrollTop;
    hlCode.parentElement.scrollLeft = configEl.scrollLeft;
  }

  function renderHighlight() {
    hlCode.innerHTML = highlightJson(configEl.value);
    syncScroll();
  }

  function setConfigText(text) {
    configEl.value = text;
    renderHighlight();
  }

  configEl.addEventListener("input", renderHighlight);
  configEl.addEventListener("scroll", syncScroll);
  configEl.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    e.preventDefault();
    const a = configEl.selectionStart;
    const b = configEl.selectionEnd;
    configEl.value = configEl.value.slice(0, a) + "  " + configEl.value.slice(b);
    configEl.selectionStart = configEl.selectionEnd = a + 2;
    renderHighlight();
  });

  setConfigText(DEFAULT_JSON);

  const persistence = {
    load: () => {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      } catch (e) {
        return null;
      }
    },
    save: (state) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        /* storage unavailable — demo still works in-memory */
      }
    },
  };
  const clearSaved = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      /* ignore */
    }
  };

  let ClassroomLayout = null;
  let layout = null;

  async function ensureModule() {
    if (ClassroomLayout) return;
    if (!document.querySelector("link[data-ltn-classroom]")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = STYLE_URL;
      link.dataset.ltnClassroom = "true";
      document.head.appendChild(link);
    }
    ({ ClassroomLayout } = await import(MODULE_URL));
  }

  async function mount(cfg) {
    await ensureModule();
    if (layout) {
      try {
        layout.destroy();
      } catch (e) {
        /* ignore */
      }
      layout = null;
    }
    app.innerHTML = "";
    layout = new ClassroomLayout(app, { ...cfg, persistence });
    await layout.ready;
  }

  function setStatus(text, isError) {
    statusEl.textContent = text;
    statusEl.className = "classroom-demo-status" + (isError ? " classroom-demo-error" : "");
  }

  launch.addEventListener("click", async () => {
    launch.disabled = true;
    setStatus("Loading the module…", false);
    try {
      let cfg;
      try {
        cfg = JSON.parse(configEl.value);
      } catch (e) {
        cfg = DEFAULT_CONFIG;
        setConfigText(DEFAULT_JSON);
      }
      await mount(cfg);
      breakout.hidden = false;
      launch.hidden = true;
      setStatus("", false);
    } catch (err) {
      console.error(err);
      setStatus(
        "The demo could not be loaded (the CDN may be unreachable). The package still works via npm — see the links above.",
        true,
      );
      launch.disabled = false;
    }
  });

  applyBtn.addEventListener("click", async () => {
    let cfg;
    try {
      cfg = JSON.parse(configEl.value);
    } catch (err) {
      setStatus("Invalid JSON: " + err.message, true);
      return;
    }
    setStatus("Rendering…", false);
    clearSaved();
    try {
      await mount(cfg);
      setStatus("", false);
    } catch (err) {
      console.error(err);
      setStatus("Render failed: " + err.message, true);
    }
  });

  resetBtn.addEventListener("click", async () => {
    setConfigText(DEFAULT_JSON);
    setStatus("Rendering…", false);
    clearSaved();
    try {
      await mount(DEFAULT_CONFIG);
      setStatus("", false);
    } catch (err) {
      console.error(err);
      setStatus("Render failed: " + err.message, true);
    }
  });
</script>
{{< /rawhtml >}}
