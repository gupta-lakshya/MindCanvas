import re
from typing import Dict, Optional

# Safety trigger keywords (violence, self-harm)
SAFETY_KEYWORDS = [
    "kill", "death", "suicide", "harm", "hurt myself", "cut", "bleed", "blood", 
    "weapon", "gun", "knife", "stab", "murder", "violence", "aggressive", "hit", "attack"
]

# Fixed base visual style
BASE_STYLE = (
    "soft pastel color palette, rounded cartoon characters, minimal background clutter, "
    "gentle lighting, clear facial expression, simple comic illustration style, "
    "one single scene, no text bubbles, no logos or watermark, no photorealism"
)

# Mood-specific conditioning
MOOD_CONDITIONING = {
    "happy": "warm gentle smile, bright soft daylight, open body posture",
    "calm": "relaxed posture, serene environment, balanced lighting",
    "anxious": "subtle worried expression, cozy safe indoor space, calming objects like plants or soft blanket",
    "tired": "sleepy eyes, warm blanket, evening or sunset light",
    "sad": "teary eyes but comforted, hopeful tone, soft rain outside window",
    "angry": "contained frustration, no aggression, characters seated apart peacefully",
    "neutral": "everyday scene, emotionally balanced"
}

# Negative prompt
NEGATIVE_PROMPT_BASE = (
    "photorealistic, high contrast, gore, horror, violence, blood, "
    "weapons, scary, disturbing, text, watermark, logo, "
    "cluttered background, sharp lines, flashing lights"
)

def build_prompts(text: str, mood: str, intensity: str, user_avatar_seed: Optional[int] = None) -> Dict[str, str]:
    """
    Builds a Stable Diffusion prompt based on text, mood, and intensity with safety overrides.
    Returns: {"prompt": final_prompt_string, "negative_prompt": negative_prompt_string}
    """
    text_lower = text.lower()
    
    # 1. Safety Rewrite Rule
    is_unsafe = any(re.search(rf'\b{re.escape(kw)}\b', text_lower) for kw in SAFETY_KEYWORDS)
    
    if is_unsafe:
        mood = "calm"
        safety_override = "symbolic abstract safe depiction, no literal harm"
    else:
        safety_override = ""

    # 2. Intensity Handling
    if intensity == "high":
        intensity_desc = "stronger expression, safe and non-dramatic"
    elif intensity == "medium":
        intensity_desc = "noticeable but calm expression"
    else:
        intensity_desc = "very subtle expression"

    # 3. Assemble Final Prompt
    mood_style = MOOD_CONDITIONING.get(mood, MOOD_CONDITIONING["neutral"])
    
    # Format the final prompt
    final_prompt = (
        f"{BASE_STYLE}. {mood_style}. {intensity_desc}. "
        f"A scene reflecting: '{text}'. {safety_override}"
    ).replace("..", ".").strip()

    return {
        "prompt": final_prompt,
        "negative_prompt": NEGATIVE_PROMPT_BASE
    }
