export interface LeaveDraft {
  date: string;
  dateDisplay: string;
  duration: string;
  reason: string;
  leaveType: string;
  balance: string;
  approver: string;
  status: 'draft';
}

export interface LeaveSubmitted {
  reference: string;
  status: string;
  expectedApproval: string;
  submittedAt: string;
  submittedDisplay: string;
  date: string;
  dateDisplay: string;
  duration: string;
  reason: string;
  leaveType: string;
  approver: string;
}

export interface ConversationContext {
  activeWorkflow: 'leave' | null;
  draftId: string | null;
  status: 'draft' | 'submitted' | null;
  draft: LeaveDraft | null;
  submitted: LeaveSubmitted | null;
  lastAction: string | null;
}

export const emptyConversationContext = (): ConversationContext => ({
  activeWorkflow: null,
  draftId: null,
  status: null,
  draft: null,
  submitted: null,
  lastAction: null,
});
