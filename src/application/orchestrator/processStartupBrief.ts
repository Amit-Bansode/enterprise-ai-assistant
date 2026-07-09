import { generateMorningBrief } from '@/application/actions/generateMorningBrief';
import type { ActionContext } from '@/application/actions/types';
import { buildComponents } from '@/application/factory/componentFactory';
import type { UIComponent } from '@/application/factory/types';
import type { DetectedIntent } from '@/application/intents/types';
import { parseResponse } from '@/application/parser/parseResponse';
import { generateMorningBriefResponse } from '@/application/provider/generateResponse';

export interface StartupBriefResult {
  assistantMessage: string;
  components: UIComponent[];
  intent: DetectedIntent;
}

const startupIntent: DetectedIntent = {
  intent: 'daily_brief',
  confidence: 1,
  rawText: '',
  slots: {},
};

export async function processStartupBrief(): Promise<StartupBriefResult> {
  const context: ActionContext = {
    userMessage: '',
    intent: startupIntent,
  };

  await generateMorningBrief(context);

  const aiResponse = generateMorningBriefResponse();
  const parsed = parseResponse(aiResponse);
  const components = buildComponents(parsed.descriptors);

  return {
    assistantMessage: parsed.messageText,
    components,
    intent: startupIntent,
  };
}
