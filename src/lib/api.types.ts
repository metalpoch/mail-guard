export interface ApiError {
  message: string;
  status: number;
}

export interface Plan {
  id: number;
  max_requests: number | null;
  name: string;
}
export interface Profile {
  id: string;
  last_payment: string | null;
  plan_id: number | null;
  balance: number;
  requests: number;
  disposable_requests: number;
  plans: { id: number; max_requests: number | null; name: string } | null;
}

export interface Response {
  valid: boolean;
  code_message: string;
  message: string;
}
