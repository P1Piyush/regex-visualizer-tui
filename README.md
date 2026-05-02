# regex-visualizer-tui 🔍

> Understand and debug complex regex patterns visually in the terminal.

Stop staring at backslashes. `regex-visualizer-tui` breaks down your regular expressions into human-readable parts and lets you test them instantly.

## 🚀 Quick Start

### Installation
```bash
npm install -g regex-visualizer-tui
```

### Usage
Visualize a pattern:
```bash
regex-visualizer "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
```

Test against a string:
```bash
regex-visualizer "\d{3}-\d{3}-\d{4}" "Call me at 555-019-9988"
```

## ✨ Features
- **Smart Breakdown:** Explains quantifiers, character classes, and anchors.
- **Instant Testing:** See your matches highlighted in real-time.
- **Terminal-Native:** Fast, colorful, and zero-config.

## 📄 License
MIT
