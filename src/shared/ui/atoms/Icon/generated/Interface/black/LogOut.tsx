import * as React from "react";
import type { SVGProps } from "react";
const SvgLogOut = (props: SVGProps<SVGSVGElement>) => (
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
      d="M15 7.249V7.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C13.48 4 12.92 4 11.8 4H7.2c-1.12 0-1.68 0-2.107.218a2 2 0 0 0-.875.874C4 5.519 4 6.079 4 7.197v9.607c0 1.118 0 1.677.218 2.104.192.376.498.682.875.874.427.218.986.218 2.104.218h4.606c1.118 0 1.678 0 2.105-.218a2 2 0 0 0 .874-.874C15 18.48 15 17.92 15 16.8v-.05M17 15l3-3m0 0H9m11 0-1.5-1.5L17 9"
    />
  </svg>
);
export default SvgLogOut;
