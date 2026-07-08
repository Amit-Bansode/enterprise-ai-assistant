# Enterprise AI Assistant

An AI-first enterprise assistant where employees interact through natural language instead of navigating multiple enterprise applications. The assistant understands user intent, retrieves enterprise knowledge, executes business workflows, and dynamically renders interactive GenUI components inside the conversation.

## Stack

- React Native CLI + TypeScript
- Navigation: `@react-navigation/native`, `@react-navigation/native-stack`
- State: Zustand
- Storage: `react-native-mmkv`
- Networking: Axios
- UI: React Native Paper + Vector Icons
- Animation: Reanimated (installed, ready when needed)

## Architecture

```
+------------------------+
|    Presentation        |
|  screens, components   |
|  navigation, theme     |
+------------------------+
            │
+------------------------+
|   AI Orchestrator      |
|  processMessage.ts     |
|  chatOrchestrator.ts   |
|  chatStore.ts          |
+------------------------+
            │
+------------------------+
| Intent → Action        |
| Retrieval → Provider   |
| Parser → Factory       |
+------------------------+
            │
+------------------------+
| Data Sources           |
| mock / local / remote  |
+------------------------+
```

### Layer responsibilities

| Layer | Location | Role |
|-------|----------|------|
| **Presentation** | `src/presentation/` | Screens, GenUI cards, navigation, theme. Consumes built components from the orchestrator via Zustand. |
| **AI Orchestrator** | `src/application/orchestrator/` | Coordinates the full message pipeline and bridges results to the UI store. |
| **Intent → Action** | `src/application/intents/`, `src/application/actions/` | Detect intent and route to enterprise actions (leave, brief, knowledge search, resume work). |
| **Retrieval → Provider** | `src/application/retrieval/`, `src/application/provider/` | Fetch knowledge when needed, then call the LLM provider for a structured response. |
| **Parser → Factory** | `src/application/parser/`, `src/application/factory/` | Parser extracts semantic descriptors from LLM JSON; factory decides which React card components to build. |
| **Data Sources** | `src/data/`, `src/domain/` | Repository pattern over mock, local (MMKV), and remote (Axios) datasources. |

### Message processing pipeline

```
User Message
      │
      ▼
Intent Router          detectIntent()
      │
      ▼
Action                 executeAction()
      │
      ▼
Knowledge Retriever    retrieveKnowledge()  (optional)
      │
      ▼
LLM Provider           generateAIResponse() → { message, descriptors }
      │
      ▼
Parser                 parseResponse()      → ComponentDescriptor[]
      │
      ▼
Component Factory      buildComponents()    → BuiltComponent[]
      │
      ▼
React Components       GenUIRenderer        → ActionCard | InfoCard | BriefCard
```

**Parser vs factory:** the parser only extracts semantic data from LLM output. The factory owns all UI decisions — which card type to render and with what props.

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
    provider/         generateAIResponse (LLM boundary)
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
