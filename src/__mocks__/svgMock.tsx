import React from 'react';

const SvgMock = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} data-testid="svg-mock" />
);

export default SvgMock;
