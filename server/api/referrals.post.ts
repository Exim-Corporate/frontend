import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async event => {
  const body = await readBody(event);
  // Basic shape validation (extend as needed)
  if (!body?.fullName || !body?.email || !body?.referredCompany) {
    return { ok: false, error: 'Invalid payload' };
  }
  // TODO: persist or notify (email / CRM). For now just acknowledge.
  return { ok: true };
});
