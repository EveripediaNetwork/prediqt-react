import React from 'react';

import { IconProps } from '../../interfaces';

export const ThumbUpIcon: React.FC<IconProps> = ({ size, width, height, className }) => {
  return (
    <svg
      viewBox="0 0 11 11"
      className={className}
      width={size || width}
      height={size || height}
      style={{ flexShrink: 0 }}
    >
      <g id="thumb-up_svg__thumb-up_svg__Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <g id="thumb-up_svg__thumb-up_svg__Thumbs-Up-Green-2" fill="#00AD88">
          <g id="thumb-up_svg__thumb-up_svg__Thumbs-Up-Green">
            <path
              d="M11 9.575V4.559H9.508c-.246 0-.41-.094-.59-.242l-2.869-2.77A.726.726 0 015.77.982V.296C5.77.081 5.525 0 5.28 0c-.672-.013-2.541.78-.41 4.37l-3.836.014C.459 4.384 0 4.76 0 5.231c0 .47.459.847 1.033.847h.278c-.573 0-1.032.377-1.032.847 0 .471.459.848 1.032.848h.197c-.574 0-1.033.376-1.033.847 0 .47.46.847 1.033.847h-.065c-.46 0-.836.31-.836.686 0 .47.459.847 1.032.847h.804c2.016 0 4.032-.255 5.967-.74L11 9.575z"
              id="thumb-up_svg__thumb-up_svg__Path"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
