# Digital-Clock
# 04 · Digital Clock ⏰

A real-time digital clock with a retro terminal aesthetic — glowing neon display, live seconds progress bar, timezone detection, and 5 colour themes.

---

## ✨ Features

- Live HH : MM : SS display with blinking colons
- Day + date display
- Animated seconds progress bar
- 5 switchable neon colour themes (Green · Blue · Purple · Red · Gold)
- Auto timezone detection
- Retro scanline overlay effect

---

## 📁 Project Structure

```
04-digital-clock/
├── vanilla/
│   └── index.html          # Single-file, no build needed
├── react/
│   └── DigitalClock.jsx    # Drop-in React component
├── python/
│   └── clock.py            # Tkinter desktop app
└── README.md
```

---

## 🚀 Getting Started

### Vanilla (HTML/CSS/JS)

```bash
# Just open in browser — no install needed
open vanilla/index.html
```

### React

```bash
npx create-react-app digital-clock
# Copy DigitalClock.jsx into src/
# Add to App.js:
import DigitalClock from './DigitalClock';
function App() { return <DigitalClock />; }
```

> **Fonts:** Add to `public/index.html` `<head>`:
> ```html
> <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=Share+Tech+Mono&display=swap" rel="stylesheet">
> ```

### Python

```bash
# Python 3.x + tkinter (included in standard library)
python python/clock.py
```

---

## 🛠 Tech Stack

| Version  | Language       | Libraries / APIs       |
|----------|----------------|------------------------|
| Vanilla  | HTML/CSS/JS    | `Date`, `Intl`         |
| React    | JSX            | `useState`, `useEffect`|
| Python   | Python 3       | `tkinter`, `datetime`  |

---

## 📸 Preview

```
MONDAY · JUN 15, 2026

    14:35:22

[██████████████████░░░░░░░] SEC 22
```

---

## 📄 License

MIT — free to use, fork, and extend.
