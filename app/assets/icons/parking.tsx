import type { SVGProps } from "react";

export function Parking(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" />
      <path d="M12.3846 5.07692H7V18.9231H10.0769V14.3077H12.3846C14.9308 14.3077 17 12.2385 17 9.69231C17 7.14615 14.9308 5.07692 12.3846 5.07692ZM12.5385 11.2308H10.0769V8.15385H12.5385C13.3846 8.15385 14.0769 8.84615 14.0769 9.69231C14.0769 10.5385 13.3846 11.2308 12.5385 11.2308Z" />
    </svg>
  );
}
