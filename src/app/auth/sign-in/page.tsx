import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignIn() {
  return (
    <div>
      {/* Sign-in section */}
      <h2 className="text-2xl font-space-grotestk mb-1 font-bold tracking-tight">
        Welcome back
      </h2>
      <h1 className="text-sm text-secondary-text mb-6">
        Log in to your immersion tracker.
      </h1>

      {/* Email input & label */}
      <div className="mb-3">
        <label
          htmlFor="email-input"
          className="text-[12px] text-muted-text font-semibold block "
        >
          EMAIL
        </label>
        <Input
          placeholder="you@example.com"
          className="mt-1  w-[400px]"
          autoComplete="email"
          id="email-input"
        />
      </div>

      {/* Password input & label */}
      <div className="mb-5">
        <div className="flex justify-between text-[12px]">
          <label
            htmlFor="password-input"
            className="text-muted-text font-semibold block"
          >
            PASSWORD
          </label>

          <Link
            className="text-primary-light font-semibold"
            href="/auth/forgot-password"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          autoComplete="current-password"
          type="password"
          placeholder="••••••••"
          className="mt-1 w-[400px]"
          id="email-input"
        />
      </div>

      <Button className="w-full">Sign in</Button>

      <div className="text-center mt-6 text-[12px]">
        <span className="text-muted-text mr-1">
          Don&apos;t have an account?
        </span>
        <Link href="/auth/sign-up" className="text-primary-light font-semibold">
          Sign up
        </Link>
      </div>
    </div>
  );
}
