import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowLeftMd = (props: SVGProps<SVGSVGElement>) => (
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
      d="M19 12H5m0 0 6 6m-6-6 6-6"
    />
  </svg>
);
export default SvgArrowLeftMd;
