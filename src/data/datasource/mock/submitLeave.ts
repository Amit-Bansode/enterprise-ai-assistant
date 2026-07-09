import type { LeaveSubmitted } from '@/domain/entities/ConversationContext';
import type { LeaveDraft } from '@/domain/entities/ConversationContext';

const SUBMIT_DELAY_MS = 800;

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function submitLeave(draft: LeaveDraft): Promise<LeaveSubmitted> {
  await sleep(SUBMIT_DELAY_MS);

  const submittedAt = new Date();

  return {
    reference: 'LV-2026-00127',
    status: 'Pending Manager Approval',
    expectedApproval: 'Within 24 hours',
    submittedAt: submittedAt.toISOString(),
    submittedDisplay: 'Today',
  };
}
