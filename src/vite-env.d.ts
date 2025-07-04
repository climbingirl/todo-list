/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.svg?react' {
  import { FC, SVGProps } from 'react';
  const component: FC<SVGProps<SVGSVGElement>>;
  export default component;
}
