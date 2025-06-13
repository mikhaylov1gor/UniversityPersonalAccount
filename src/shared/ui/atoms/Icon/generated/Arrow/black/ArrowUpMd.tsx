import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowUpMd = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 25"
    {...props}
  >
    <path
      stroke="#3A3A3A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 19.5v-14m0 0-6 6m6-6 6 6"
    />
  </svg>
);
export default SvgArrowUpMd;
