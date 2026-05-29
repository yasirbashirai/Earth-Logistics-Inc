/**
 * Shared client-side form submission helper.
 *
 * Posts JSON to the PHP mail handlers that ship in /api on the
 * production (Bluehost / Apache) server. Endpoints are relative,
 * so the same build works on any domain.
 *
 * Override per-environment with NEXT_PUBLIC_FORM_API_BASE if the
 * /api folder ever moves (defaults to same-origin "/api").
 */

const API_BASE = (process.env.NEXT_PUBLIC_FORM_API_BASE || "/api").replace(/\/$/, "");

export type FormEndpoint = "contact" | "quote" | "carrier" | "apply";

export interface SubmitResult {
  ok: boolean;
  message?: string;
  error?: string;
}

export async function submitForm(
  endpoint: FormEndpoint,
  payload: Record<string, unknown>,
): Promise<SubmitResult> {
  try {
    const res = await fetch(`${API_BASE}/${endpoint}.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    // PHP handlers always answer JSON; guard against HTML error pages.
    let data: SubmitResult | null = null;
    try {
      data = (await res.json()) as SubmitResult;
    } catch {
      data = null;
    }

    if (res.ok && (!data || data.ok !== false)) {
      return { ok: true, message: data?.message };
    }
    return {
      ok: false,
      error:
        data?.error ||
        `We couldn't send your message (error ${res.status}). Please call 855-456-4424.`,
    };
  } catch {
    return {
      ok: false,
      error:
        "Network error — please check your connection or call dispatch at 855-456-4424.",
    };
  }
}

/** Serialise a <form> into a plain object, skipping the honeypot's noise. */
export function formToObject(form: HTMLFormElement): Record<string, string> {
  const fd = new FormData(form);
  const obj: Record<string, string> = {};
  fd.forEach((value, key) => {
    obj[key] = typeof value === "string" ? value : "";
  });
  return obj;
}
