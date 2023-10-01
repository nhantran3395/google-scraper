export type LoginResponse = {
  ok: boolean;
  token: string;
  message: string;
  email: string;
  firstName: string;
  lastName: string;
};

export function validateLoginResponse(data: any): data is LoginResponse {
  return (
    data.hasOwnProperty("ok") &&
    data.hasOwnProperty("token") &&
    data.hasOwnProperty("message") &&
    data.hasOwnProperty("email") &&
    data.hasOwnProperty("firstName") &&
    data.hasOwnProperty("lastName")
  );
}
