import type { FormSectionDict } from "../types";

export const formSection: FormSectionDict = {
  title: "Write to us",
  description: "Have questions? We will respond within 24 hours.",
  fields: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    message: "Message",
  },
  button: "Send",
  success: "Thank you! We will contact you soon.",
  error: "Error. Please try again.",
};
