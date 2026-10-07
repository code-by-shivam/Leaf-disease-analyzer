const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function uploadLeafImage(file) {
  const formData = new FormData();

  formData.append("image", file);

  const response = await fetch(
    `${API_BASE_URL}/api/upload/`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    let message = "Failed to analyze image.";

    try {
      const errorData = await response.json();

      if (errorData.detail) {
        message = errorData.detail;
      }
    } catch {
      // Keep default error message.
    }

    throw new Error(message);
  }

  return response.json();
}

export async function getAnalysisResult(id) {
  const response = await fetch(
    `${API_BASE_URL}/api/results/${id}/`
  );

  if (!response.ok) {
    throw new Error("Unable to load analysis result.");
  }

  return response.json();
}

