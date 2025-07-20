import React from "react";

const LoadingAtividadesSpinner = () => {
  return (
    // <div>LoadingAtividadesSpinner</div>
    <svg
      width="60"
      height="60"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="url(#gradient)"
        stroke-width="5"
        fill="none"
        stroke-linecap="round"
        stroke-dasharray="90"
        stroke-dashoffset="60"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#1c1c1c" />
          <stop offset="100%" stop-color="#f57c00" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default LoadingAtividadesSpinner;
