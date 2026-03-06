# MindCanvas

MindCanvas is a visual journaling platform that transforms daily experiences into AI-generated comic strips. Instead of relying on text-heavy journaling, the platform converts short user inputs into visual memory panels that can be revisited later through a timeline.

The project focuses on accessibility and cognitive comfort, especially for users who find traditional journaling difficult due to memory challenges, emotional overload, or neurodivergent thinking styles.

---

## Overview

Most journaling tools assume users can consistently write long entries and recall events clearly. In reality, many people struggle with blank-page anxiety, inconsistent journaling habits, or difficulty reconnecting with written memories later.

MindCanvas addresses this by shifting journaling from **text recall to visual recognition**.

Users simply describe a moment from their day, optionally tag emotions, and the system converts that memory into a short comic strip using AI. These visual memories are stored in a timeline that allows users to revisit their past experiences more naturally.

---

## Key Features

- Simple journaling interface with minimal input friction  
- Emotion tagging to capture emotional context  
- AI-generated comic panels representing memories  
- Visual timeline for revisiting past experiences  
- Edit and regenerate memories  
- Privacy-focused design with user-controlled data  

---

## How It Works

1. User writes a short journal entry.
2. The system extracts emotional context and key elements from the text.
3. AI generates prompts based on the interpreted memory.
4. Stability AI SD3 generates comic-style panels.
5. Panels are stored and displayed in a visual timeline.

This process allows users to **recognize memories visually rather than recall them through text.**

---

## Architecture

The project uses a hybrid architecture with a modern web frontend and a Python AI backend.

```
User Input
    ↓
Next.js Frontend
    ↓
FastAPI AI Backend
    ↓
Mood Detection + Prompt Generation
    ↓
Stability AI SD3 Image Generation
    ↓
Generated Comic Panels
    ↓
Timeline Storage and Display
```

---

## Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Radix UI primitives
- Lucide Icons

### Backend
- FastAPI
- Python

### AI Pipeline
- Deterministic mood detection
- Prompt engineering
- Stability AI SD3 image generation

### Tooling
- ESLint
- PostCSS
- Node/npm or pnpm

---

## Project Structure

```
mindcanvas
│
├─ app/                # Next.js app router pages
│
├─ components/         # UI components
│   ├─ dropdown-menu
│   ├─ popover
│   ├─ sheet
│   ├─ calendar
│   └─ button
│
├─ lib/                # utility functions
│
├─ backend/
│   ├─ main.py         # FastAPI server
│   ├─ mood.py         # mood detection
│   ├─ prompting.py    # prompt engineering
│   └─ image_gen.py    # image generation
│
├─ styles/
│   └─ globals.css
│
├─ next.config.ts
├─ postcss.config.mjs
├─ eslint.config.mjs
└─ package.json
```

---

## Environment Variables

You will need a Stability AI API key.

Create a `.env` file:

```
STABILITY_API_KEY=your_api_key_here
```

---

## Example Workflow

1. User writes:  
   *"Today was exhausting, but talking to my friend made me feel better."*

2. Mood detection identifies emotional tone.

3. Prompt engineering converts the entry into scene prompts.

4. Stability AI generates comic panels.

5. Panels are shown to the user and saved in the timeline.

---

## Future Improvements

- On-device AI inference for privacy
- Voice journaling support
- Emotion-based memory search
- Multi-panel storytelling improvements
- Offline-first journaling
- Accessibility improvements

---

## Why This Project Exists

MindCanvas explores how AI and thoughtful UX design can help people reconnect with their memories without requiring long written reflections. It focuses on creating a calm, accessible environment for preserving personal experiences.

---

## License

MIT License
