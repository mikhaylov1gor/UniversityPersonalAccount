import * as React from "react";
import type { SVGProps } from "react";
const SvgHide = (props: SVGProps<SVGSVGElement>) => (
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
      d="m4 4 16 16m-3.5-3.244C15.147 17.485 13.618 18 12 18c-3.53 0-6.634-2.452-8.413-4.221-.47-.467-.705-.7-.854-1.159-.107-.327-.107-.913 0-1.24.15-.459.385-.693.855-1.16.897-.892 2.13-1.956 3.584-2.793M19.5 14.634c.333-.293.638-.582.912-.854l.003-.003c.468-.466.703-.7.852-1.156.107-.327.107-.914 0-1.241-.15-.458-.384-.692-.854-1.159C18.633 8.452 15.531 6 12 6q-.507 0-1 .064m2.323 7.436a2 2 0 0 1-2.762-2.889"
    />
  </svg>
);
export default SvgHide;
