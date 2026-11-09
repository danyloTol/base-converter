# 🔢 BaseConverter

An elegant, fast, and responsive numeral system calculator built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Vite**. 

Seamlessly convert whole and floating-point numbers in real-time between **Binary**, **Octal**, **Decimal**, and **Hexadecimal** representations.

---

## ✨ Features

- **⚡ Instant Real-Time Conversion**: Calculations update automatically as you type with zero latency.
- **🔄 Bidirectional Base Swapping**: Swap "From" and "To" bases with a single click while automatically keeping your converted values intact.
- **📊 Live Multi-Base Overview**: View entered values converted simultaneously across all 4 numeral systems (Binary, Octal, Decimal, Hexadecimal).
- **🎯 Fractional & Floating-Point Support**: Full support for fractional radix math (e.g., `10.5` in decimal converts accurately to `10.1` in binary).
- **⚠️ Real-Time Input Validation**: Identifies illegal characters for the active base (e.g. entering `9` in octal or letters in decimal) and provides clear user hints.
- **📋 One-Click Copy to Clipboard**: Quickly copy results with immediate visual feedback (`Copied!`).
- **🌓 Dark & Light Mode**: Clean, high-contrast theme switcher with automatic preference detection and `localStorage` persistence.
- **📱 Fully Responsive**: Built for all screen sizes from mobile phones to high-resolution desktop displays.
- **🎲 Interactive Data Stream**: Sleek ambient cyberpunk-styled binary bit stream in the header.

---

## 📐 Supported Numeral Systems

| System | Radix (Base) | Allowed Digits / Characters | Example |
| :--- | :--- | :--- | :--- |
| **Binary** | Base 2 | `0, 1` | `101010` (`42`) |
| **Octal** | Base 8 | `0, 1, 2, 3, 4, 5, 6, 7` | `52` (`42`) |
| **Decimal** | Base 10 | `0 - 9` | `42` |
| **Hexadecimal** | Base 16 | `0 - 9, A - F` (case-insensitive) | `2A` (`42`) |

---

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Linting & Code Quality**: [Oxlint](https://oxc.rs/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher recommended) and **npm** installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/danyloTol/base-converter.git
   cd base-converter
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `npm run dev` | Starts Vite dev server with hot module replacement (HMR). |
| `build` | `npm run build` | Compiles TypeScript (`tsc -b`) and bundles for production with Vite. |
| `preview` | `npm run preview` | Locally preview the production build in `./dist`. |
| `lint` | `npm run lint` | Runs `oxlint` for high-performance code linting. |

---

## 📁 Project Structure

```text
base-converter/
├── public/                 # Static assets & icons
├── src/
│   ├── components/         # UI components
│   │   ├── BinaryStream.tsx    # Live animated header stream
│   │   ├── DropDownList.tsx    # Accessible radix selector dropdown
│   │   ├── InputBox.tsx        # Validated input with clear button
│   │   ├── Modal.tsx           # Backdrop-blurred feedback modal
│   │   └── OutputBox.tsx       # Formatted output with copy action
│   ├── styles/             # Global styles and animations
│   │   └── styles.css
│   ├── utils/              # Business logic & utilities
│   │   ├── ConversionLogic.tsx # Radix conversion algorithms (int & frac)
│   │   └── ThemeToggle.tsx     # Theme switcher with localStorage sync
│   ├── App.tsx             # Main application layout & state
│   └── main.tsx            # Application entry point
├── index.html
├── package.json
└── vite.config.ts
```

---

## 👤 Author

**Danylo Tolochko**

- GitHub: [@danyloTol](https://github.com/danyloTol)
- LinkedIn: [Danylo Tolochko](https://www.linkedin.com/in/danylo-tolochko-aa43b1417/)
- Email: [tolochkodanylo.dev@gmail.com](mailto:tolochkodanylo.dev@gmail.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
