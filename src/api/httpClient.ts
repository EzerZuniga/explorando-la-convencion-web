const DEFAULT_TIMEOUT = 10_000;

interface RequestConfig extends RequestInit {
  timeout?: number;
  params?: Record<string, string>;
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(url: string, config: RequestConfig = {}): Promise<T> {
  const { timeout = DEFAULT_TIMEOUT, params, ...init } = config;

  // Build URL with query params
  const finalUrl = new URL(url);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      finalUrl.searchParams.append(key, value);
    });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(finalUrl.toString(), {
      ...init,
      signal: controller.signal,
      headers: {
        ...init.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new ApiError(response.status, `HTTP ${response.status}: ${response.statusText}`, errorData);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if ((error as Error).name === 'AbortError') {
      throw new ApiError(408, 'Request timed out');
    }
    throw new ApiError(0, (error as Error).message);
  } finally {
    clearTimeout(timeoutId);
  }
}

export const apiClient = {
  get: <T>(url: string, config?: RequestConfig) =>
    request<T>(url, { ...config, method: 'GET' }),

  post: <T>(url: string, body: unknown, config?: RequestConfig) =>
    request<T>(url, {
      ...config,
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json', ...config?.headers },
    }),
};

export { ApiError };
