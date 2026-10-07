# Plant Leaf Disease Analyzer — Frontend

React (Vite) single-page application that lets a user upload a leaf photo, trigger the Digital Image Processing (DIP) pipeline on the backend, and browse every processing stage alongside the final disease-area result.

---

## Tech Stack

| Purpose | Technology |
|---|---|
| UI framework | React 18 (Vite) |
| HTTP client | Axios |
| Charts (histograms) | Chart.js / Recharts |
| Styling | Plain CSS (or Tailwind, if added) |

This app is a pure presentation layer — it holds no image-processing logic itself. Every pixel operation happens on the backend; the frontend only uploads images, calls API endpoints, and renders the JSON/image results it gets back.

---

## Prerequisites

- Node.js 18 or above
- npm (comes with Node.js)
- The backend running locally (see `backend/README.md`) — by default expected at `http://127.0.0.1:8000`

---

## Setup

```bash
cd frontend
npm install
```

## Running the App

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Other Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server with hot reload |
| `npm run build` | Produce a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Environment Configuration

The backend API base URL is currently set directly in `src/api.js`:

```js
const API_BASE = "http://127.0.0.1:8000/api";
```

If you deploy the backend elsewhere, update this value (or convert it to a Vite environment variable, e.g. `VITE_API_BASE_URL`, read via `import.meta.env.VITE_API_BASE_URL`).

---

## Project Structure

```
frontend/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx                 React entry point
│   ├── App.jsx                   Top-level app, wires everything together
│   ├── api.js                    Axios calls to the Django backend
│   ├── components/
│   │   ├── UploadForm.jsx        File picker, preview, upload trigger
│   │   ├── StageGallery.jsx      Grid of all 9 DIP pipeline stage images
│   │   ├── ResultsPanel.jsx      Disease %, severity badge, MSE/PSNR/SSIM
│   │   ├── HistogramChart.jsx    Before/after histogram comparison
│   │   └── FilterSelect.jsx      Dropdowns for denoise/edge-detection method
│   └── styles/
│       └── index.css
└── public/
```

---

## Component Overview

| Component | Responsibility |
|---|---|
| `UploadForm` | Accepts a JPG/JPEG/PNG file, shows a local preview, uploads it via `POST /api/upload/`, surfaces upload errors |
| `StageGallery` | Renders every stage image returned by the analysis endpoint (original → grayscale → denoised → enhanced → segmented → edges → disease mask → morphology → final highlighted result) in a labeled grid |
| `ResultsPanel` | Displays the disease-affected percentage, severity label (Low / Moderate / High / Severe), and MSE / PSNR / SSIM values |
| `HistogramChart` | Plots the original vs. enhanced image histograms side by side |
| `FilterSelect` | Lets the user choose which denoising filter or edge-detection operator to apply, where applicable |

---

## API Calls Used

| Frontend action | Backend endpoint |
|---|---|
| Upload a leaf image | `POST /api/upload/` |
| Run the full DIP pipeline on an uploaded image | `POST /api/analyze/<id>/` |

See `backend/README.md` for full endpoint details and response shapes.

---

## Notes

- CORS must be enabled on the backend for `http://localhost:5173` (already configured in the Django settings — see backend README).
- All processing-stage images are served from the backend's `MEDIA_URL`; no image manipulation happens in the browser.
- The final result always includes a visible disclaimer that the output is a potential disease-region indicator, not a certified diagnosis.
