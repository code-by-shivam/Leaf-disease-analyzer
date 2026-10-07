import {
  Upload,
  SlidersHorizontal,
  Palette,
  Leaf,
  ScanLine,
  Search,
  BarChart3,
  Monitor,
} from "lucide-react";

/**
 * Single source of truth for the 8 processing modules.
 * Used by Home, Pipeline, About, Results and the processing status panel.
 */
export const pipelineSteps = [
  {
    number: "01",
    title: "Image Acquisition",
    short: "Receiving uploaded leaf image",
    description: "The plant leaf image is uploaded for analysis.",
    icon: Upload,
  },
  {
    number: "02",
    title: "Image Preprocessing",
    short: "Resizing and reducing noise",
    description: "The image is resized and unwanted noise is reduced.",
    icon: SlidersHorizontal,
  },
  {
    number: "03",
    title: "Color Space & Enhancement",
    short: "Color conversion and contrast enhancement",
    description: "Color spaces are converted and image contrast is enhanced.",
    icon: Palette,
  },
  {
    number: "04",
    title: "Leaf Segmentation",
    short: "Isolating the target leaf region",
    description: "The target leaf region is separated from the background.",
    icon: Leaf,
  },
  {
    number: "05",
    title: "Edge Detection",
    short: "Detecting structural boundaries",
    description: "Important structural boundaries of the image are detected.",
    icon: ScanLine,
  },
  {
    number: "06",
    title: "Disease Region Detection",
    short: "Detecting potential abnormal regions",
    description: "Potential abnormal color regions on the leaf are detected.",
    icon: Search,
  },
  {
    number: "07",
    title: "Morphological & Quantitative Analysis",
    short: "Calculating pixel-level measurements",
    description:
      "Detected regions are cleaned and the potentially affected area is calculated.",
    icon: BarChart3,
  },
  {
    number: "08",
    title: "Result Visualization",
    short: "Preparing visual outputs",
    description:
      "Processed images and quantitative results are presented.",
    icon: Monitor,
  },
];
