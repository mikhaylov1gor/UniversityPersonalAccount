import * as React from "react";
import type { SVGProps } from "react";
const SvgAdministrator = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path
      stroke="#3A3A3A"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m24.25 16.5-5 5-2.5-2.5m13.75-1.044c0 8.21-6.21 11.892-8.843 13.083l-.003.002c-.277.125-.416.188-.73.242a3.5 3.5 0 0 1-.846 0c-.316-.054-.456-.117-.736-.244-2.632-1.191-8.842-4.872-8.842-13.083V13c0-1.4 0-2.1.273-2.635.24-.47.621-.853 1.092-1.093C12.399 9 13.1 9 14.5 9h12c1.4 0 2.1 0 2.634.272.47.24.854.622 1.094 1.093.272.534.272 1.234.272 2.631z"
    />
  </svg>
);
export default SvgAdministrator;
