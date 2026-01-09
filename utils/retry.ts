
/**
 * Retries a function with exponential backoff.
 * 
 * @param fn The async function to retry
 * @param maxRetries Maximum number of retries (default 3)
 * @param initialDelay Initial delay in ms (default 1000)
 * @returns Result of the function
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let attempt = 0;
  
  while (attempt <= maxRetries) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Calculate delay with exponential backoff and jitter
      const delay = initialDelay * Math.pow(2, attempt);
      const jitter = Math.random() * 200; // Add up to 200ms random jitter
      
      console.warn(`Attempt ${attempt + 1} failed. Retrying in ${Math.round(delay + jitter)}ms...`, error);
      
      await new Promise(resolve => setTimeout(resolve, delay + jitter));
      attempt++;
    }
  }
  
  // Should be unreachable due to throw in loop
  throw new Error("Retry failed");
}
