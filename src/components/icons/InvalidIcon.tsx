import React from 'react';

import { IconProps } from '../../interfaces';

export const InvalidIcon: React.FC<IconProps> = ({ size, width, height, className }) => {
  return (
    <svg
      viewBox="0 0 15 15"
      className={className}
      width={size || width}
      height={size || height}
      style={{ flexShrink: 0 }}
    >
      <g id="invalid_svg__invalid_svg__Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <g id="invalid_svg__invalid_svg__Element-States" transform="translate(-698 -181)" fill="currentColor">
          <path
            d="M705.5 181a7.51 7.51 0 017.5 7.5 7.5 7.5 0 11-7.5-7.5zm-.003 10.667a.427.427 0 00-.352.194.77.77 0 00-.145.47c0 .21.052.376.155.495a.448.448 0 00.348.174.44.44 0 00.345-.176c.1-.121.152-.287.152-.493a.759.759 0 00-.148-.471.436.436 0 00-.355-.193zm.022-6.667c-.154 0-.28.093-.377.276-.094.18-.142.428-.142.737 0 .2.008.528.024.977l.087 2.308.012.182c.017.23.043.406.077.537.053.207.152.316.287.316.131 0 .23-.11.288-.32.047-.17.077-.403.09-.707l.116-2.367.014-.333.005-.329c0-.388-.029-.681-.087-.897-.048-.174-.155-.38-.394-.38z"
            id="invalid_svg__invalid_svg__Invalid"
          />
        </g>
      </g>
    </svg>
  );
};
