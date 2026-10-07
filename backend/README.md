# Plant Leaf Disease Analyzer — Backend

Django + Django REST Framework (DRF) API that receives a leaf image, runs it through a classical Digital Image Processing (DIP) pipeline using OpenCV/NumPy, and returns every processing stage plus a quantitative disease-area result as JSON.

---

## Tech Stack

| Purpose | Technology |
|---|---|
| Web framework | Django |
| API layer | Django REST Framework |
| Cross-origin requests | django-cors-headers |
| Image processing | OpenCV (`opencv-python-headless`), NumPy |
| File handling | Pillow |
| Image quality metrics | scikit-image (`skimage.metrics`) |

No machine learning or AI models are used. Every stage is a deterministic, classical image-processing algorithm (filtering, thresholding, morphology, gradient operators), consistent with the project's Digital Image Processing focus.

---

## Prerequisites

- Python 3.10 or above
- pip

---

## Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

pip install django djangorestframework django-cors-headers \
            pillow opencv-python-headless numpy scikit-image

python manage.py makemigrations analyzer
python manage.py migrate
```

## Running the Server

```bash
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/api/`.

---

## Configuration Notes

- **CORS**: `CORS_ALLOWED_ORIGINS` in `config/settings.py` allows the Vite dev server (`http://localhost:5173`). Update this for production.
- **Media files**: Uploaded images and generated stage images are stored under `MEDIA_ROOT` (`backend/media/`) and served at `MEDIA_URL` (`/media/`) in development.
- **Upload limits**: `DATA_UPLOAD_MAX_MEMORY_SIZE` and `FILE_UPLOAD_MAX_MEMORY_SIZE` are set to 10 MB.

---

## Project Structure

```
backend/
├── manage.py
├── config/
│   ├── settings.py              Django settings, CORS, media config
│   └── urls.py                  Root URL routing
│
└── analyzer/
    ├── models.py                 LeafImage model (image + metadata)
    ├── serializers.py            DRF serializers (request/response shape)
    ├── views.py                  API views (upload, analyze)
    ├── urls.py                   App-level URL routing
    ├── config.py                 Severity thresholds, HSV ranges (tunable constants)
    ├── tests.py                  Unit tests for processing functions
    │
    └── processing/                Framework-agnostic DIP core (OpenCV/NumPy only)
        ├── preprocessing.py       Acquisition, resize, denoise
        ├── enhancement.py         Color conversion, histogram eq., CLAHE, gamma
        ├── segmentation.py        Leaf segmentation (HSV/Otsu)
        ├── edge_detection.py      Sobel, Prewitt, Canny
        ├── disease_detection.py   Disease color-based masking
        ├── morphology.py          Erosion, dilation, opening, closing
        └── metrics.py             MSE, PSNR, SSIM, area/severity calculation
```

The `processing/` package is intentionally decoupled from Django — every function takes and returns NumPy arrays (or plain dicts), so it can be unit-tested or reused outside the web layer entirely.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/upload/` | Upload a leaf image; returns acquisition metadata (width, height, channels, dtype) and an image URL |
| `POST` | `/api/process/<id>/denoise/` | Apply a selected noise-removal filter (Gaussian / Median / Mean) |
| `POST` | `/api/process/<id>/enhance/` | Apply histogram equalization / CLAHE / gamma correction; returns enhanced image + histogram data + MSE/PSNR/SSIM |
| `POST` | `/api/process/<id>/segment/` | Segment the leaf from its background (HSV/Otsu); returns mask + segmented leaf |
| `POST` | `/api/process/<id>/edges/` | Run Sobel / Prewitt / Canny edge detection |
| `POST` | `/api/process/<id>/detect-disease/` | Detect and morphologically clean the disease mask |
| `POST` | `/api/analyze/<id>/` | Run the entire pipeline in sequence and return one combined response |

### Example: Upload Response

```json
{
  "id": 1,
  "image_url": "http://127.0.0.1:8000/media/uploads/2026/08/19/leaf.jpg",
  "original_filename": "leaf.jpg",
  "uploaded_at": "2026-08-19T10:00:00Z",
  "width": 800,
  "height": 600,
  "channels": 3,
  "dtype": "uint8"
}
```

### Example: Analyze Response (combined)

```json
{
  "stages": {
    "original": "http://127.0.0.1:8000/media/results/1/original.png",
    "grayscale": "http://127.0.0.1:8000/media/results/1/grayscale.png",
    "denoised": "http://127.0.0.1:8000/media/results/1/denoised.png",
    "enhanced": "http://127.0.0.1:8000/media/results/1/enhanced.png",
    "segmented": "http://127.0.0.1:8000/media/results/1/segmented.png",
    "edges": "http://127.0.0.1:8000/media/results/1/edges.png",
    "disease_mask": "http://127.0.0.1:8000/media/results/1/disease_mask.png",
    "morphology": "http://127.0.0.1:8000/media/results/1/morphology.png",
    "highlighted": "http://127.0.0.1:8000/media/results/1/highlighted.png"
  },
  "disease_percentage": 18.5,
  "severity": "Moderate",
  "mse": 12.45,
  "psnr": 37.21,
  "ssim": 0.94,
  "histogram_before": [...],
  "histogram_after": [...]
}
```

---

## Testing

```bash
python manage.py test analyzer
```

Unit tests in `analyzer/tests.py` exercise each `processing/*.py` function independently against sample fixture images (a healthy leaf, a diseased leaf, and an invalid/non-image file) rather than going through the HTTP layer, so the core DIP logic can be verified in isolation.

---

## Important Note on Scope

This backend performs **potential disease-region detection based on color and texture characteristics** — it does not identify a specific disease and does not constitute a certified diagnosis. See the root `README.md` for the full explanation of the processing pipeline and its limitations.
