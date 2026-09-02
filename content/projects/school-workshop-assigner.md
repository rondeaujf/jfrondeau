+++
title = "School Workshop Assigner"
date = 2026-09-02T00:00:00+02:00
draft = false
ShowToc = false
hideMeta = true
ShowShareButtons = false
+++

**`school-workshop-assigner`** is a standalone JavaScript module (ESM, one runtime
dependency) that assigns students to elective workshops **fairly**, under real
constraints: per-workshop capacities, per-pair exclusions ("keep these two
apart"), and messy multi-class CSV input merged from one file per class. All the
solving runs **client-side** — the [HiGHS](https://highs.dev) mixed-integer
solver compiled to WebAssembly — so a teacher-facing app needs no backend.

Instead of maximizing a single weighted score (which an optimizer can game by
sacrificing a few unlucky students), it optimizes in strict priority order:
first the number of students who get their 1st choice, then 1st-or-2nd, then any
of their three, and finally it spreads the leftover "no choice available"
students evenly across classes rather than dumping them all on one.

I built it for [Le Tableau Noir](https://letableaunoir.fr) — where it powers the
*Classificateur* screen — and released it as a reusable package.

## Get the code

{{< rawhtml >}}
<div class="project-links">
  <a class="btn btn-primary btn-rounded" href="https://github.com/rondeaujf/school-workshop-assigner" target="_blank" rel="noopener noreferrer">GitHub repository</a>
  <a class="btn btn-primary btn-rounded" href="https://www.npmjs.com/package/school-workshop-assigner" target="_blank" rel="noopener noreferrer">npm package</a>
</div>
{{< /rawhtml >}}

```bash
npm install school-workshop-assigner
```

```js
import { assignStudentsToWorkshops } from "school-workshop-assigner";

const result = await assignStudentsToWorkshops({
  workshops: [
    { name: "Theater", maxCapacity: 25 },
    { name: "Robotics", maxCapacity: 20 },
  ],
  students: [
    { lastName: "Dupont", firstName: "Alice", className: "CM2-A", choice1: "Theater", choice2: "Robotics" },
    { lastName: "Martin", firstName: "Bob", className: "CM2-A", choice1: "Robotics" },
  ],
  exclusions: [
    {
      studentA: { lastName: "Dupont", firstName: "Alice", className: "CM2-A" },
      studentB: { lastName: "Martin", firstName: "Bob", className: "CM2-A" },
    },
  ],
});

console.log(result.status, result.statistics.choiceDistribution);
console.log(result.byClassroom, result.byWorkshop);
```

The module does **not** parse CSV itself — it takes plain JS objects, however you
assembled them (typically one `Papa.parse()` per uploaded class file, then
concatenated). Names and workshop choices are matched case/accent/whitespace-
insensitively; twins are disambiguated by first name. Structural problems
(no workshops, capacity below headcount, a model above `maxProblemSize`) throw a
`CoherenceError`; everything else — unknown choice, exclusion referencing an
unknown student — comes back as a non-blocking `warnings` entry.

## Live demo

This demo runs `school-workshop-assigner` **bundled and served from this site** —
the solver, the HiGHS WebAssembly glue and the `.wasm` binary are all
same-origin static files, no CDN and no build step at request time. On the
left, the input: the built-in **Solvay 1927 / France 98** roster (or your own
CSV files); on the right, the assignment the solver returns. The roster is the
29 people in the 1927 [Solvay Conference](https://en.wikipedia.org/wiki/Fifth_Solvay_Conference)
photograph plus France's 22-man 1998 football World Cup squad — two "classes",
8 workshops, reproducible seeded choices (seed 1927), and a deliberately dense
set of exclusions (every pair of people whose family name shares its first
letter), so the `NEEDS_CONFIRMATION` → confirm flow actually triggers.

> **On memory.** HiGHS is ~3.4&nbsp;MB of WebAssembly. It is **never** in the
> initial page, **never** on the main thread, and **never** kept alive between
> runs: each *Run* spins up a fresh Web Worker, solves, renders, and the
> `finally` block calls `worker.terminate()` — handing the whole WASM heap back
> to the browser. Leaving the page mid-solve kills the worker too. A
> 15-second `timeLimitSeconds` cap keeps a pathological input from freezing the
> tab; terminating the worker is the hard backstop.

{{< rawhtml >}}
<div class="swa-demo">
  <button type="button" id="swa-launch" class="btn btn-primary btn-rounded">Launch the interactive demo</button>
  <p id="swa-status" class="swa-demo-status" role="status"></p>

  <div id="swa-breakout" class="swa-demo-breakout" hidden>
    <div class="swa-demo-grid">
      <div class="swa-demo-config">
        <div class="swa-demo-sources">
          <h4>Input</h4>
          <button type="button" id="swa-sample" class="btn btn-rounded">Load sample: Solvay 1927 / France 98</button>

          <label class="swa-demo-file">
            <span>Workshops CSV &mdash; <code>name,maxCapacity</code></span>
            <input type="file" id="swa-csv-workshops" accept=".csv,text/csv">
          </label>

          <label class="swa-demo-file">
            <span>Add a class CSV &mdash; <code>lastName,firstName,className,choice1,choice2,choice3</code> (repeat, one file per class)</span>
            <input type="file" id="swa-csv-class" accept=".csv,text/csv">
          </label>
          <ul id="swa-loaded" class="swa-demo-loaded"></ul>

          <label class="swa-demo-file">
            <span>Exclusions CSV &mdash; <code>lastNameA,firstNameA,classNameA,lastNameB,firstNameB,classNameB</code></span>
            <input type="file" id="swa-csv-exclusions" accept=".csv,text/csv">
          </label>
          <p class="swa-demo-note">
            Sample files:
            <a href="/projects/school-workshop-assigner/workshops.csv" download>workshops</a> &middot;
            <a href="/projects/school-workshop-assigner/students-solvay-1927.csv" download>Solvay&nbsp;1927</a> &middot;
            <a href="/projects/school-workshop-assigner/students-france-98.csv" download>France&nbsp;98</a> &middot;
            <a href="/projects/school-workshop-assigner/exclusions.csv" download>exclusions</a>.
          </p>
        </div>

        <button type="button" id="swa-params-toggle" class="btn btn-rounded swa-demo-params-toggle" aria-expanded="false">Show data (JSON)</button>
        <div id="swa-params-body" class="swa-demo-params-body" hidden>
          <div class="swa-demo-field">
            <label for="swa-workshops">workshops</label>
            <div class="json-editor" style="--swa-editor-h: 150px">
              <pre class="json-editor__hl" aria-hidden="true"><code id="swa-hl-workshops"></code></pre>
              <textarea id="swa-workshops" spellcheck="false" autocapitalize="off" autocomplete="off" wrap="off"></textarea>
            </div>
          </div>
          <div class="swa-demo-field">
            <label for="swa-students">students</label>
            <div class="json-editor" style="--swa-editor-h: 260px">
              <pre class="json-editor__hl" aria-hidden="true"><code id="swa-hl-students"></code></pre>
              <textarea id="swa-students" spellcheck="false" autocapitalize="off" autocomplete="off" wrap="off"></textarea>
            </div>
          </div>
          <div class="swa-demo-field">
            <label for="swa-exclusions">exclusions (optional)</label>
            <div class="json-editor" style="--swa-editor-h: 150px">
              <pre class="json-editor__hl" aria-hidden="true"><code id="swa-hl-exclusions"></code></pre>
              <textarea id="swa-exclusions" spellcheck="false" autocapitalize="off" autocomplete="off" wrap="off"></textarea>
            </div>
          </div>
          <label class="swa-demo-checkbox">
            <input type="checkbox" id="swa-strict" checked> <code>strictExclusions</code> &mdash; never silently put an excluded pair together
          </label>
        </div>

        <div class="swa-demo-actions">
          <button type="button" id="swa-run" class="btn btn-primary btn-rounded">Run assignment</button>
        </div>
      </div>

      <div class="swa-demo-stage">
        <div id="swa-result" class="swa-result">
          <p class="swa-hint">Run an assignment to see the result here.</p>
        </div>
      </div>
    </div>
  </div>
</div>

<script type="module">
  // All same-origin static assets (static/projects/school-workshop-assigner/).
  // vendor/worker.js is school-workshop-assigner@0.3.1 + the HiGHS WASM glue,
  // bundled with esbuild; it loads vendor/highs.wasm sitting next to it.
  // Rebuild (from a checkout of the package, after `npm ci && npm run build`,
  // with an entry that imports assignStudentsToWorkshops from ./dist/index.js
  // and wires self.onmessage — the {id, payload:{input, options}} envelope
  // below — plus a locateFile of (p) => new URL(p, self.location.href).href):
  //   esbuild <entry> --bundle --format=iife --platform=browser --target=es2020 \
  //     --minify --external:node:* --external:fs --external:path \
  //     --external:crypto --external:url --external:module
  const WORKER_URL = "/projects/school-workshop-assigner/vendor/worker.js";
  const SAMPLE_URL = "/projects/school-workshop-assigner/sample.js";
  const TIME_LIMIT_SECONDS = 15;

  const $ = (id) => document.getElementById(id);
  const launch = $("swa-launch");
  const breakout = $("swa-breakout");
  const statusEl = $("swa-status");
  const resultEl = $("swa-result");
  const runBtn = $("swa-run");
  const sampleBtn = $("swa-sample");
  const strictEl = $("swa-strict");
  const loadedList = $("swa-loaded");

  const fields = {
    workshops: { ta: $("swa-workshops"), hl: $("swa-hl-workshops") },
    students: { ta: $("swa-students"), hl: $("swa-hl-students") },
    exclusions: { ta: $("swa-exclusions"), hl: $("swa-hl-exclusions") },
  };

  // --- JSON syntax highlighting under each textarea -----------------------
  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]),
    );

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

  function wireEditor(f) {
    const sync = () => {
      f.hl.parentElement.scrollTop = f.ta.scrollTop;
      f.hl.parentElement.scrollLeft = f.ta.scrollLeft;
    };
    const render = () => {
      f.hl.innerHTML = highlightJson(f.ta.value);
      sync();
    };
    f.ta.addEventListener("input", render);
    f.ta.addEventListener("scroll", sync);
    f.ta.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      e.preventDefault();
      const a = f.ta.selectionStart;
      const b = f.ta.selectionEnd;
      f.ta.value = f.ta.value.slice(0, a) + "  " + f.ta.value.slice(b);
      f.ta.selectionStart = f.ta.selectionEnd = a + 2;
      render();
    });
    f.render = render;
  }
  Object.values(fields).forEach(wireEditor);

  function setField(name, value) {
    const text = typeof value === "string" ? value : JSON.stringify(value, null, 2);
    fields[name].ta.value = text;
    fields[name].render();
  }

  // --- Collapsible JSON panel ------------------------------------------
  const paramsToggle = $("swa-params-toggle");
  const paramsBody = $("swa-params-body");
  paramsToggle.addEventListener("click", () => {
    paramsBody.hidden = !paramsBody.hidden;
    paramsToggle.setAttribute("aria-expanded", String(!paramsBody.hidden));
    paramsToggle.textContent = paramsBody.hidden ? "Show data (JSON)" : "Hide data (JSON)";
  });

  // --- Dependency-free CSV parsing (the module never parses CSV) --------
  function parseCsvRows(text) {
    const rows = [];
    let row = [];
    let field = "";
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (inQuotes) {
        if (ch === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; } else { inQuotes = false; }
        } else field += ch;
        continue;
      }
      if (ch === '"') inQuotes = true;
      else if (ch === ",") { row.push(field); field = ""; }
      else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && text[i + 1] === "\n") i++;
        row.push(field); rows.push(row); row = []; field = "";
      } else field += ch;
    }
    if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
    return rows.filter((r) => !(r.length === 1 && r[0] === ""));
  }
  function parseCsvObjects(text) {
    const rows = parseCsvRows(text);
    if (rows.length === 0) return [];
    const [header, ...data] = rows;
    return data.map((r) => {
      const o = {};
      header.forEach((k, i) => { o[k.trim()] = (r[i] ?? "").trim(); });
      return o;
    });
  }
  const workshopsFromCsv = (t) =>
    parseCsvObjects(t).map((r) => ({ name: r.name, maxCapacity: r.maxCapacity }));
  const studentsFromCsv = (t) =>
    parseCsvObjects(t).map((r) => ({
      lastName: r.lastName, firstName: r.firstName, className: r.className,
      ...(r.choice1 ? { choice1: r.choice1 } : {}),
      ...(r.choice2 ? { choice2: r.choice2 } : {}),
      ...(r.choice3 ? { choice3: r.choice3 } : {}),
    }));
  const exclusionsFromCsv = (t) =>
    parseCsvObjects(t).map((r) => ({
      studentA: { lastName: r.lastNameA, firstName: r.firstNameA, className: r.classNameA },
      studentB: { lastName: r.lastNameB, firstName: r.firstNameB, className: r.classNameB },
    }));

  function assignmentToCsv(byClassroom) {
    const q = (v) => {
      const s = String(v ?? "");
      return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };
    const lines = ["className,lastName,firstName,workshopName,satisfiedChoiceRank"];
    for (const [className, entries] of Object.entries(byClassroom)) {
      for (const e of entries) {
        lines.push([className, e.lastName, e.firstName, e.workshopName, e.satisfiedChoiceRank ?? ""].map(q).join(","));
      }
    }
    return lines.join("\r\n") + "\r\n";
  }
  function download(blob, name) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // --- Imported classes (one CSV file each), merged into `students` -----
  let loadedClasses = [];
  function renderLoaded() {
    loadedList.replaceChildren();
    loadedClasses.forEach((c, i) => {
      const li = document.createElement("li");
      li.append(document.createTextNode(`${c.label} — ${c.students.length}`));
      const rm = document.createElement("button");
      rm.type = "button";
      rm.className = "btn btn-rounded";
      rm.textContent = "Remove";
      rm.addEventListener("click", () => {
        loadedClasses.splice(i, 1);
        renderLoaded();
        setField("students", loadedClasses.flatMap((c) => c.students));
      });
      li.appendChild(rm);
      loadedList.appendChild(li);
    });
  }
  function fileInput(id, apply) {
    $(id).addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (file) apply(file, await file.text());
      e.target.value = "";
    });
  }
  fileInput("swa-csv-workshops", (_f, t) => setField("workshops", workshopsFromCsv(t)));
  fileInput("swa-csv-class", (f, t) => {
    loadedClasses.push({ label: f.name, students: studentsFromCsv(t) });
    renderLoaded();
    setField("students", loadedClasses.flatMap((c) => c.students));
  });
  fileInput("swa-csv-exclusions", (_f, t) => setField("exclusions", exclusionsFromCsv(t)));

  // --- Sample dataset (lazy — not in the initial page) -----------------
  let samplePromise = null;
  const getSample = () => (samplePromise ??= import(SAMPLE_URL));
  async function loadSample() {
    setStatus("Loading the sample roster…", false);
    try {
      const s = await getSample();
      loadedClasses = [];
      renderLoaded();
      setField("workshops", s.SAMPLE_WORKSHOPS);
      setField("students", s.SAMPLE_STUDENTS);
      setField("exclusions", s.SAMPLE_EXCLUSIONS);
      setStatus("", false);
    } catch (err) {
      console.error(err);
      setStatus("Could not load the sample roster.", true);
    }
  }
  sampleBtn.addEventListener("click", loadSample);

  // --- Result rendering ----------------------------------------------
  function classroomTable(byClassroom) {
    const rows = Object.entries(byClassroom).flatMap(([className, es]) =>
      es.map((e) => ({ className, ...e })),
    );
    if (rows.length === 0) return `<p class="swa-hint">No assignments.</p>`;
    return `<table class="swa-table"><thead><tr>
      <th>Class</th><th>Student</th><th>Workshop</th><th>Choice</th></tr></thead><tbody>${rows
        .map(
          (r) => `<tr><td>${escapeHtml(r.className)}</td><td>${escapeHtml(r.studentName)}</td>
          <td>${escapeHtml(r.workshopName)}</td>
          <td class="${r.satisfiedChoiceRank === null ? "rank-null" : ""}">${r.satisfiedChoiceRank ?? "none"}</td></tr>`,
        )
        .join("")}</tbody></table>`;
  }
  function workshopTable(byWorkshop) {
    const rows = Object.entries(byWorkshop).flatMap(([workshopName, es]) =>
      es.map((e) => ({ workshopName, ...e })),
    );
    if (rows.length === 0) return `<p class="swa-hint">No assignments.</p>`;
    return `<table class="swa-table"><thead><tr>
      <th>Workshop</th><th>Student</th><th>Class</th></tr></thead><tbody>${rows
        .map(
          (r) => `<tr><td>${escapeHtml(r.workshopName)}</td><td>${escapeHtml(r.studentName)}</td><td>${escapeHtml(r.className)}</td></tr>`,
        )
        .join("")}</tbody></table>`;
  }
  function renderResult(result, onConfirm) {
    const d = result.statistics?.choiceDistribution;
    const dist = d
      ? `<p>1st choice: <b>${d.choice1}</b> &nbsp; 2nd: <b>${d.choice2}</b> &nbsp; 3rd: <b>${d.choice3}</b> &nbsp; no choice: <b>${d.unmatched}</b></p>`
      : "";
    const timedOut = result.timedOut
      ? `<p class="swa-warnings">The solver hit its 15&nbsp;s limit — this assignment is usable but not proven optimal.</p>`
      : "";
    const warnings =
      result.warnings && result.warnings.length
        ? `<h4>Warnings</h4><ul class="swa-warnings">${result.warnings
            .map((w) => `<li><code>${escapeHtml(w.code)}</code> — ${escapeHtml(w.message)}</li>`)
            .join("")}</ul>`
        : "";
    const conflicts =
      result.unresolvedExclusionConflicts && result.unresolvedExclusionConflicts.length
        ? `<h4>Exclusion conflicts</h4><ul class="swa-conflicts">${result.unresolvedExclusionConflicts
            .map(
              (c) =>
                `<li>${escapeHtml(c.studentA.lastName)} ${escapeHtml(c.studentA.firstName)} (${escapeHtml(c.studentA.className)})` +
                ` and ${escapeHtml(c.studentB.lastName)} ${escapeHtml(c.studentB.firstName)} (${escapeHtml(c.studentB.className)})` +
                ` would both land in “${escapeHtml(c.workshop)}”</li>`,
            )
            .join("")}</ul>` +
          (result.status === "NEEDS_CONFIRMATION"
            ? `<button type="button" class="btn btn-primary btn-rounded" id="swa-confirm">Confirm and apply the best compromise</button>`
            : "")
        : "";
    const exports = Object.values(result.byClassroom || {}).some((a) => a.length)
      ? `<span class="swa-result-exports"><button type="button" class="btn btn-rounded" id="swa-export-csv">Export CSV</button></span>`
      : "";

    resultEl.innerHTML = `
      <div class="swa-result-head">
        <span class="swa-badge status-${escapeHtml(result.status)}">${escapeHtml(result.status)}</span>
        ${result.message ? `<span>${escapeHtml(result.message)}</span>` : ""}
        ${exports}
      </div>
      ${timedOut}${dist}${conflicts}${warnings}
      <h4>By class</h4>${classroomTable(result.byClassroom)}
      <h4>By workshop</h4>${workshopTable(result.byWorkshop)}
      <details><summary>Raw result JSON</summary><pre>${escapeHtml(JSON.stringify(result, null, 2))}</pre></details>`;

    $("swa-confirm")?.addEventListener("click", onConfirm, { once: true });
    $("swa-export-csv")?.addEventListener("click", () =>
      download(new Blob([assignmentToCsv(result.byClassroom)], { type: "text/csv;charset=utf-8" }), "workshop-assignment.csv"),
    );
  }
  function renderError(error) {
    const isCoherence = error && error.name === "CoherenceError";
    resultEl.innerHTML = `
      <p><span class="swa-badge status-ERROR">${isCoherence ? "CoherenceError" : "ERROR"}</span> ${escapeHtml(error?.message ?? String(error))}</p>
      ${isCoherence && error.details ? `<pre>${escapeHtml(JSON.stringify(error.details, null, 2))}</pre>` : ""}`;
  }

  function setStatus(text, isError) {
    statusEl.textContent = text;
    statusEl.className = "swa-demo-status" + (isError ? " swa-demo-error" : "");
  }

  // --- Web Worker: one per run, terminated in `finally` --------------
  // vendor/worker.js is a plain (classic) same-origin bundle — no import
  // map, no cross-origin script, no blob. Minimal request/response
  // correlation over postMessage; a rejected call carries the worker-side
  // error's name/code/details so renderError() can tell a CoherenceError
  // from a solver failure.
  let activeAssigner = null;
  let running = false;

  function makeAssigner(worker) {
    let nextId = 0;
    const pending = new Map();
    worker.addEventListener("message", (e) => {
      const m = e.data;
      if (!m || typeof m.id !== "number") return;
      const entry = pending.get(m.id);
      if (!entry) return;
      pending.delete(m.id);
      if (m.ok) {
        entry.resolve(m.result);
      } else {
        const err = new Error(m.error?.message || "Worker error");
        err.name = m.error?.name || "Error";
        if (m.error?.code) err.code = m.error.code;
        if (m.error?.details) err.details = m.error.details;
        entry.reject(err);
      }
    });
    return {
      assign: (input, options) =>
        new Promise((resolve, reject) => {
          const id = nextId++;
          pending.set(id, { resolve, reject });
          worker.postMessage({ id, payload: { input, options } });
        }),
      terminate() {
        worker.terminate();
        for (const e of pending.values())
          e.reject(new Error("Worker terminated before the assignment completed."));
        pending.clear();
      },
    };
  }

  function releaseWorker() {
    try { activeAssigner?.terminate(); } catch (e) { /* ignore */ }
    activeAssigner = null;
  }
  window.addEventListener("pagehide", releaseWorker);

  function readInput() {
    const workshops = JSON.parse(fields.workshops.ta.value || "[]");
    const students = JSON.parse(fields.students.ta.value || "[]");
    const exText = fields.exclusions.ta.value.trim();
    const exclusions = exText ? JSON.parse(exText) : undefined;
    return {
      workshops,
      students,
      exclusions,
      options: { strictExclusions: strictEl.checked, timeLimitSeconds: TIME_LIMIT_SECONDS },
    };
  }

  async function runAssignment(input) {
    if (running) return;
    running = true;
    runBtn.disabled = true;
    sampleBtn.disabled = true;
    setStatus("Solving in a Web Worker… (a dense roster like this one can take 10–30 s)", false);
    try {
      activeAssigner = makeAssigner(new Worker(WORKER_URL));
      const result = await activeAssigner.assign(input, { timeLimitSeconds: TIME_LIMIT_SECONDS });
      setStatus("", false);
      renderResult(result, () =>
        runAssignment({ ...input, options: { ...input.options, confirmedExclusionRelaxation: true } }),
      );
    } catch (error) {
      console.error(error);
      setStatus("", false);
      renderError(error);
    } finally {
      releaseWorker(); // WASM heap handed back to the browser
      running = false;
      runBtn.disabled = false;
      sampleBtn.disabled = false;
    }
  }

  runBtn.addEventListener("click", () => {
    let input;
    try {
      input = readInput();
    } catch (err) {
      setStatus("Invalid JSON: " + err.message, true);
      return;
    }
    setStatus("", false);
    runAssignment(input);
  });

  // --- Launch: reveal the UI and preload the sample -------------------
  launch.addEventListener("click", async () => {
    launch.disabled = true;
    await loadSample();
    breakout.hidden = false;
    launch.hidden = true;
  });
</script>
{{< /rawhtml >}}
