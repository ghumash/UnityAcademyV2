export type ActionErrors = Record<string, string | undefined>;

export type ActionState = {
  ok: boolean;
  message: string;
  errors?: ActionErrors;
};
