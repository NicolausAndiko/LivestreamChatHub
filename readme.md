# Livestream Chat Hub

<p align="center">
  <img src="assets/icon.ico" width="128">
</p>

<p align="center">
  <b>Multi-platform Livestream Chat Aggregator & OBS Overlay</b><br>
  Combine live chats from multiple streaming platforms into a single overlay.
</p>

---

## Features

### Multi-platform Chat

- ✅ YouTube Live Chat
- ✅ Twitch Chat
- 🚧 TikTok (Coming Soon)
- 🚧 Kick (Planned)
- 🚧 NimoTV (Planned)

---

### OBS Overlay

- Lightweight local overlay server
- Browser Source compatible
- Transparent background
- Animated messages
- Platform icons
- YouTube Member badges
- Native Twitch emotes
- Custom GIF / Emote Manager

---

### Emote Manager

- Local GIF reactions
- Keyword-based trigger
- Easy management
- No coding required

Example

```
IWAK
↓
fish-spin.gif
```

---

### Overlay Server

Built-in overlay server.

```
http://localhost:3000
```

Simply add it as a Browser Source inside OBS Studio.

---

### Overlay Customization

Customize your own overlay using CSS.

(Currently under development.)

---

## Screenshots

### Main Window

> Add screenshot here

```
docs/main-window.png
```

### OBS Overlay

> Add screenshot here

```
docs/overlay.png
```

---

## Installation

### Requirements

- Windows 10 / Windows 11
- OBS Studio (optional)

---

### Run

Download the latest portable release.

Run

```
Livestream Chat Hub.exe
```

No installation required.

---

## Supported Platforms

| Platform | Status |
|----------|--------|
| YouTube | ✅ |
| Twitch | ✅ |
| TikTok | 🚧 |
| Kick | 🚧 |
| NimoTV | 🚧 |

---

## Project Structure

```
src/

├── connector/
│   ├── youtube/
│   ├── twitch/
│   └── ...
│
├── core/
│
├── server/
│
├── service/
│
└── ui/

render/

assets/

```

---

## Technologies

- Electron
- Express
- Socket.IO
- youtubei.js
- tmi.js

---

## Roadmap

### Version 3.0

- [x] YouTube
- [x] Twitch
- [x] Native Twitch Emotes
- [x] Local Emote Manager
- [x] Overlay Server

---

### Next

- [ ] TikTok Connector
- [ ] Kick Connector
- [ ] CSS Editor
- [ ] Overlay Preview
- [ ] Better Badge System

---

## License

MIT License

---

## Author

Developed by **ItsPacoyHere**

GitHub:
https://github.com/nicolausandiko

---

***This project is fully AI-generated. All code was produced with AI assistance, and I do not claim authorship of the AI-generated portions.***
