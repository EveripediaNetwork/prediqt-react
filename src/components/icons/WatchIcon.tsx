import React from 'react';

import { IconProps } from '../../interfaces';

export const WatchIcon: React.FC<IconProps> = ({ size, width, height, className }) => {
  return (
    <svg
      viewBox="0 0 12 12"
      className={className}
      width={size || width}
      height={size || height}
      style={{ flexShrink: 0 }}
    >
      <g id="watch_svg__watch_svg__Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <g id="watch_svg__watch_svg__Shape-4" fill="currentColor" fillRule="nonzero">
          <path
            d="M6 0a6 6 0 100 12A6 6 0 006 0zm-.004 5.856a.397.397 0 010 .107.2.2 0 010 .06.453.453 0 01-.07.137L4.578 7.873a.306.306 0 01-.24.127.306.306 0 01-.238-.127.493.493 0 01-.1-.304c0-.114.036-.224.1-.304l1.223-1.59V2.429c0-.236.15-.428.336-.428.187 0 .337.192.337.428v3.428z"
            id="watch_svg__watch_svg__Shape"
          />
        </g>
      </g>
    </svg>
  );
};
