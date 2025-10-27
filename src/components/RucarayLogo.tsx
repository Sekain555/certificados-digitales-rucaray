import type { SVGProps } from 'react';

const RucarayLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 21h18" />
    <path d="M7 21V7l5-5 5 5v14" />
    <path d="M12 21V11" />
    <path d="M7 12h10" />
  </svg>
);

export default RucarayLogo;
