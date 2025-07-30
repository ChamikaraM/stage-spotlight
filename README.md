# 📦 stage-spotlight

> A lightweight JavaScript utility to create a spotlight effect that follows the mouse pointer great for immersive presentations, portfolio sites, or interactive storytelling.

---

## ✨ Demo

[stage-spotlight](https://chamikaram.github.io/stage-spotlight/)

---

## 🚀 Installation

```bash
npm install stage-spotlight
```

---

## 🛠️ Usage

### Basic example:

```js
import { initStageSpotlight, destroyStageSpotlight } from "stage-spotlight";

initStageSpotlight();
```

### With custom options:

```js
initStageSpotlight({
  spotlightRadius: 250,
  darknessOpacity: 0.8,
  blur: 120,
  lightColor: "#ffcc00",
  followSpeed: 0.1
});
```

### Destroy the spotlight:

```js
destroyStageSpotlight();
```

---

## ⚙️ Options

| Option            | Type     | Default     | Description |
|-------------------|----------|-------------|-------------|
| `spotlightRadius` | `number` | `180`       | Radius of the spotlight in pixels |
| `darknessOpacity` | `number` | `0.7`       | Background darkness (0 to 1) |
| `blur`            | `number` | `150`       | Blur effect for smooth gradient edge |
| `lightColor`      | `string` | `"#ffffff"` | Color of the spotlight |
| `followSpeed`     | `number` | `0.12`      | How fast the spotlight follows the mouse |
| `zIndex`          | `number` | `9999`      | Layer position of the spotlight canvas |

---

## ✅ Features

- Lightweight and dependency-free
- Smooth spotlight animation
- Customizable via options
- Non-intrusive — doesn’t block pointer events
- Darkens rest of the screen for dramatic focus

---

## 📄 License

MIT © [Chamikara M.](https://github.com/ChamikaraM)

---

## 🐞 Issues & Contributions

Found a bug or have an idea?  
Please open an issue or PR here:  
👉 [GitHub Repository](https://github.com/ChamikaraM/stage-spotlight)