
# AI Debate Arena (AI 辩论场)

This is a web application where users can watch AI models engage in structured, multi-round debates on any given topic. The application is designed to simulate a formal debate process, providing a unique way to explore different facets of an argument.

This project is built with React, TypeScript, and Tailwind CSS, utilizing the Google Gemini API for generating AI responses.

---

## 🌟 Core Features

- **Structured Debate Format**: Debates follow a formal four-phase structure to ensure depth and fairness:
    1.  **Opening Statements (开篇立论)**: Each side presents its initial arguments and framework.
    2.  **Cross-Examination (盘问攻辩)**: A multi-round phase where sides question each other to expose logical flaws.
    3.  **Free Debate (自由辩论)**: A fast-paced, direct exchange of arguments.
    4.  **Closing Statements (总结陈词)**: Each side summarizes its position and rebuts the opponent's key points.
- **Multi-Model Support**: The UI allows users to select different AI models for the "Pro" (正方) and "Con" (反方) sides of the debate.
- **Secure API Key Configuration**: Users can provide API keys for various LLM providers (Google Gemini, OpenAI, DeepSeek, Kimi). Keys are stored securely in the browser's local storage and are never sent to any server.
- **Download Debate Transcript**: After a debate concludes, the entire transcript can be downloaded as a well-formatted Markdown (`.md`) file for easy sharing and analysis.
- **Responsive UI**: The interface is designed to work smoothly on both desktop and mobile devices.

---

## 🚀 How to Use

1.  **Configure API Keys**:
    - Click the **Settings** (⚙️) icon in the top-right corner of the setup screen.
    - In the modal, enter your API keys for the AI models you wish to use.
    - Click **Save**. The models for which you've provided keys will now appear in the selection dropdowns.
    - **Note**: *In the current environment, only the Gemini model is actively used for API calls, regardless of your selection. This is a technical constraint of the demo platform.*

2.  **Set Up the Debate**:
    - Enter a topic for the debate in the text area (e.g., "Is remote work more beneficial than in-office work?").
    - Select the desired AI model for the "Pro" side.
    - Select the desired AI model for the "Con" side.

3.  **Start the Debate**:
    - Click the **"开始辩论" (Start Debate)** button.

4.  **Observe**:
    - Watch as the AI models take turns arguing according to the structured debate flow.
    - The current phase of the debate is displayed at the top of the screen.
    - Each message is labeled with its type (e.g., "Question", "Answer") for clarity.

5.  **Download Transcript**:
    - Once the debate is finished, a **"下载辩论记录" (Download Transcript)** button will appear. Click it to save the full debate history to your device.

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **AI Model Integration**: Google Gemini API (`@google/genai`)
- **Build/Environment**: Vite (as implied by the project structure)

---

## 📁 Project Structure

```
/
├── public/
│   └── vite.svg
├── components/
│   ├── DebateSetup.tsx     # Initial setup screen component
│   ├── DebateView.tsx      # Main debate interface component
│   ├── Message.tsx         # Component for a single chat bubble
│   ├── SettingsModal.tsx   # Modal for API key configuration
│   └── Spinner.tsx         # Loading indicator component
├── services/
│   └── geminiService.ts    # Logic for interacting with the Gemini API
├── App.tsx                 # Main application component, manages state and logic
├── constants.ts            # App-wide constants (model list, debate structure)
├── index.html              # Main HTML entry point
├── index.tsx               # React application root
├── metadata.json           # Application metadata
├── types.ts                # TypeScript type definitions
└── README.md               # This file
```
