import { QueryClient } from "react-query";

/**
 * Create a client for provider
 */
export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5000 } },
});
