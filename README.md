# Enterprise AI Assistant

Enterprise AI Assistant is an AI-first React Native prototype demonstrating an intent-driven orchestration pipeline, retrieval-augmented knowledge access, and dynamic GenUI rendering using a layered architecture.

![Gemini extraction — intent + entities from natural language](docs/screenshots/gemini-extraction.png)

*Natural language in → Gemini extracts structured JSON → deterministic business logic → GenUI card rendered in chat. DevTools shows the extraction prompt hitting `gemini-2.5-flash:generateContent`.*

## Stack

- React Native CLI + TypeScript
- Navigation: `@react-navigation/native`, `@react-navigation/native-stack`
- State: Zustand
- Storage: `react-native-mmkv`
- Networking: Axios
- AI: Google Gemini 2.5 Flash (REST, no SDK) via `react-native-config`
- UI: React Native Paper + Vector Icons
- Animation: Reanimated (installed, ready when needed)

## Architecture

### Layer model

```
┌─────────────────────────────────────────────┐
│              Presentation Layer             │
│  Screens • Components • Navigation • Theme  │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│             AI Orchestration Layer          │
│  processMessage • Chat Orchestrator • Store │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│             Application Pipeline            │
│                                             │
│ Intent → Action → Retrieval → Provider      │
│        → Parser → Component Factory         │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│               Data Sources                  │
│   Mock APIs • Local (MMKV) • Remote APIs    │
└─────────────────────────────────────────────┘
```

### Runtime flow

```
User
│
▼
resolveIntent()
│
├── Workflow Actions (Deterministic)
├── Gemini Extraction
└── Regex Fallback
│
▼
Business Actions
│
▼
Parser
│
▼
Factory
│
▼
Gemini Phrasing
│
▼
Presentation
```

Gemini is used **exactly twice** per user message — once for intent + entity extraction, once for friendly response phrasing. Everything else (actions, card descriptors, factory, workflow buttons) stays deterministic.

| Step | Location | Entry point |
|------|----------|-------------|
| User Prompt | `src/presentation/` | `ChatScreen` → `chatStore.sendMessage()` |
| Intent Resolution | `src/application/intents/` | `resolveIntent.ts` |
| Gemini Extraction | `src/application/provider/` | `extractIntent.ts` + `GeminiProvider.ts` |
| Business Action | `src/application/actions/` | `executeAction()` in `actions/index.ts` |
| Knowledge Retrieval | `src/application/retrieval/` | `retrieveKnowledge.ts` |
| Card Descriptors | `src/application/provider/` | `generateResponse.ts` (deterministic) |
| Gemini Phrasing | `src/application/provider/` | `phraseResponse.ts` |
| Response Parser | `src/application/parser/` | `parseResponse.ts` |
| Component Factory | `src/application/factory/` | `componentFactory.ts` |
| GenUI Renderer | `src/presentation/components/chat/` | `GenUIRenderer.tsx` |

The AI orchestration layer (`processMessage.ts`) wires the pipeline together. The parser extracts semantic descriptors from LLM output; the factory decides which React Native card components to build.

### Gemini in action

![Gemini phrasing — friendly assistant response](docs/screenshots/gemini-phrasing.png)

*Second Gemini call phrases the chat bubble. Card data (`workflow_draft`) is built deterministically from extracted entities — no regex, no SDK.*

**Example:** `Apply leave on 25th July, its my son's birthday`

1. **Extraction** → `{ intent: "apply_leave", entities: { date, reason, duration, leaveType } }`
2. **Action** → `applyLeave(entities)` saves draft to MMKV
3. **Factory** → `LeaveDraftCard` with Submit / Modify / Cancel
4. **Phrasing** → *"Got it! Your leave request for July 25..."*

Workflow button clicks (`Submit`, `Modify`, `Cancel`) bypass Gemini and use deterministic keyword detection.

## Design Principles

- Layered Architecture
- Single Responsibility Principle (SRP)
- AI-first orchestration pipeline
- Intent-driven business actions
- Semantic UI descriptors
- Factory-based GenUI rendering
- Swappable LLM providers
- Mock-first development with production-ready extension points

## Project structure

```
src/
  presentation/
    screens/
    components/
      cards/          ActionCard, InfoCard, BriefCard
      chat/           GenUIRenderer, ChatInput, MessageBubble
    navigation/
    theme/

  application/
    orchestrator/     processMessage, chatOrchestrator, chatStore
    intents/          resolveIntent, detectWorkflowAction, detectIntentFallback
    actions/          applyLeave, submitLeave, leaveWorkflow, ...
    retrieval/        retrieveKnowledge
    provider/         GeminiProvider, extractIntent, phraseResponse, generateResponse
    parser/           parseResponse
    factory/          buildComponents
    usecases/

  domain/
    entities/
    repository/

  data/
    datasource/
      mock/
      local/
      remote/
    repository/

  core/
    config/
    constants/
    storage/
    network/
    utils/

  assets/
```

## Getting started

```bash
npm install
```

### iOS setup

macOS ships with an old system Ruby (2.6) that often fails to compile CocoaPods gems. Use Homebrew Ruby instead:

```bash
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

bundle install
cd ios && bundle exec pod install && cd ..
```

Then start Metro and run the app:

```bash
npm start
npm run ios    # or npm run android
```

## Configuration

### Gemini API key

Copy `.env.example` to `.env` and set your key:

```bash
GEMINI_API_KEY=your_key_here
```

Never commit `.env`. Rebuild the native app after changing env vars (`npm run ios` / `npm run android`).

When `GEMINI_API_KEY` is set, the app uses Gemini for extraction and phrasing. Without it, the pipeline falls back to regex-based intent detection and deterministic messages.

### Backend

Set `useMockData: false` and update `apiBaseUrl` in `src/core/config/appConfig.ts` when your backend is available.

## Key entry points

| File | Purpose |
|------|---------|
| `src/application/orchestrator/processMessage.ts` | Full GenUI pipeline |
| `src/application/intents/resolveIntent.ts` | Workflow → Gemini → regex intent resolution |
| `src/application/provider/GeminiProvider.ts` | Axios REST to Gemini 2.5 Flash |
| `src/application/provider/extractIntent.ts` | Intent + entity extraction prompt |
| `src/application/provider/phraseResponse.ts` | Friendly response phrasing prompt |
| `src/application/provider/generateResponse.ts` | Deterministic descriptors + Gemini message |
| `src/application/parser/parseResponse.ts` | Extract descriptors from LLM output |
| `src/application/factory/componentFactory.ts` | Map descriptors → card components |
| `src/presentation/components/chat/GenUIRenderer.tsx` | Render factory output |
