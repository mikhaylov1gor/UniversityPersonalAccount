import * as React from "react";
import type { SVGProps } from "react";
const SvgCaretDownMd = (props: SVGProps<SVGSVGElement>) => (
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
      d="m16 10-4 4-4-4"
    />
  </svg>
);
export default SvgCaretDownMd;
