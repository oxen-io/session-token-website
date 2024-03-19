export const Circle = ({
  x,
  y,
  r,
  strokeWidth,
  className,
}: {
  x: number;
  y: number;
  r: number;
  strokeWidth: number;
  className: string;
}) => <circle cx={x} cy={y} r={r} strokeWidth={strokeWidth} className={className} />;
export const Line = ({
  x1,
  y1,
  x2,
  y2,
  className,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  className: string;
}) => <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="3" className={className} />;
