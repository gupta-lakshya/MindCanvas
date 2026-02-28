# MindCanvas AI Service Backend

This is a FastAPI-based backend for **MindCanvas**, an application that turns thoughts into art. 
It analyzes the mood and intensity of a user's text and generates a unique, artistic image that represents that feeling.

## Prerequisites

- [Python 3.9+](https://www.python.org/downloads/)
- [Venv](https://docs.python.org/3/library/venv.html) (Recommended)

## Getting Started

1. **Create and Activate a Virtual Environment** (Optional but recommended):
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```

2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Server**:
   ```bash
   uvicorn main:app --reload
   # Or run main.py directly
   python main.py
   ```

The API will be available at `http://localhost:8000`. 
Interactive documentation (Swagger UI) can be accessed at `http://localhost:8000/docs`.

## API Documentation

### POST `/ai/generate`
Generates an artistic prompt and image from user text.

**Request Body** (`application/json`):
```json
{
  "text": "I feel so happy today, like I'm walking on sunshine!",
  "user_avatar_seed": 123456
}
```

**Response** (`application/json`):
```json
{
  "mood": "happy",
  "intensity": "high",
  "prompt": "I feel so happy today, like I'm walking on sunshine!, vibrant colors, joyful impressionism...",
  "negative_prompt": "low resolution, text, watermark, blurry...",
  "image_base64": "/9j/4AAQSkZJRgABAQAAAQABAAD/..."
}
```

### GET `/health`
Check if the service is alive.

**Response**:
```json
{ "status": "ok" }
```

## Environment Variables

The service requires the following environment variables in a `.env` file:

- `STABILITY_API_KEY`: Your Stability AI API key.

## Internal Architecture

- `main.py`: Entry point for FastAPI and routing. Orchestrates logic.
- `mood.py`: Detection logic based on keyword mapping.
- `prompting.py`: Prompt builder for Stable Diffusion style output.
- `image_gen.py`: Client for image generation using Stability AI SD3 API.

---
*Developed for the MindCanvas Hackathon Project.*
