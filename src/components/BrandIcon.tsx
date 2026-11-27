import clsx from "clsx";

export default function BrandIcon({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden
      className={clsx("shrink-0", className)}
    >
      <rect width="32" height="32" rx="8" fill="#C45C12" />
      <path
        d="M8 23.2V9.2L16 16.6 24 9.2v14"
        fill="none"
        stroke="#fff"
        strokeWidth="2.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 26.2h13.6"
        fill="none"
        stroke="#F6D48A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
