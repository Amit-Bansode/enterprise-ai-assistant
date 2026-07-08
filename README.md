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
  application/      orchestrator, intents, parser, factory, usecases
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

- `application/orchestrator` coordinates intent parsing, use cases, and GenUI factory output.
- `data/repository` switches between mock and remote sources via `src/core/config/appConfig.ts`.
- `presentation` stays thin: screens consume Zustand store and render Paper components.

Set `useMockData: false` and update `apiBaseUrl` when your backend is available.
