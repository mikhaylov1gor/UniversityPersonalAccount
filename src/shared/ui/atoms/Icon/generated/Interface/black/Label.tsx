import * as React from "react";
import type { SVGProps } from "react";
const SvgLabel = (props: SVGProps<SVGSVGElement>) => (
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
      d="m19.293 9.951-2.333-2.8c-.353-.423-.53-.635-.746-.787a2 2 0 0 0-.632-.295C15.327 6 15.052 6 14.502 6H7.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C4 7.52 4 8.08 4 9.2v5.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218H14.5c.551 0 .826 0 1.081-.069.226-.06.44-.16.632-.296.216-.152.393-.363.746-.786l2.333-2.8c.608-.729.91-1.093 1.027-1.5.102-.359.102-.74 0-1.098-.116-.407-.42-.77-1.027-1.5"
    />
  </svg>
);
export default SvgLabel;
