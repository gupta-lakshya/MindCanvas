from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, List
import uvicorn
import time
from collections import defaultdict
from dotenv import load_dotenv
<<<<<<< HEAD
import base64
=======

>>>>>>> d72a015a87c0bc25652fa3d25c6512aed96d0cbf
# Load environment variables at startup
load_dotenv()

# Internal modules
from mood import detect_mood
from prompting import build_prompts
from image_gen import generate_one_image

app = FastAPI(title="MindCanvas AI Service", version="1.1.0")

# CORS Support for Hackathon Integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-Memory Throttling: 10 requests per minute per IP
request_history: Dict[str, List[float]] = defaultdict(list)

def check_throttling(request: Request):
    client_ip = request.client.host if request.client else "127.0.0.1"
    now = time.time()
    
    # Filter out requests older than 1 minute
    request_history[client_ip] = [t for t in request_history[client_ip] if now - t < 60]
    
    if len(request_history[client_ip]) >= 10:
        raise HTTPException(status_code=429, detail="Too many requests. Please wait a minute.")
    
    request_history[client_ip].append(now)

class GenerateRequest(BaseModel):
    text: str
    user_avatar_seed: Optional[int] = None

class GenerateResponse(BaseModel):
    mood: str
    intensity: str
    prompt: str
    negative_prompt: str
    image_base64: str

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/ai/generate", response_model=GenerateResponse, dependencies=[Depends(check_throttling)])
async def generate_artwork(req: GenerateRequest, request: Request):
    """
    Analyzes user text, detects mood, creates an artistic prompt, 
    and generates an image based on the sentiment of the input.
    """
    start_time = time.perf_counter()
    
    # 1. Validate & Truncate Input
    input_text = req.text.strip()
    if not input_text:
        raise HTTPException(status_code=422, detail="Text cannot be empty or just whitespace.")
    
    # Truncate to 2000 chars safely
    truncated_text = input_text[:2000]

    # 2. Mood Detection
    mood, intensity, debug_matches = detect_mood(truncated_text)

    # 3. Prompt Building
    prompt_data = build_prompts(truncated_text, mood, intensity, req.user_avatar_seed)
    prompt = prompt_data["prompt"]
    neg_prompt = prompt_data["negative_prompt"]

    # 4. Image Generation
    try:
        image_base64 = generate_one_image(prompt, neg_prompt, seed=req.user_avatar_seed or 0)
<<<<<<< HEAD
        image_data = base64.b64decode(image_base64)

=======
        
>>>>>>> d72a015a87c0bc25652fa3d25c6512aed96d0cbf
        # Calculate Latency
        latency_ms = int((time.perf_counter() - start_time) * 1000)
        
        # Structured Logging
        print(f"[REQUEST] IP: {request.client.host} | Mood: {mood} | Intensity: {intensity} | Seed: {req.user_avatar_seed} | Latency: {latency_ms}ms")
<<<<<<< HEAD
        with open(f"frontend/public/{input_text}.jpg", "wb") as image_file:
            image_file.write(image_data)
=======
>>>>>>> d72a015a87c0bc25652fa3d25c6512aed96d0cbf

        return GenerateResponse(
            mood=mood,
            intensity=intensity,
            prompt=prompt,
            negative_prompt=neg_prompt,
            image_base64=image_base64
        )
    except HTTPException as e:
        # Re-raise detailed errors (like 502 from Stability)
        raise e
    except Exception as e:
        # Timeout handling
        if "timeout" in str(e).lower():
            raise HTTPException(status_code=504, detail="Image generation engine timed out.")
        raise HTTPException(status_code=500, detail=f"Internal production error: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
