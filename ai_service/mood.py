import re
from typing import Tuple, Dict, List

MOODS = ["calm", "happy", "anxious", "tired", "sad", "angry", "neutral"]

MOOD_KEYWORDS = {
    "calm": [
        "serene", "tranquil", "peaceful", "quiet", "still", "gentle", "relax", "flow", 
        "steady", "smooth", "soft", "light", "airy", "balanced", "centered", "composed", 
        "cool", "ease", "harmonic", "meditative", "mild", "patient", "placid", "restful", 
        "sedate", "sleepy", "soothing", "stable", "unhurried", "untroubled", "mellow"
    ],
    "happy": [
        "joy", "smile", "laugh", "excited", "bright", "sunny", "fun", "cheerful", 
        "delighted", "glad", "jolly", "merry", "playful", "radiant", "thrilled", 
        "upbeat", "wonderful", "ecstatic", "elated", "euphoric", "genial", "gleeful", 
        "gratified", "lighthearted", "lively", "optimistic", "pleased", "prosperous", 
        "rejoicing", "satisfied", "content", "ecstasy", "bliss"
    ],
    "anxious": [
        "stress", "worry", "panic", "tight", "hurry", "scared", "fast", "nervous", 
        "tense", "uneasy", "restless", "jittery", "apprehensive", "fearful", "agitated", 
        "distressed", "frantic", "jumpy", "neurotic", "perturbed", "rattled", "shaky", 
        "strained", "troubled", "vigilant", "wary", "hyper", "overstimulated", "panicky"
    ],
    "tired": [
        "exhausted", "sleepy", "drained", "heavy", "slow", "rest", "night", "fatigued", 
        "weary", "lethargic", "drowsy", "spent", "beat", "wiped", "sluggish", "inactive", 
        "listless", "overtired", "worn", "flagging", "groggy", "languid", "prostrate", 
        "sapped", "somnolent", "worn-out", "sleepyhead", "yawn"
    ],
    "sad": [
        "lonely", "dark", "cry", "blue", "lost", "empty", "hurt", "unhappy", "sorrow", 
        "grief", "depressed", "gloomy", "miserable", "heartbroken", "woeful", "dejected", 
        "desolate", "discouraged", "dismal", "dreary", "forlorn", "heartrending", 
        "lachrymose", "lugubrious", "melancholic", "pensive", "somber", "tragic", 
        "wistful", "wretched", "mourn"
    ],
    "angry": [
        "rage", "fire", "storm", "sharp", "hit", "loud", "burn", "furious", "annoyed", 
        "irritated", "mad", "bitter", "resentful", "indignant", "irate", "outraged", 
        "spiteful", "vengeful", "acrimonious", "choleric", "cross", "exasperated", 
        "hostile", "inflammatory", "infuriated", "irascible", "peevish", "piqued", 
        "surly", "wrathful", "vengeance"
    ],
}

def detect_mood(text: str) -> Tuple[str, str, Dict[str, List[str]]]:
    """
    Detects mood and intensity from text input using a deterministic keyword scoring approach.
    Returns: (mood, intensity, debug_matches)
    """
    text_lower = text.lower()
    debug_matches = {}
    scores = {mood: 0 for mood in MOODS if mood != "neutral"}
    
    for mood, keywords in MOOD_KEYWORDS.items():
        matches = []
        for kw in keywords:
            # Use regex for word boundaries and case-insensitive matching
            pattern = re.compile(rf'\b{re.escape(kw)}\b', re.IGNORECASE)
            found = pattern.findall(text_lower)
            if found:
                matches.extend(found)
        
        scores[mood] = len(matches)
        debug_matches[mood] = matches

    # Find highest score
    max_score = 0
    detected_mood = "neutral"
    
    # Check for ties or no hits
    sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    
    if sorted_scores[0][1] > 0:
        # Check if there's a tie for the top spot
        if len(sorted_scores) > 1 and sorted_scores[0][1] == sorted_scores[1][1]:
            detected_mood = "neutral"
            score_for_intensity = 0
        else:
            detected_mood = sorted_scores[0][0]
            score_for_intensity = sorted_scores[0][1]
    else:
        detected_mood = "neutral"
        score_for_intensity = 0

    # Intensity mapping
    if detected_mood == "neutral":
        intensity = "low"
    elif score_for_intensity >= 6:
        intensity = "high"
    elif score_for_intensity >= 3:
        intensity = "medium"
    else:
        intensity = "low"

    return detected_mood, intensity, debug_matches
