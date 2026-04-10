/**
 * Resilient Server-Side API Wrapper
 * Handles: Retries, BaseURL resolution (Docker/Local), and Robust Error Parsing.
 */

const MAX_RETRIES = 3;
const BASE_RETRY_DELAY = 1000; // 1 second

export async function serverApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // 1. Resolve logical API base URL
  // 'http://server:3001' is for internal Docker communication
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  
  // Note: For pure internal SSR, we usually use the service name if in Docker.
  // We can override this via an env var if needed.
  const apiBase = process.env.INTERNAL_API_URL || baseUrl;
  
  const url = `${apiBase}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  let lastError: any;

  // 2. Execution Loop with Retries
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        // In Next.js SSR, we often want to handle caching differently
        next: { 
          revalidate: 60, // Default cache 1 minute, can be overridden in options
          ...options.next 
        } as any,
      });

      // 3. Status Code Check
      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }

        const error = new Error(errorData.message || `API Failure: ${response.status}`);
        (error as any).status = response.status;
        (error as any).data = errorData;
        
        throw error;
      }

      // 4. Success Parse
      return (await response.json()) as T;

    } catch (error: any) {
      lastError = error;

      // Do NOT retry on 4xx Client Errors (except 408 Timeout or 429 Too Many Requests)
      const status = error.status;
      if (status && status >= 400 && status < 500 && status !== 408 && status !== 429) {
        console.error(`[serverApi] Client Error: ${error.message}`);
        throw error;
      }

      // Retry logic
      if (attempt < MAX_RETRIES - 1) {
        const delay = BASE_RETRY_DELAY * (attempt + 1);
        console.warn(`⚠️ [serverApi] Attempt ${attempt + 1} failed. Retrying in ${delay}ms... (${error.message})`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  // 5. Final Failure
  console.error(`[serverApi] Critical Unrecoverable Error:`, lastError.message);
  throw new Error(
    "Magic Connection Error: The wizarding world is unreachable right now. Please check your connection and try again."
  );
}
