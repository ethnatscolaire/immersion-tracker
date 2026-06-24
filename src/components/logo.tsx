import clsx from "clsx";

export interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <div
      className={clsx("flex items-center justify-center gap-x-2", className)}
    >
      <div className="bg-gradient-to-r from-[#8b7bff] to-[#6a57e6] rounded-sm w-7 h-7 flex items-center justify-center text-white font-bold">
        没
      </div>
      <p className="text-white text-lg font-bold">Immerse</p>
    </div>
  );
}
