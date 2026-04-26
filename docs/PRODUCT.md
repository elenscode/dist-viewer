# Product

## Purpose

Build an interactive visualization tool for exploring large equipment-log datasets without rendering every expensive chart at once.

## Users

- Equipment engineers investigating patterns in high-volume logs.
- Operations or reliability engineers comparing many signal charts.
- Developers integrating real log APIs and visualization workflows.

## Core Value

- Show many chart candidates quickly through generated thumbnail images.
- Render expensive interactive charts only when selected.
- Keep the architecture ready for real backend log data and larger scale.

## Key Features

- Thumbnail-first chart grid using mock signal thumbnails.
- Search by chart title.
- On-demand Plotly WebGL modal.
- Sidebar tree structure for future equipment/log navigation.

## Nonfunctional Requirements

- Large-grid browsing must remain responsive.
- Visualization code must stay isolated from API and UI shell concerns.
- Future real data boundaries must validate or normalize external data.
- Agent workflows must include repeatable build, docs, architecture, and review checks.

## Assumptions

- Real equipment-log schema is not yet available.
- Authentication and authorization requirements are not yet defined.
- Deployment target is expected to use Docker, but Docker files are not present yet.
