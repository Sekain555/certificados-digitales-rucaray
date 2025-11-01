import type { SVGProps } from 'react';
import Image from 'next/image';

const RucarayLogo = (props: SVGProps<SVGSVGElement>) => (
  <Image
    src="/logo-rucaray.png"
    alt="Rucaray Logo"
    width={160}
    height={40}
    {...props}
  />
);

export default RucarayLogo;
