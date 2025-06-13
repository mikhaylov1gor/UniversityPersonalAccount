import * as React from "react";
import type { SVGProps } from "react";
const SvgCloseCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#375FFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m9 9 3 3m0 0 3 3m-3-3-3 3m3-3 3-3m-3 12a9 9 0 1 1 0-18 9 9 0 0 1 0 18"
    />
  </svg>
);
export default SvgCloseCircle;
