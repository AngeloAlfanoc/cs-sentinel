export interface ApiResponse<T = any> {
  message: string; // Optional message field, useful for success or general info messages
  data: T; // Generic type placeholder for any data the server might return
  error: string; // Optional error message field, for uniformly handling API errors
}
