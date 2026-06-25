"use client";
import KratosMessage from "@/components/kratos/message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useKratosError } from "@/hooks/kratos";
import { extractMessages, isFlow, kratosFrontendApi } from "@/lib/kratos";
import { RegistrationFlow } from "@ory/kratos-client";
import { isAxiosError } from "axios";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignUpView() {
  const [flow, setFlow] = useState<RegistrationFlow>();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { handleKratosError } = useKratosError();

  const flowId = searchParams.get("flow");

  if (flowId && typeof flowId !== "string") {
    throw new Error('Invalid query parameter "flowId" - string expected');
  }

  // We cannot fetch kratos flow on the server-side, as it needs to set csrf cookies
  useEffect(() => {
    if (flowId) {
      kratosFrontendApi
        .getRegistrationFlow({ id: flowId })
        .then((res) => setFlow(res.data))
        .catch(handleKratosError);
    } else {
      kratosFrontendApi
        .createBrowserRegistrationFlow()
        .then((res) => {
          setFlow(res.data);
          const params = new URLSearchParams(searchParams);
          params.set("flow", res.data.id);
          router.replace(`${pathname}?${params.toString()}`);
        })
        .catch(handleKratosError);
    }
  }, [flowId, pathname, router, searchParams]);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const csrfToken = flow!.ui.nodes.find(
      (node) =>
        "name" in node.attributes && node.attributes.name === "csrf_token",
    )?.attributes?.value;

    const response = await kratosFrontendApi
      .updateRegistrationFlow({
        flow: flow!.id,
        updateRegistrationFlowBody: {
          method: "password",
          csrf_token: csrfToken,
          password: password as string,
          traits: {
            email,
            name,
          },
        },
      })
      .catch((err) => {
        if (isAxiosError(err) && isFlow<RegistrationFlow>(err.response?.data)) {
          setFlow(err.response.data);
        } else {
          handleKratosError(err);
        }
      });

    if (response) {
      router.push("/sign-in");
    }
  }

  const messages = extractMessages(flow);
  const nameMessages = messages.nodes["traits.name"];
  const emailMessages = messages.nodes["traits.email"];
  const passwordMessages = messages.nodes.password;

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-space-grotestk mb-1 font-bold tracking-tight">
          Start immersing
        </h2>
        <h1
          className={clsx(
            "text-sm text-secondary-text ",
            messages.global.length === 0 ? "mb-6" : "mb-3",
          )}
        >
          Create your free account — takes 30 seconds.
        </h1>

        {messages.global.length > 0 && (
          <KratosMessage
            className="mb-3"
            variant="full"
            message={messages.global?.[0]}
          />
        )}

        {/* Name input & label*/}
        <div className="mb-4 mt-3">
          <label
            htmlFor="name-input"
            className="text-[12px] text-muted-text font-semibold block mb-1"
          >
            NAME
          </label>
          <Input
            aria-invalid={nameMessages?.hasError}
            required
            name="name"
            placeholder="John Doe"
            className="mt-1 w-full"
            autoComplete="name"
            id="name-input"
          />
          {nameMessages?.messages?.length > 0 && (
            <KratosMessage
              variant="text"
              message={nameMessages?.messages?.[0]}
            />
          )}
        </div>

        {/* Email input & label */}
        <div className="mb-4">
          <label
            htmlFor="email-input"
            className="text-[12px] text-muted-text font-semibold block mb-1"
          >
            EMAIL
          </label>
          <Input
            aria-invalid={emailMessages?.hasError}
            required
            name="email"
            placeholder="you@example.com"
            className="mt-1 w-full"
            autoComplete="email"
            id="email-input"
          />
          {emailMessages?.messages?.length > 0 && (
            <KratosMessage
              variant="text"
              message={emailMessages?.messages?.[0]}
            />
          )}
        </div>

        {/* Password input and label*/}
        <div className="mb-5">
          <label
            htmlFor="password-input"
            className="text-[12px] text-muted-text font-semibold block mb-1"
          >
            PASSWORD
          </label>
          <Input
            aria-invalid={messages.nodes.password?.hasError}
            required
            name="password"
            placeholder="••••••••"
            className="mt-1 mb-2 w-full"
            autoComplete="new-password"
            id="password-input"
          />
          {passwordMessages?.messages?.length > 0 && (
            <KratosMessage
              variant="text"
              message={passwordMessages?.messages?.[0]}
            />
          )}
        </div>

        <Button type="submit" className="w-full">
          Create account
        </Button>

        <div className="text-center mt-6 text-[12px]">
          <span className="text-muted-text mr-1">Already have an account?</span>
          <Link
            href="/auth/sign-in"
            className="text-primary-light font-semibold"
          >
            Sign in
          </Link>
        </div>
      </form>
    </section>
  );
}
