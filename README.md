# Plant Leaf Disease Analyzer

A full-stack Digital Image Processing (DIP) application that analyzes a photograph of a plant leaf, separates the leaf from its background, detects regions whose color and texture are inconsistent with healthy tissue, and quantifies the affected area — using classical, transparent image-processing algorithms rather than an opaque AI/ML model.

**Stack:** React (Vite) frontend · Django + Django REST Framework backend · OpenCV / NumPy / scikit-image for all image processing

---

## Table of Contents

1. [Overview](#overview)
2. [Why Classical DIP, Not AI/ML](#why-classical-dip-not-aiml)
3. [System Architecture](#system-architecture)
4. [Project Structure](#project-structure)
5. [The Complete DIP Pipeline](#the-complete-dip-pipeline)
6. [Quick Start](#quick-start)
7. [API Reference](#api-reference)
8. [Severity Classification](#severity-classification)
9. [Limitations and Disclaimer](#limitations-and-disclaimer)
10. [Future Scope](#future-scope)

---

## Overview

Manual identification of plant leaf diseases is slow, subjective, and dependent on expert knowledge. This project applies a sequence of well-established Digital Image Processing techniques to a leaf photograph — noise removal, contrast enhancement, color-space conversion, segmentation, edge detection, color-based disease-region detection, and morphological cleanup — to produce:

- A full visual breakdown of every processing stage
- A disease-affected area percentage
- A severity classification (Low / Moderate / High / Severe)
- Standard image-quality metrics (MSE, PSNR, SSIM)
- A final image with suspected disease regions highlighted

---

## Why Classical DIP, Not AI/ML

This project deliberately does **not** use a trained machine-learning or deep-learning model. Every stage is a deterministic, mathematically explainable operation on pixel values — the same input always produces the same output, and every decision (why a pixel is "leaf" or "disease") can be traced back to a specific threshold or algorithm. This makes the system:

- Fully inspectable — no black-box predictions
- Free of any training-data or dataset-bias concerns
- Directly aligned with core Digital Image Processing theory (filtering, thresholding, morphology, gradient operators)

An optional, clearly-separated machine-learning classification layer (to predict a specific disease *name*) could be added later as an extension — see [Future Scope](#future-scope) — but it is not part of the core pipeline.

---

## System Architecture

```
React (Vite) SPA                    Django + DRF API
┌──────────────────────┐            ┌───────────────────────────┐
│ Upload component       │  HTTP/JSON │ /api/upload/                │
│ Stage-image gallery     │ ───────►  │ /api/analyze/                │
│ Results panel / charts  │ ◄───────  │ processing/ (OpenCV core)    │
└──────────────────────┘            │ media/ (uploads, results)     │
                                     └───────────────────────────┘
```

The frontend holds no image-processing logic — it only uploads images and renders whatever the backend returns. All pixel-level work happens in the backend's `processing/` package, which is framework-agnostic (pure OpenCV/NumPy) and independently testable.

---

## Project Structure

```
plant-leaf-disease-analyzer/
│
├── README.md                      This file
│
├── backend/
│   ├── README.md                   Backend-specific setup & API docs
│   ├── manage.py
│   ├── config/                     Django settings, root URLs
│   └── analyzer/
│       ├── models.py               LeafImage model
│       ├── serializers.py
│       ├── views.py                 Upload + Analyze endpoints
│       ├── urls.py
│       ├── config.py                Severity thresholds, HSV ranges
│       ├── tests.py
│       └── processing/              Framework-agnostic DIP core
│           ├── preprocessing.py     Acquisition, resize, denoise
│           ├── enhancement.py       Color conversion, histogram eq., CLAHE, gamma
│           ├── segmentation.py      Leaf segmentation (HSV/Otsu)
│           ├── edge_detection.py    Sobel, Prewitt, Canny
│           ├── disease_detection.py Disease color-based masking
│           ├── morphology.py        Erosion, dilation, opening, closing
│           └── metrics.py           MSE, PSNR, SSIM, area/severity calculation
│
└── frontend/
    ├── README.md                   Frontend-specific setup docs
    ├── package.json
    └── src/
        ├── App.jsx
        ├── api.js
        └── components/
            ├── UploadForm.jsx
            ├── StageGallery.jsx
            ├── ResultsPanel.jsx
            ├── HistogramChart.jsx
            └── FilterSelect.jsx
```

---

## The Complete DIP Pipeline

The image passes through the following stages, in order. Each stage's output is the next stage's input, forming one continuous pipeline from raw upload to final result.

```
Leaf Photo Upload
        │
        ▼
1. Image Acquisition           — read, validate, extract metadata
        │
        ▼
2. Preprocessing                — resize, noise removal
        │
        ▼
3. Color Space Conversion       — RGB → Grayscale / HSV / LAB
        │
        ▼
4. Image Enhancement             — histogram eq. / CLAHE / gamma correction
        │
        ├─────────────────────────────┐
        ▼                              ▼
5. Leaf Segmentation            6. Edge Detection
   (HSV / Otsu thresholding)        (Sobel / Prewitt / Canny — parallel, display-only)
        │
        ▼
7. Disease Region Detection      — HSV/LAB color thresholding within the leaf mask
        │
        ▼
8. Morphological Processing      — opening (remove noise) → closing (fill gaps)
        │
        ▼
9. Disease Area Calculation      — pixel counting → percentage → severity label
        │
        ▼
10. Result Visualization         — highlighted overlay + all stage images + metrics
```

### 1. Image Acquisition

The uploaded file is read with OpenCV (`cv2.imread`) after validating its extension (JPG/JPEG/PNG). Width, height, channel count, and data type are extracted and recorded before any processing begins — this establishes a clean, verified starting point.

### 2. Preprocessing (Resize + Noise Removal)

The image is resized to a standard working resolution (e.g. 512×512) while preserving aspect ratio, so later pixel-count-based measurements are comparable across different input images. Noise is then removed using one of three selectable filters:

| Filter | Type | Best for |
|---|---|---|
| Gaussian Blur | Linear | General smoothing |
| Median Filter | Non-linear (rank-based) | Salt-and-pepper noise; preserves edges |
| Mean Filter | Linear | Fast, simple smoothing |

The median filter is generally preferred here because it removes noise while preserving the sharp boundaries of the leaf and any disease regions — important for accurate segmentation later.

### 3. Color Space Conversion

The image is converted from RGB/BGR into:

- **Grayscale** — for edge detection
- **HSV** (Hue, Saturation, Value) — separates color from brightness, making it the primary space for leaf and disease detection, robust to lighting variation
- **LAB** — used as a secondary option for disease-color thresholding

### 4. Image Enhancement

Contrast is improved so that faint discoloration becomes numerically measurable:

- **Histogram Equalization** — applied to the brightness channel only (not each RGB channel independently, which would distort color)
- **CLAHE** (Contrast Limited Adaptive Histogram Equalization) — localized, tile-based equalization that avoids over-amplifying noise
- **Gamma Correction** — power-law brightening/darkening via lookup table

Before/after histograms are generated to visualize the effect.

### 5. Leaf Segmentation

A hue range corresponding to typical leaf-green is thresholded in HSV space (optionally combined with Otsu's automatic thresholding) to produce a binary **leaf mask**. This mask is applied to the original image via a bitwise AND, isolating the leaf from any background (soil, hand, table).

### 6. Edge Detection (parallel, demonstrative)

Three classical gradient-based operators are available, applied to the grayscale image:

- **Sobel** — directional horizontal/vertical gradients
- **Prewitt** — uniform-weight gradient kernels (custom convolution, since OpenCV has no built-in Prewitt)
- **Canny** — multi-stage algorithm producing the cleanest, thinnest edges

This stage runs alongside the main pipeline for visualization and does not feed into the disease calculation.

### 7. Disease Region Detection

Working **only within the leaf mask**, additional HSV/LAB color thresholds are applied to flag pixels consistent with common disease symptoms — yellow, brown, dark brown, black, reddish, or pale/discolored tones. This produces a raw binary **disease mask** (0 = healthy, 1 = potentially diseased).

> This is a color-based heuristic, not a certified diagnosis — it flags pixels whose color is inconsistent with healthy leaf tissue, based on measurable image characteristics only.

### 8. Morphological Processing

The raw disease mask is cleaned using two operations, applied in sequence:

1. **Opening** (erosion → dilation) — removes small, isolated false-positive specks
2. **Closing** (dilation → erosion) — fills small gaps within genuine disease regions

### 9. Disease Area Calculation

```
Disease Percentage = (Disease Pixels / Total Leaf Pixels) × 100
```

The percentage is mapped to a severity label using configurable thresholds (see [Severity Classification](#severity-classification)).

### 10. Result Visualization

The cleaned disease mask's regions are overlaid on the original image as a highlighted boundary, and every intermediate stage image is made available in the frontend's stage gallery, alongside the computed percentage, severity, and MSE/PSNR/SSIM values.

---

## Quick Start

```bash
# Backend
cd backend
python3 -m venv venv && source venv/bin/activate
pip install django djangorestframework django-cors-headers pillow opencv-python-headless numpy scikit-image
python manage.py migrate
python manage.py runserver

# Frontend (in a separate terminal)
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`, upload a leaf image, and click Analyze.

See `backend/README.md` and `frontend/README.md` for full setup details.

---

## API Reference

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/upload/` | Upload image, return acquisition metadata |
| `POST` | `/api/process/<id>/denoise/` | Apply selected denoising filter |
| `POST` | `/api/process/<id>/enhance/` | Histogram eq. / CLAHE / gamma + MSE/PSNR/SSIM |
| `POST` | `/api/process/<id>/segment/` | Leaf segmentation mask |
| `POST` | `/api/process/<id>/edges/` | Sobel / Prewitt / Canny edge map |
| `POST` | `/api/process/<id>/detect-disease/` | Disease mask (post-morphology) |
| `POST` | `/api/analyze/<id>/` | Full pipeline, single combined response |

---

## Severity Classification

| Disease-Affected Area | Severity Level |
|---|---|
| 0% – 5% | Low |
| 5% – 20% | Moderate |
| 20% – 50% | High |
| 50%+ | Severe |

These thresholds are project-defined for demonstration purposes, stored in `backend/analyzer/config.py` (not hardcoded into the processing logic), and are **not** scientifically validated agricultural treatment thresholds.

---

## Limitations and Disclaimer

- This system detects pixels whose **color and spatial pattern** are inconsistent with a healthy leaf — it does **not** identify a specific disease and does **not** replace expert agricultural judgment.
- Accuracy depends on image quality, lighting, and background clutter; images with uncontrolled backgrounds may reduce segmentation accuracy.
- No treatment or pesticide recommendations are provided by this system.

---

## Future Scope

- Batch analysis of multiple leaf images at once
- Mobile-friendly capture interface for real-time field use
- Adaptive threshold selection based on lighting/background conditions
- An optional, clearly-separated classical ML classifier (e.g. SVM/Random Forest) to predict a specific disease name from the detected region's color/texture features — kept downstream of, and independent from, the core DIP pipeline
- Compression of stored result images for more efficient long-term storage
