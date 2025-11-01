import type { ComponentProps } from 'react';
import Image from 'next/image';

type RucarayLogoProps = Omit<ComponentProps<typeof Image>, 'src' | 'alt' | 'width' | 'height'>;

const RucarayLogo = (props: RucarayLogoProps) => (
  <Image
    src="/logo-rucaray.png"
    alt="Rucaray Logo"
    width={160}
    height={40}
    {...props}
  />
);

export default RucarayLogo;
