import './glow.css';
import { Circle } from './Shapes';

const circleRadius = 22;
const largeCircleRadius = circleRadius * 1.05;
const strokeWidth = 3;

const height = 2 * largeCircleRadius + strokeWidth;
const width = height + strokeWidth;
const y = height / 2;
const x = width / 2;

export const MagicLine = () => {
  return (
    <div className="flex flex-col items-center flex-grow w-[70px]">
      <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" className="glow-large">
        <Circle
          x={x}
          y={y}
          r={largeCircleRadius}
          strokeWidth={strokeWidth}
          className="fill-[#00F782] stroke-[#00F782]"
        />

        <Circle
          x={x}
          y={y}
          r={circleRadius}
          strokeWidth={2}
          className={'fill-[#00F782] stroke-[#000000]'}
        />
      </svg>
      <div className="bg-white flex-grow w-[6px]"></div>
    </div>
  );
};
