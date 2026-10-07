import os
import base64
import json

from groq import Groq


client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def analyze_leaf_with_ai(image_path):
    """
    Analyze a plant leaf image using a vision model
    and return structured disease information.
    """

    with open(image_path, "rb") as image_file:
        image_bytes = image_file.read()

    image_base64 = base64.b64encode(image_bytes).decode("utf-8")

    prompt = """
You are a plant leaf image analysis assistant.

Analyze the provided plant leaf image.

Return ONLY a valid JSON object.
Do NOT use Markdown.
Do NOT use ```json.
Do NOT add any explanation outside the JSON.

Use exactly this structure:

{
    "is_leaf": true,
    "plant": "Unknown",
    "disease": "Unknown",
    "confidence": 0,
    "severity": "Unknown",
    "symptoms": [],
    "possible_causes": [],
    "recommendation": ""
}

Rules:
- "is_leaf" must indicate whether the image appears to contain a plant leaf.
- Identify the plant only if reasonably possible.
- Identify the most likely disease only if there are visible indicators.
- If the disease cannot be determined reliably, use "Unknown".
- Confidence must be a number between 0 and 100.
- Do not invent information.
- Keep symptoms as an array of short strings.
- Keep possible_causes as an array of short strings.
- Keep recommendation as a short string.
- This is an image-based prediction and NOT a definitive diagnosis.
"""

    response = client.chat.completions.create(
        model="qwen/qwen3.8-27b",

        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt,
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": (
                                f"data:image/jpeg;base64,"
                                f"{image_base64}"
                            )
                        },
                    },
                ],
            }
        ],

        temperature=0,

        max_completion_tokens=1000,
    )

    content = response.choices[0].message.content.strip()

    # ---------------------------------------------
    # Remove Markdown JSON code fences if present
    # ---------------------------------------------

    if content.startswith("```json"):
        content = content[len("```json"):].strip()

    elif content.startswith("```"):
        content = content[len("```"):].strip()

    if content.endswith("```"):
        content = content[:-3].strip()

    # ---------------------------------------------
    # Parse JSON
    # ---------------------------------------------

    try:

        result = json.loads(content)

        return result

    except json.JSONDecodeError:

        print("AI returned invalid JSON:")
        print(content)

        return {
            "is_leaf": True,
            "plant": "Unknown",
            "disease": "Unknown",
            "confidence": 0,
            "severity": "Unknown",
            "symptoms": [],
            "possible_causes": [],
            "recommendation": content,
        }