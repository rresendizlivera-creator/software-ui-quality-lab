# Software & UI Quality Lab

A responsive software QA portfolio demonstration by **Roberto Reséndiz Livera**. Uses fictional test cases to illustrate analytical presentation, multi-filter controls, accessible native inputs, summary KPIs, empty-result handling and CSV export.

## Try it locally

No build step, API key, analytics service or backend is required. Serve the repository directory (ES modules will not normally work when opening an HTML file using `file://`):

```bash
python -m http.server 8000
```

Then open http://localhost:8000. Any equivalent local static server will work.

## Run tests

Requires Node.js 20+ (no npm dependencies):

```bash
npm test
```

The test script runs `node --test`, which can also be invoked directly.

## Implementation notes

- `index.html`: semantic layout, visible labels, skip link, table caption and live summary.
- `styles.css`: responsive dark interface with visible keyboard focus states.
- `core.js`: pure filtering, KPI summary and CSV creation functions.
- `app.js`: safely renders synthetic test cases using `textContent`, and exports only the current filtered set.
- `tests/core.test.js`: tests filters, summaries, quoted CSV fields and formula-injection protection.

The synthetic rows are **not reports of real defects or professional client work**. The project does not contain recordings, user data, credentials or proprietary guidelines.

## Scope and limitations

This demonstrates manual test-case presentation rather than a browser automation engine. Use keyboard and screen-reader testing in the target browser before claiming compliance with a particular accessibility standard. CSV protection handles common formula prefixes; consumers should still review untrusted spreadsheet imports.
