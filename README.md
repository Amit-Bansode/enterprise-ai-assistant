# Enterprise AI Assistant

Enterprise AI Assistant is an AI-first React Native prototype demonstrating an intent-driven orchestration pipeline, retrieval-augmented knowledge access, and dynamic GenUI rendering using a layered architecture.

## Stack

- React Native CLI + TypeScript
- Navigation: `@react-navigation/native`, `@react-navigation/native-stack`
- State: Zustand
- Storage: `react-native-mmkv`
- Networking: Axios
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
User Prompt
      │
      ▼
Intent Detection
      │
      ▼
Business Action
      │
      ▼
Knowledge Retrieval (Optional)
      │
      ▼
LLM Provider
      │
      ▼
Response Parser
      │
      ▼
Component Factory
      │
      ▼
GenUI Renderer
      │
      ▼
Interactive React Native Components
```

| Step | Location | Entry point |
|------|----------|-------------|
| User Prompt | `src/presentation/` | `ChatScreen` → `chatStore.sendMessage()` |
| Intent Detection | `src/application/intents/` | `detectIntent.ts` |
| Business Action | `src/application/actions/` | `actionEngine.ts` |
| Knowledge Retrieval | `src/application/retrieval/` | `retrieveKnowledge.ts` |
| LLM Provider | `src/application/provider/` | `generateResponse.ts` |
| Response Parser | `src/application/parser/` | `parseResponse.ts` |
| Component Factory | `src/application/factory/` | `componentFactory.ts` |
| GenUI Renderer | `src/presentation/components/chat/` | `GenUIRenderer.tsx` |

The AI orchestration layer (`processMessage.ts`) wires the pipeline together. The parser extracts semantic descriptors from LLM output; the factory decides which React Native card components to build.

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
    intents/          detectIntent
    actions/          actionEngine, applyLeave, generateMorningBrief, ...
    retrieval/        retrieveKnowledge
    provider/         generateResponse (LLM boundary)
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

Set `useMockData: false` and update `apiBaseUrl` in `src/core/config/appConfig.ts` when your backend is available.

## Key entry points

| File | Purpose |
|------|---------|
| `src/application/orchestrator/processMessage.ts` | Full GenUI pipeline |
| `src/application/provider/generateResponse.ts` | LLM boundary (mock structured JSON today) |
| `src/application/parser/parseResponse.ts` | Extract descriptors from LLM output |
| `src/application/factory/componentFactory.ts` | Map descriptors → card components |
| `src/presentation/components/chat/GenUIRenderer.tsx` | Render factory output |
