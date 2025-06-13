import * as React from "react";
import type { SVGProps } from "react";
const SvgLinkVertical = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 8v8m4-1v2a4 4 0 0 1-8 0v-2m8-6V7a4 4 0 0 0-8 0v2"
    />
  </svg>
);
export default SvgLinkVertical;
