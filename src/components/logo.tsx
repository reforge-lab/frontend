import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

export function Logo({ className = 'size-6', size = 48, ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Background Rounded Card */}
      <rect width="48" height="48" rx="12" fill="#2563EB" />
      
      {/* Subtle Top-to-Bottom Highlight */}
      <rect
        width="48"
        height="48"
        rx="12"
        fill="url(#reforge_bg_gradient)"
      />

      {/* 3D Isometric Cube */}
      <g>
        {/* Top Face */}
        <path
          d="M24.5001 23.1948L37.4487 15.7241L24.5001 8.25L11.5513 15.7241L24.5001 23.1948Z"
          fill="white"
          fillOpacity="0.95"
        />
        {/* Left Face */}
        <path
          d="M23.5738 24.7989L10.625 17.3282V32.2759L23.5738 39.75V24.7989Z"
          fill="white"
          fillOpacity="0.75"
        />
        {/* Right Face */}
        <path
          d="M25.4277 24.7989V39.7499L38.3762 32.2759V17.3281L25.4277 24.7989Z"
          fill="white"
          fillOpacity="0.45"
        />
      </g>

      {/* Subtle Border Rim */}
      <rect
        x="1"
        y="1"
        width="46"
        height="46"
        rx="11"
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="1.5"
      />

      <defs>
        <linearGradient
          id="reforge_bg_gradient"
          x1="24"
          y1="0"
          x2="24"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.15" />
          <stop offset="1" stopColor="black" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Logo;
