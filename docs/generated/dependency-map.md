# Dependency Map

## Runtime Dependencies

- React and React DOM.
- Plotly and `react-plotly.js`.
- OpenCV.js through `@techstark/opencv-js`.
- Tailwind CSS utilities and class helpers.
- lucide-react icons.
- shadcn/base UI-related packages.

## Development Dependencies

- TypeScript.
- Vite.
- React plugin for Vite.
- Tailwind Vite plugin.

## Dependency Risks

- Plotly and OpenCV.js are large; monitor bundle size when adding routes and features.
- Browser automation dependencies are not installed yet.
- No dependency audit command is wired because package-manager audit behavior may require registry/network access.
