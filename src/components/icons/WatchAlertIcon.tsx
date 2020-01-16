import React from 'react';

import { IconProps } from '../../interfaces';

export const WatchAlertIcon: React.FC<IconProps> = ({ size, width, height, className }) => {
  return (
    <svg
      viewBox="0 0 17 17"
      className={className}
      width={size || width}
      height={size || height}
      style={{ flexShrink: 0 }}
    >
      <g id="watch-alert_svg__watch-alert_svg__Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <g
          id="watch-alert_svg__watch-alert_svg__Element-States"
          transform="translate(-697 -125)"
          fill="currentColor"
          fillRule="nonzero"
        >
          <g id="watch-alert_svg__watch-alert_svg__Expired" transform="translate(697 125)">
            <path
              d="M7.677 15.353c.466 0 .93-.043 1.389-.127a4.402 4.402 0 106.16-6.161A7.678 7.678 0 002.763 1.779a7.678 7.678 0 004.914 13.576v-.002zm4.79-6.286a3.4 3.4 0 11-3.4 3.403 3.405 3.405 0 013.401-3.402l-.001-.001zm-7.934-2.23h3.318v-4.57h1.216v5.666H4.533V6.837z"
              id="watch-alert_svg__watch-alert_svg__Shape"
            />
            <path
              d="M12.497 14a.49.49 0 01.355.145.48.48 0 01.148.354.473.473 0 01-.152.369.502.502 0 01-.345.132.513.513 0 01-.348-.13.47.47 0 01-.155-.371c0-.138.049-.257.145-.353a.481.481 0 01.352-.146zm.022-4c.24 0 .346.116.394.214.058.121.087.286.087.505 0 .122-.006.247-.02.372l-.115 1.331a1.124 1.124 0 01-.09.398.304.304 0 01-.288.18.295.295 0 01-.287-.178 1.296 1.296 0 01-.09-.404l-.086-1.298a9.789 9.789 0 01-.024-.55.59.59 0 01.142-.415.493.493 0 01.378-.155z"
              id="watch-alert_svg__watch-alert_svg__Combined-Shape"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
