import * as React from "react";
import type { SVGProps } from "react";
const SvgSearchMagnifyingGlass = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m14.5 15 6 6m-11-4a7 7 0 1 1 0-14 7 7 0 0 1 0 14"
    />
  </svg>
);
export default SvgSearchMagnifyingGlass;
