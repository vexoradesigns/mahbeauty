import type { SVGProps } from "react";

export type IconName =
  | "arrow-up-right"
  | "bag"
  | "check"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "close"
  | "heart"
  | "instagram"
  | "minus"
  | "plus"
  | "search"
  | "star"
  | "truck"
  | "user";

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

export function Icon({ name, ...props }: IconProps) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...common} {...props}>
      {name === "arrow-up-right" && <><path d="M6.8 17.2 17.2 6.8" /><path d="M8.2 6.8h9v9" /></>}
      {name === "bag" && <><path d="M5.5 8.5h13l1 11h-15l1-11Z" /><path d="M9 9V6.8a3 3 0 0 1 6 0V9" /></>}
      {name === "check" && <path d="m5 12.5 4.3 4.2L19 7" />}
      {name === "chevron-down" && <path d="m6 9 6 6 6-6" />}
      {name === "chevron-left" && <path d="m14.5 5-7 7 7 7" />}
      {name === "chevron-right" && <path d="m9.5 5 7 7-7 7" />}
      {name === "close" && <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>}
      {name === "heart" && <path d="M20.8 8.9c0 5.2-8.8 10-8.8 10S3.2 14.1 3.2 8.9A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 8.8 2.3Z" />}
      {name === "instagram" && <><rect x="3.5" y="3.5" width="17" height="17" rx="4" /><circle cx="12" cy="12" r="4" /><circle cx="17.7" cy="6.5" r=".65" fill="currentColor" stroke="none" /></>}
      {name === "minus" && <path d="M5 12h14" />}
      {name === "plus" && <><path d="M12 5v14" /><path d="M5 12h14" /></>}
      {name === "search" && <><circle cx="10.8" cy="10.8" r="6.3" /><path d="m16 16 4.2 4.2" /></>}
      {name === "star" && <path d="m12 3.7 2.6 5.4 6 .9-4.3 4.2 1 5.9-5.3-2.8-5.3 2.8 1-5.9-4.3-4.2 6-.9L12 3.7Z" fill="currentColor" stroke="none" />}
      {name === "truck" && <><path d="M3.5 6.5h11v10h-11z" /><path d="M14.5 10h3.3l2.7 3v3.5h-6" /><circle cx="7" cy="18" r="1.5" /><circle cx="17.5" cy="18" r="1.5" /></>}
      {name === "user" && <><circle cx="12" cy="8" r="3.5" /><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" /></>}
    </svg>
  );
}
