import os
import requests
from fastapi import HTTPException
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

STABILITY_API_URL = "https://api.stability.ai/v2beta/stable-image/generate/sd3"

def generate_one_image(prompt: str, negative_prompt: str, seed: int = 0) -> str:
    """
    Generate an image using the Stability AI SD3 API.
    Returns: base64 png string (without data URI prefix)
    """
    api_key = os.getenv("STABILITY_API_KEY")
<<<<<<< HEAD

    # If the API key is not set, return a harmless placeholder image (base64)
    # to avoid 500s during local development. Log a clear message so the
    # developer knows to configure the API key for real image generation.
    if not api_key or api_key == "your_key_here":
        print("[Stability AI] WARNING: STABILITY_API_KEY missing; returning placeholder image.")
        # 1x1 transparent PNG
        placeholder_base64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
        return placeholder_base64
=======
    
    if not api_key or api_key == "your_key_here":
        raise HTTPException(
            status_code=500, 
            detail="STABILITY_API_KEY is missing or invalid in .env file."
        )
>>>>>>> d72a015a87c0bc25652fa3d25c6512aed96d0cbf

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Accept": "application/json"
    }

    # SD3 Request Parameters
    # Note: SD3 uses multipart/form-data for many of its endpoints
    # For JSON-based stability APIs, we use standard body. 
    # However, for v2beta/sd3, it often expects multipart.
    
    files = {
        "prompt": (None, prompt),
        "negative_prompt": (None, negative_prompt),
        "aspect_ratio": (None, "1:1"), # Target 768x768 implies 1:1
        "seed": (None, str(seed))
    }

    print(f"[Stability AI] Generating with SD3: prompt='{prompt[:50]}...', seed={seed}")

    try:
        response = requests.post(
            STABILITY_API_URL,
            headers=headers,
            files=files,
            timeout=30.0
        )

        if response.status_code == 200:
            response_json = response.json()
<<<<<<< HEAD
            # Different Stability endpoints may return varied structures; try common keys.
            if isinstance(response_json, dict):
                # prefer 'image' key if present
                if "image" in response_json:
                    return response_json["image"]
                # some SDKs return 'artifacts' with base64 inside
                if "artifacts" in response_json and isinstance(response_json["artifacts"], list):
                    first = response_json["artifacts"][0]
                    if isinstance(first, dict) and "base64" in first:
                        return first["base64"]
            raise HTTPException(status_code=500, detail="Image engine returned no image in response.")
=======
            if "image" in response_json:
                return response_json["image"]
            else:
                raise HTTPException(status_code=500, detail="Image engine returned no image in response.")
>>>>>>> d72a015a87c0bc25652fa3d25c6512aed96d0cbf
        else:
            # Error handling for non-200 responses
            try:
                error_detail = response.json()
            except:
                error_detail = response.text
                
            print(f"[Stability AI] API Error {response.status_code}: {error_detail}")
            raise HTTPException(
                status_code=502, 
                detail=f"Stability AI API error: {error_detail}"
            )

    except requests.exceptions.RequestException as e:
        print(f"[Stability AI] Connection Error: {str(e)}")
        raise HTTPException(status_code=503, detail=f"Failed to connect to Stability AI: {str(e)}")
