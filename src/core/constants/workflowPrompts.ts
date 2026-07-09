export const LEAVE_DRAFT_PROMPTS = {
  submit: 'Submit leave draft',
  modify: 'Modify leave draft',
  cancel: 'Cancel leave request',
} as const;

export const LEAVE_MODIFY_PROMPTS = {
  changeDate: 'Change the leave date',
  changeDuration: 'Change the leave duration',
  changeReason: 'Change the leave reason',
  changeLeaveType: 'Change the leave type',
} as const;

export const LEAVE_MODIFY_EXAMPLES = [
  'Change it to 26 July',
  'Make it half day',
  'Reason is doctor appointment',
] as const;

export const LEAVE_SUCCESS_PROMPTS = {
  viewStatus: 'View leave status',
  done: 'Done',
} as const;

export const LEAVE_STATUS_PROMPTS = {
  refresh: 'Refresh leave status',
  cancelRequest: 'Cancel leave request',
} as const;
