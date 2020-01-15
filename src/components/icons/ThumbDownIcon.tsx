import React from 'react';

import { IconProps } from '../../interfaces';

export const ThumbDownIcon: React.FC<IconProps> = ({ size, width, height, ...props }) => {
  return (
    <svg viewBox="0 0 9 11" {...props} width={size || width} height={size || height} style={{ flexShrink: 0 }}>
      <g id="thumb-down_svg__thumb-down_svg__Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <g id="thumb-down_svg__thumb-down_svg__Thumbs-Down-Red-2" fill="#E44F64">
          <g id="thumb-down_svg__thumb-down_svg__Thumbs-Down-Red">
            <path
              d="M9 9.575V4.559H7.78c-.202 0-.336-.094-.483-.242l-2.348-2.77a.794.794 0 01-.228-.565V.296c0-.215-.2-.296-.402-.296-.55-.013-2.08.78-.335 4.37l-3.139.014A.843.843 0 000 5.231c0 .47.376.847.845.847h.228a.843.843 0 00-.845.847c0 .471.376.848.845.848h.161a.843.843 0 00-.845.847c0 .47.376.847.845.847H1.18a.688.688 0 00-.684.686c0 .47.376.847.845.847H2c1.65 0 3.3-.255 4.882-.74L9 9.575z"
              id="thumb-down_svg__thumb-down_svg__Path"
              transform="rotate(-180 4.5 5.5)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
