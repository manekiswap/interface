/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */

import { forwardRef, useState } from 'react';
import { FiSlash } from 'react-icons/fi';
import { Image, ImageProps } from 'theme-ui';

const BAD_SRCS: { [tokenAddress: string]: true } = {};

export interface Props extends Pick<ImageProps, 'style' | 'alt' | 'className'> {
  srcs: Array<string | undefined>;
}

const Logo = forwardRef(({ srcs, alt, style, ...rest }: Props, ref) => {
  const [, refresh] = useState<number>(0);

  const src: string | undefined = srcs.filter((src) => !!src).find((src) => !BAD_SRCS[src!!]);

  if (src) {
    return (
      <Image
        {...rest}
        alt={alt}
        src={src}
        style={style}
        onError={() => {
          if (src) BAD_SRCS[src] = true;
          refresh((i) => i + 1);
        }}
      />
    );
  }

  return <FiSlash {...rest} style={{ ...style, color: 'dark.200' }} />;
});

Logo.displayName = 'Logo';

export default Logo;
