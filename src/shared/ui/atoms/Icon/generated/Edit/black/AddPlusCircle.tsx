import * as React from "react";
import type { SVGProps } from "react";
const SvgAddPlusCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#3A3A3A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 12h4m0 0h4m-4 0v4m0-4V8m0 13a9 9 0 1 1 0-18 9 9 0 0 1 0 18"
    />
  </svg>
);
export default SvgAddPlusCircle;
