import * as React from "react";
import type { SVGProps } from "react";

const SvgDate = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <g clipPath="url(#clip0)">
            <path
                d="M11.5 21H6C5.47 21 4.96 20.79 4.59 20.41C4.21 20.04 4 19.53 4 19V7C4 6.47 4.21 5.96 4.59 5.59C4.96 5.21 5.47 5 6 5H18C18.53 5 19.04 5.21 19.41 5.59C19.79 5.96 20 6.47 20 7V13"
                stroke="#3A3A3A"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16 3V7"
                stroke="#3A3A3A"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8 3V7"
                stroke="#3A3A3A"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4 11H20"
                stroke="#3A3A3A"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15 19L17 21L21 17"
                stroke="#3A3A3A"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
        <defs>
            <clipPath id="clip0">
                <rect width={24} height={24} fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export default SvgDate;
