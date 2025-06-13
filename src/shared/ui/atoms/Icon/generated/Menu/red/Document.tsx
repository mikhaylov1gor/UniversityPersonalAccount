import * as React from "react";
import type { SVGProps } from "react";
const SvgDocument = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        fill="none"
        viewBox="0 0 40 40"
        {...props}
    >
        <path
            stroke="#375FFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M22.97 8.68v4.582c0 .371.107.727.295.99.189.263.445.41.712.41H28m-9.117 8.974L20 24.866l2.008-2.29M26.428 32H13.572a2.53 2.53 0 0 1-1.818-.781A2.72 2.72 0 0 1 11 29.333V10.667c0-.708.27-1.386.753-1.886A2.53 2.53 0 0 1 13.571 8h9L29 14.667v14.666c0 .708-.27 1.386-.753 1.886-.482.5-1.136.781-1.818.781M20 18.04c1.352 1.23 3.116 2.295 4.918 2.21a7.34 7.34 0 0 1-.62 5.535 7.1 7.1 0 0 1-1.814 2.144A6.9 6.9 0 0 1 20 29.176a6.9 6.9 0 0 1-2.484-1.247 7.1 7.1 0 0 1-1.813-2.144 7.335 7.335 0 0 1-.62-5.534c1.801.084 3.565-.981 4.917-2.21"
        />
    </svg>
);
export default SvgDocument;
