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

The demo below loads the published package straight from the jsDelivr CDN and mounts it
in this page. It works best on a desktop-sized screen and keeps its state in your browser
(`localStorage`).

{{< rawhtml >}}
<div class="classroom-demo">
  <button type="button" id="ltn-demo-launch" class="btn btn-primary btn-rounded">Launch the interactive demo</button>
  <p id="ltn-demo-status" class="classroom-demo-status" role="status"></p>
  <div id="ltn-demo-app" class="classroom-demo-stage" hidden></div>
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
    font-size: 0.9rem;
    color: var(--secondary);
    min-height: 1.2em;
  }
  .classroom-demo-stage {
    margin-top: 1rem;
    padding: 1rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--entry);
    overflow: auto;
  }
</style>

<script type="module">
  const launch = document.getElementById("ltn-demo-launch");
  const statusEl = document.getElementById("ltn-demo-status");
  const app = document.getElementById("ltn-demo-app");

  const VERSION = "1.3.0";
  const MODULE_URL = `https://cdn.jsdelivr.net/npm/ltn-classroom-layout@${VERSION}/+esm`;
  const STYLE_URL = `https://cdn.jsdelivr.net/npm/ltn-classroom-layout@${VERSION}/src/style.css`;

  let started = false;

  launch.addEventListener("click", async () => {
    if (started) return;
    started = true;
    launch.disabled = true;
    statusEl.textContent = "Loading the module…";

    try {
      if (!document.querySelector('link[data-ltn-classroom]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = STYLE_URL;
        link.dataset.ltnClassroom = "true";
        document.head.appendChild(link);
      }

      const { ClassroomLayout } = await import(MODULE_URL);

      app.hidden = false;
      const layout = new ClassroomLayout(app, {
        teacher: {
          firstName: "Jean-François",
          lastName: "Rondeau",
          className: "Demo class",
          school: "letableaunoir.fr",
          year: "2026-2027",
        },
        colors: [
          { label: "Site blue", value: "#2f6f9e" },
          { label: "Math", value: "#e07a5f" },
          { label: "Language arts", value: "#81b29a" },
          { label: "Science", value: "#f2cc8f" },
        ],
        students: [
          { id: "1", firstName: "Ada", lastName: "Lovelace", level: "Grade 5" },
          { id: "2", firstName: "Alan", lastName: "Turing", level: "Grade 5" },
          { id: "3", firstName: "Grace", lastName: "Hopper", level: "Grade 5" },
          { id: "4", firstName: "Katherine", lastName: "Johnson", level: "Grade 5" },
          { id: "5", firstName: "Marie", lastName: "Curie", level: "Grade 5" },
          { id: "6", firstName: "Claude", lastName: "Shannon", level: "Grade 5" },
        ],
        persistence: {
          load: () => {
            try {
              return JSON.parse(localStorage.getItem("ltn-classroom-layout-demo") ?? "null");
            } catch (e) {
              return null;
            }
          },
          save: (state) => {
            try {
              localStorage.setItem("ltn-classroom-layout-demo", JSON.stringify(state));
            } catch (e) {
              /* storage unavailable — demo still works in-memory */
            }
          },
        },
      });

      await layout.ready;
      statusEl.textContent = "";
    } catch (err) {
      console.error(err);
      statusEl.textContent =
        "The demo could not be loaded (the CDN may be unreachable). The package still works via npm — see the links above.";
      launch.disabled = false;
      started = false;
    }
  });
</script>
{{< /rawhtml >}}
