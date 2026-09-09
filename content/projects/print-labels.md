+++
title = "Print Labels"
date = 2026-09-09T00:00:00+02:00
draft = false
ShowToc = false
hideMeta = true
ShowShareButtons = false
+++

**`ltn-print-labels`** is a standalone vanilla-JavaScript module (ESM, **zero
runtime dependencies**) that turns a class roster into a **printable label
grid** of student names — the kind you cut out and stick on trays, cubbies and
notebooks. It handles the fiddly parts a teacher actually hits: two children
called *Léa* become `Léa M.` / `Léa C.` (shortest last-name prefix that
separates the group), the class is repeated a whole number of times to fill an
A4 page, labels are butted together so the 1&nbsp;px borders double as cut
lines, and every label gets its **own** font size — the nominal size for names
that fit, shrunk only for the ones that would overflow, so no column is ever
widened and no name is ever hyphenated.

I built it for [Le Tableau Noir](https://letableaunoir.fr) — where it powers the
*Étiquettes* export — and released it as a reusable package.

## Get the code

{{< rawhtml >}}
<div class="project-links">
  <a class="btn btn-primary btn-rounded" href="https://github.com/rondeaujf/ltn-print-labels" target="_blank" rel="noopener noreferrer">GitHub repository</a>
  <a class="btn btn-primary btn-rounded" href="https://www.npmjs.com/package/ltn-print-labels" target="_blank" rel="noopener noreferrer">npm package</a>
</div>
{{< /rawhtml >}}

```bash
npm install ltn-print-labels
```

```js
import { computeLabelLayout, createLabelPreview } from "ltn-print-labels";
import "ltn-print-labels/style.css"; // preview decoration only

const roster = [
  { firstname: "Ada", lastname: "Lovelace", level: "Grade 5" },
  { firstname: "Alan", lastname: "Turing", level: "Grade 5" },
];

// A ready-to-render model: cell grid + mm geometry, the same object the
// consumer POSTs to its PDF backend.
const layout = computeLabelLayout(roster, {
  orient: "P", // "P" | "L"
  cols: 4, // labels per row (1–7 portrait, 1–9 landscape)
  fields: "first", // "first" | "last" | "both"
  showLevel: true,
  // fontMm omitted → auto: the largest size at which ~85 % of the labels fit
});

// Live WYSIWYG A4 preview, scaled to its container, no CSS transform.
const preview = createLabelPreview("#preview", roster, { orient: "P", cols: 4 });
preview.update(roster, { orient: "L", cols: 6 });
```

The module does **not** parse CSV — it takes plain `{ firstname, lastname,
level? }` objects, however you assembled them. `computeLabelLayout` also returns
`fontMmAuto` / `fontMmMin` / `fontMmMax` so a UI can drive the max-font slider,
and `autoNominalFontMm(texts, labelWmm, ceilingMm)` is exported on its own.

## Live demo

This demo loads `ltn-print-labels@0.1.15` — the current npm release — straight
from the jsDelivr CDN; the PDF export pulls
[jsPDF](https://github.com/parallax/jsPDF) the same way, only when you click.
Nothing is sent anywhere: the roster, the layout maths and the PDF are all
built in your browser. On the left, the input — the built-in **Solvay 1927**
roster (the 29 people in the 1927
[Solvay Conference](https://en.wikipedia.org/wiki/Fifth_Solvay_Conference)
photograph, with *Solvay 1927* as the level) or your own CSV — plus every
layout option; on the right, the **live A4 sheet** the module renders, exactly
as it would print.

{{< rawhtml >}}
<div class="lpl-demo">
  <button type="button" id="lpl-launch" class="btn btn-primary btn-rounded">Launch the interactive demo</button>
  <p id="lpl-status" class="lpl-demo-status" role="status"></p>

  <div id="lpl-breakout" class="lpl-demo-breakout" hidden>
    <div class="lpl-demo-grid">
      <div class="lpl-demo-config">
        <div class="lpl-demo-sources">
          <h4>Input</h4>
          <button type="button" id="lpl-sample" class="btn btn-rounded">Load sample: Solvay 1927</button>
          <label class="lpl-demo-file">
            <span>Roster CSV &mdash; <code>firstName,lastName,level</code> (headers are case/accent tolerant; <code>;</code> also accepted)</span>
            <input type="file" id="lpl-csv" accept=".csv,text/csv">
          </label>
          <p class="lpl-demo-note">
            Sample file:
            <a href="/projects/print-labels/students-solvay-1927.csv" download>Solvay&nbsp;1927</a>.
          </p>
        </div>

        <div class="lpl-demo-options">
          <h4>Layout</h4>
          <div class="lpl-demo-seg" role="group" aria-label="Orientation">
            <label><input type="radio" name="lpl-orient" value="P" checked> Portrait</label>
            <label><input type="radio" name="lpl-orient" value="L"> Landscape</label>
          </div>
          <div class="lpl-demo-seg" role="group" aria-label="Label content">
            <label><input type="radio" name="lpl-fields" value="first" checked> First name</label>
            <label><input type="radio" name="lpl-fields" value="last"> Last name</label>
            <label><input type="radio" name="lpl-fields" value="both"> Both</label>
          </div>
          <label class="lpl-demo-checkbox"><input type="checkbox" id="lpl-level"> Show level</label>
          <label class="lpl-demo-row"><span>Labels per row</span><input type="range" id="lpl-cols" step="1"><span id="lpl-cols-val" class="lpl-demo-row-val"></span></label>
          <label class="lpl-demo-row"><span>Max font size</span><input type="range" id="lpl-font" step="0.1"><span id="lpl-font-val" class="lpl-demo-row-val"></span></label>
        </div>

        <button type="button" id="lpl-params-toggle" class="btn btn-rounded lpl-demo-params-toggle" aria-expanded="false">Show data (JSON)</button>
        <div id="lpl-params-body" class="lpl-demo-params-body" hidden>
          <div class="lpl-demo-field">
            <label for="lpl-students">students</label>
            <div class="json-editor" style="--lpl-editor-h: 320px">
              <pre class="json-editor__hl" aria-hidden="true"><code id="lpl-hl-students"></code></pre>
              <textarea id="lpl-students" spellcheck="false" autocapitalize="off" autocomplete="off" wrap="off"></textarea>
            </div>
          </div>
          <div class="lpl-demo-actions">
            <button type="button" id="lpl-apply" class="btn btn-primary btn-rounded">Apply</button>
            <button type="button" id="lpl-reset" class="btn btn-rounded">Reset</button>
          </div>
        </div>
      </div>

      <div class="lpl-demo-stage">
        <div class="lpl-demo-stage-head">
          <button type="button" id="lpl-export" class="btn btn-rounded">Export PDF</button>
          <span id="lpl-export-status" class="lpl-demo-note" role="status"></span>
        </div>
        <div id="lpl-preview" class="lpl-preview-host">
          <p class="lpl-hint">Load a roster to see the label sheet here.</p>
        </div>
      </div>
    </div>
  </div>
</div>

<script type="module">
  const MODULE_URL = "https://cdn.jsdelivr.net/npm/ltn-print-labels@0.1.15/+esm";
  const JSPDF_URL = "https://cdn.jsdelivr.net/npm/jspdf@3.0.1/+esm";

  const $ = (id) => document.getElementById(id);
  const launch = $("lpl-launch");
  const breakout = $("lpl-breakout");
  const statusEl = $("lpl-status");
  const sampleBtn = $("lpl-sample");
  const previewHost = $("lpl-preview");
  const exportBtn = $("lpl-export");
  const exportStatus = $("lpl-export-status");
  const ta = $("lpl-students");
  const hlCode = $("lpl-hl-students");
  const colsInput = $("lpl-cols");
  const colsVal = $("lpl-cols-val");
  const fontInput = $("lpl-font");
  const fontVal = $("lpl-font-val");
  const levelInput = $("lpl-level");

  // The 29 people in the 1927 Solvay Conference photograph.
  const SOLVAY_1927 = [
    ["Auguste", "Piccard"], ["Émile", "Henriot"], ["Paul", "Ehrenfest"],
    ["Édouard", "Herzen"], ["Théophile", "de Donder"], ["Erwin", "Schrödinger"],
    ["Jules-Émile", "Verschaffelt"], ["Wolfgang", "Pauli"], ["Werner", "Heisenberg"],
    ["Ralph", "Fowler"], ["Léon", "Brillouin"], ["Peter", "Debye"],
    ["Martin", "Knudsen"], ["William Lawrence", "Bragg"], ["Hendrik Anthony", "Kramers"],
    ["Paul", "Dirac"], ["Arthur", "Compton"], ["Louis", "de Broglie"],
    ["Max", "Born"], ["Niels", "Bohr"], ["Irving", "Langmuir"], ["Max", "Planck"],
    ["Marie", "Curie"], ["Hendrik", "Lorentz"], ["Albert", "Einstein"],
    ["Paul", "Langevin"], ["Charles-Eugène", "Guye"],
    ["Charles Thomson Rees", "Wilson"], ["Owen Willans", "Richardson"],
  ].map(([firstname, lastname]) => ({ firstname, lastname, level: "Solvay 1927" }));

  let mod = null;
  let previewApi = null;
  let students = [];
  const options = { orient: "P", cols: 4, fields: "first", showLevel: false, fontMm: null };

  // --- JSON syntax highlighting under the textarea -----------------------
  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]),
    );
  function highlightJson(src) {
    return escapeHtml(src).replace(
      /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false)\b|\b(null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|([{}[\],:])/g,
      (m, str, colon, boolTok, nullTok, num, punc) => {
        if (str !== undefined)
          return colon !== undefined
            ? `<span class="json-tok-key">${str}</span>${colon}`
            : `<span class="json-tok-str">${str}</span>`;
        if (boolTok !== undefined) return `<span class="json-tok-bool">${boolTok}</span>`;
        if (nullTok !== undefined) return `<span class="json-tok-null">${nullTok}</span>`;
        if (num !== undefined) return `<span class="json-tok-num">${num}</span>`;
        if (punc !== undefined) return `<span class="json-tok-punc">${punc}</span>`;
        return m;
      },
    );
  }
  const renderHl = () => {
    hlCode.innerHTML = highlightJson(ta.value);
    hlCode.parentElement.scrollTop = ta.scrollTop;
    hlCode.parentElement.scrollLeft = ta.scrollLeft;
  };
  ta.addEventListener("input", renderHl);
  ta.addEventListener("scroll", renderHl);
  ta.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    e.preventDefault();
    const a = ta.selectionStart, b = ta.selectionEnd;
    ta.value = ta.value.slice(0, a) + "  " + ta.value.slice(b);
    ta.selectionStart = ta.selectionEnd = a + 2;
    renderHl();
  });

  const syncJson = () => { ta.value = JSON.stringify(students, null, 2); renderHl(); };

  // --- Dependency-free CSV parsing (the module never parses CSV) --------
  function parseCsvObjects(text) {
    let csv = String(text);
    const head = csv.split(/\r?\n/, 1)[0] || "";
    if (head.includes(";") && !head.includes(",")) csv = csv.replace(/;/g, ",");
    const rows = [];
    let row = [], field = "", q = false;
    for (let i = 0; i < csv.length; i++) {
      const ch = csv[i];
      if (q) {
        if (ch === '"') { if (csv[i + 1] === '"') { field += '"'; i++; } else q = false; }
        else field += ch;
        continue;
      }
      if (ch === '"') q = true;
      else if (ch === ",") { row.push(field); field = ""; }
      else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && csv[i + 1] === "\n") i++;
        row.push(field); rows.push(row); row = []; field = "";
      } else field += ch;
    }
    if (field.length || row.length) { row.push(field); rows.push(row); }
    const clean = rows.filter((r) => !(r.length === 1 && r[0] === ""));
    if (!clean.length) return [];
    const [header, ...data] = clean;
    return data.map((r) => {
      const o = {};
      header.forEach((k, i) => { o[k.trim()] = (r[i] ?? "").trim(); });
      return o;
    });
  }
  const norm = (s) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
  const FIRST = new Set(["firstname", "first", "prenom", "givenname"]);
  const LAST = new Set(["lastname", "last", "nom", "surname", "familyname"]);
  const LEVEL = new Set(["level", "niveau", "grade"]);
  const pick = (row, keys) => {
    for (const k of Object.keys(row)) if (keys.has(norm(k))) return row[k];
    return "";
  };
  const studentsFromCsv = (text) =>
    parseCsvObjects(text)
      .map((r) => ({
        firstname: String(pick(r, FIRST)).trim(),
        lastname: String(pick(r, LAST)).trim(),
        level: String(pick(r, LEVEL)).trim(),
      }))
      .filter((s) => s.firstname || s.lastname);

  // --- Collapsible JSON panel ------------------------------------------
  const paramsToggle = $("lpl-params-toggle");
  const paramsBody = $("lpl-params-body");
  paramsToggle.addEventListener("click", () => {
    paramsBody.hidden = !paramsBody.hidden;
    paramsToggle.setAttribute("aria-expanded", String(!paramsBody.hidden));
    paramsToggle.textContent = paramsBody.hidden ? "Show data (JSON)" : "Hide data (JSON)";
  });

  function setStatus(text, isError) {
    statusEl.textContent = text;
    statusEl.className = "lpl-demo-status" + (isError ? " lpl-demo-error" : "");
  }

  const round1 = (n) => Math.round(n * 10) / 10;
  const moduleOptions = () => ({
    orient: options.orient,
    cols: options.cols,
    fields: options.fields,
    showLevel: options.showLevel,
    fontMm: options.fontMm ?? undefined,
  });

  function syncSliders() {
    const [minC, maxC] = mod.LABEL_COLS_BOUNDS[options.orient];
    colsInput.min = String(minC);
    colsInput.max = String(maxC);
    options.cols = Math.min(maxC, Math.max(minC, options.cols));
    colsInput.value = String(options.cols);
    colsVal.textContent = String(options.cols);
    if (students.length) {
      const probe = mod.computeLabelLayout(students, { ...moduleOptions(), fontMm: undefined });
      fontInput.min = String(probe.fontMmMin);
      fontInput.max = String(probe.fontMmMax);
      if (options.fontMm == null) fontInput.value = String(probe.fontMmAuto);
    }
    fontVal.textContent = options.fontMm == null ? "auto" : `${round1(options.fontMm)} mm`;
  }

  function render() {
    if (!mod) return;
    document.querySelector(`input[name="lpl-orient"][value="${options.orient}"]`).checked = true;
    document.querySelector(`input[name="lpl-fields"][value="${options.fields}"]`).checked = true;
    levelInput.checked = options.showLevel;
    syncSliders();

    const empty = !students.length;
    exportBtn.disabled = empty;
    if (empty) {
      previewApi?.destroy?.();
      previewApi = null;
      previewHost.innerHTML = '<p class="lpl-hint">Load a roster to see the label sheet here.</p>';
      return;
    }
    const opts = {
      ...moduleOptions(),
      maxPreviewWidth: Math.max(320, previewHost.clientWidth - 8),
      maxPreviewHeight: Math.max(320, Math.round(window.innerHeight * 0.75)),
    };
    if (previewApi) previewApi.update(students, opts);
    else previewApi = mod.createLabelPreview(previewHost, students, opts);
  }

  const onGeometryChange = () => { options.fontMm = null; render(); };
  document.querySelectorAll('input[name="lpl-orient"]').forEach((r) =>
    r.addEventListener("change", (e) => { options.orient = e.target.value === "L" ? "L" : "P"; onGeometryChange(); }),
  );
  document.querySelectorAll('input[name="lpl-fields"]').forEach((r) =>
    r.addEventListener("change", (e) => { options.fields = e.target.value; onGeometryChange(); }),
  );
  levelInput.addEventListener("change", () => { options.showLevel = levelInput.checked; render(); });
  colsInput.addEventListener("input", () => { options.cols = Number(colsInput.value) || 1; onGeometryChange(); });
  fontInput.addEventListener("input", () => { options.fontMm = Number(fontInput.value) || null; render(); });

  $("lpl-apply").addEventListener("click", () => {
    let parsed;
    try { parsed = JSON.parse(ta.value); }
    catch (err) { setStatus("Invalid JSON: " + err.message, true); return; }
    setStatus("", false);
    students = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.students) ? parsed.students : [];
    render();
  });
  $("lpl-reset").addEventListener("click", () => { loadSample(); });

  $("lpl-csv").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    const parsed = studentsFromCsv(await file.text());
    if (!parsed.length) { setStatus("That CSV had no readable rows.", true); return; }
    setStatus("", false);
    students = parsed;
    syncJson();
    render();
  });

  function loadSample() {
    students = SOLVAY_1927.map((s) => ({ ...s }));
    Object.assign(options, { orient: "P", cols: 4, fields: "first", showLevel: false, fontMm: null });
    setStatus("", false);
    syncJson();
    render();
  }

  // --- PDF export (client-side jsPDF, drawn from computeLabelLayout) -----
  const PT_PER_MM = 72 / 25.4;
  const FONT_MM_TO_PT = PT_PER_MM * 0.92;
  const MARGIN_MM = 7;

  async function exportPdf() {
    exportBtn.disabled = true;
    exportStatus.textContent = "Generating PDF…";
    try {
      const { jsPDF } = await import(JSPDF_URL);
      const layout = mod.computeLabelLayout(students, moduleOptions());
      const doc = new jsPDF({ unit: "mm", format: "a4", orientation: layout.orient === "L" ? "landscape" : "portrait" });
      doc.setFont("helvetica", "normal");
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const gridW = layout.cols * layout.labelWmm;
      const originX = Math.max(MARGIN_MM, (pageW - gridW) / 2);
      let topY = MARGIN_MM;
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text("Labels", originX, topY + 4);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(new Date().toLocaleDateString(), originX, topY + 9);
      topY += 13;

      const rowH = layout.labelHmm;
      const rowsPerPage = Math.max(1, Math.floor((pageH - topY - MARGIN_MM) / rowH));
      layout.rows.forEach((row, i) => {
        const rowOnPage = i % rowsPerPage;
        if (i > 0 && rowOnPage === 0) { doc.addPage(); topY = MARGIN_MM; }
        const y = topY + rowOnPage * rowH;
        row.cells.forEach((cell, c) => {
          const x = originX + c * layout.labelWmm;
          doc.setDrawColor(cell.empty ? 176 : 0);
          doc.setLineWidth(0.2);
          doc.rect(x, y, layout.labelWmm, rowH);
          if (cell.empty) return;
          if (layout.levelFontMm && cell.level) {
            doc.setFontSize(layout.levelFontMm * FONT_MM_TO_PT);
            doc.setTextColor(138);
            doc.text(String(cell.level), x + 1, y + layout.levelRowMm, { baseline: "bottom" });
            doc.setTextColor(0);
          }
          const bandH = layout.levelRowMm || 0;
          doc.setFontSize((cell.fontMm || layout.fontMm) * FONT_MM_TO_PT);
          doc.setFont("helvetica", "bold");
          doc.text(String(cell.name), x + layout.labelWmm / 2, y + bandH + (rowH - bandH) / 2, {
            align: "center", baseline: "middle", maxWidth: layout.labelWmm - 1,
          });
          doc.setFont("helvetica", "normal");
        });
      });

      const url = URL.createObjectURL(doc.output("blob"));
      const a = document.createElement("a");
      a.href = url;
      a.download = "labels.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      exportStatus.textContent = "";
    } catch (err) {
      console.error(err);
      exportStatus.textContent = "Export failed.";
    } finally {
      exportBtn.disabled = !students.length;
    }
  }
  exportBtn.addEventListener("click", exportPdf);
  sampleBtn.addEventListener("click", loadSample);
  window.addEventListener("resize", () => render());
  window.addEventListener("pagehide", () => previewApi?.destroy?.());

  launch.addEventListener("click", async () => {
    launch.disabled = true;
    setStatus("Loading the module…", false);
    try {
      mod = await import(MODULE_URL);
    } catch (err) {
      console.error(err);
      setStatus("Could not load ltn-print-labels from the CDN.", true);
      launch.disabled = false;
      return;
    }
    setStatus("", false);
    breakout.hidden = false;
    launch.hidden = true;
    loadSample();
  });
</script>
{{< /rawhtml >}}
