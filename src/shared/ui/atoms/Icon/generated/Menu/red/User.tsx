import * as React from "react";
import type { SVGProps } from "react";
const SvgUser = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 44 44"
    {...props}
  >
    <path
      stroke="#375FFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M32.5 33.5c0-3.452-4.477-6.25-10-6.25s-10 2.798-10 6.25m10-10a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5"
    />
  </svg>
);
export default SvgUser;
