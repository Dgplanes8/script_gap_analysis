export type SupabaseInvokeHeaderOptions = {
  accessToken?: string | null;
  anonymousKey?: string | null;
  additional?: Record<string, string | undefined>;
};

export function buildSupabaseInvokeHeaders({
  accessToken,
  anonymousKey,
  additional,
}: SupabaseInvokeHeaderOptions = {}): Record<string, string> | undefined {
  const headers: Record<string, string> = {};

  if (additional) {
    for (const [key, value] of Object.entries(additional)) {
      if (value) {
        headers[key] = value;
      }
    }
  }

  if (accessToken && !headers.Authorization) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  if (anonymousKey && !headers['x-anonymous-key']) {
    headers['x-anonymous-key'] = anonymousKey;
  }

  return Object.keys(headers).length > 0 ? headers : undefined;
}
