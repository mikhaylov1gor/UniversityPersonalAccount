import * as React from "react";
import type { SVGProps } from "react";
const SvgInfo = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 11v5m0 5a9 9 0 1 1 0-18 9 9 0 0 1 0 18m.05-13v.1h-.1V8z"
    />
  </svg>
);
export default SvgInfo;
