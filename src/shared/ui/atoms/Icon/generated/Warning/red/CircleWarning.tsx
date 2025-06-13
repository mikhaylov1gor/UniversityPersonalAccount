import * as React from "react";
import type { SVGProps } from "react";
const SvgCircleWarning = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 8.45v4M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18m.05-5.55v.1h-.1v-.1z"
    />
  </svg>
);
export default SvgCircleWarning;
