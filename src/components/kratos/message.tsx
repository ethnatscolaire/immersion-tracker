import { UiText } from "@ory/kratos-client";
import InfoCircle from "@/components/icons/info-circle";
import clsx from "clsx";

interface KratosMessageProps {
  variant: "text" | "full";
  message: UiText;
  className?: string;
}

function getSeverityColor(message: UiText) {
  switch (message.type) {
    case "error":
      return "#F87171";
    case "info":
      return "#7EB3FF";
    case "success":
      return "#3ECF8E";
  }
}

function getBackgroundClass(message: UiText) {
  switch (message.type) {
    case "error":
      return "bg-[#DC3C3C]/10";
    case "info":
      return "bg-[#5082F0]/10";
    case "success":
      return "bg-[#3ECF8E]/10";
  }
}

export default function KratosMessage({
  variant,
  message,
  className,
}: Readonly<KratosMessageProps>) {
  const severityColor = getSeverityColor(message);

  return variant === "text" ? (
    <span
      className={clsx(
        `text-[12px] flex gap-x-1 text-(--severity-color)`,
        className,
      )}
      style={{ "--severity-color": severityColor } as React.CSSProperties}
    >
      <InfoCircle className="mt-[3px] w-3 h-3 shrink-0" />
      {message.text}
    </span>
  ) : (
    <div
      className={clsx(
        `p-2 border-(--severity-color) text-(--severity-color) border rounded-lg flex gap-x-1 text-sm`,
        getBackgroundClass(message),
        className,
      )}
      style={{ "--severity-color": severityColor } as React.CSSProperties}
    >
      <InfoCircle className="mt-[3.5px] w-3.5 h-3.5 shrink-0" />
      {message.text}
    </div>
  );
}
