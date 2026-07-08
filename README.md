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

## Project structure

```
src/
  presentation/     screens, components, navigation, theme
  application/      orchestrator, intents, actions, retrieval, provider, parser, factory
  domain/           entities, repository interfaces
  data/             mock/local/remote datasources + repository impl
  core/             config, constants, storage, network, utils
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

## Architecture notes

Message processing pipeline:

```
User Message → Intent Router → Action → Knowledge Retriever (optional)
  → LLM Provider → Parser → Component Descriptors
  → Component Factory → React Components
```

- `application/orchestrator/processMessage.ts` runs the full GenUI pipeline.
- `application/provider/generateResponse.ts` is the LLM boundary and returns structured JSON.
- `application/parser/parseResponse.ts` only extracts `message` + semantic `descriptors` from LLM output.
- `application/factory/componentFactory.ts` maps descriptor kinds to concrete card components.
- `presentation/components/chat/GenUIRenderer.tsx` renders factory-built components.
- `data/repository` switches between mock and remote sources via `src/core/config/appConfig.ts`.
- `presentation` stays thin: screens consume Zustand store and render Paper components.

Set `useMockData: false` and update `apiBaseUrl` when your backend is available.
