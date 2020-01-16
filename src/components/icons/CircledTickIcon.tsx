import React from 'react';

import { IconProps } from '../../interfaces';

export const CircledTickIcon: React.FC<IconProps> = ({ size, width, height, className }) => {
  return (
    <svg
      viewBox="0 0 15 15"
      className={className}
      width={size || width}
      height={size || height}
      style={{ flexShrink: 0 }}
    >
      <g id="circled-tick_svg__circled-tick_svg__Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <g
          id="circled-tick_svg__circled-tick_svg__Element-States"
          transform="translate(-698 -241)"
          fill="currentColor"
          fillRule="nonzero"
        >
          <path
            d="M705.5 241a7.5 7.5 0 107.5 7.5 7.51 7.51 0 00-7.5-7.5zm3.39 5.71l-3.745 4.164a.333.333 0 01-.202.117.374.374 0 01-.071.009.15.15 0 01-.06-.009.334.334 0 01-.203-.117l-1.5-1.664a.44.44 0 01-.109-.294c0-.11.04-.217.11-.295a.351.351 0 01.532 0l1.237 1.377 3.479-3.876a.351.351 0 01.532 0 .44.44 0 01.11.294.44.44 0 01-.11.294z"
            id="circled-tick_svg__circled-tick_svg__Resolved"
          />
        </g>
      </g>
    </svg>
  );
};
