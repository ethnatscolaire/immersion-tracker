import SignUpView from "@/components/views/auth/sign-up";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up for a new account",
};

export default async function SignUp() {
  return <SignUpView />;
}
