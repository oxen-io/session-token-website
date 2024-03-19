'use client';

import clsx from 'clsx';
import './glow.css';
import { useState } from 'react';
import { Circle, Line } from './Shapes';

const circleRadius = 12;
const largeCircleRadius = circleRadius * 1.05;
const strokeWidth = 3;
const circleDistance = 120;

const barrier = largeCircleRadius - circleRadius;

const circleStart = barrier + circleRadius + 0.5 * strokeWidth;
const xA = circleStart + circleRadius;
const xB = xA + circleDistance;

const height = barrier + circleRadius * 2 + 1.5 * strokeWidth;
const width = barrier * 2 + circleDistance + circleRadius * 4 - 3 * strokeWidth;
const y = height / 2;

const TimelineSelector = ({ sections, defaultSection, scrollToSection }: any) => {
  const [activeSegment, setActiveSegment] = useState(defaultSection);

  const handleClick = id => {
    setActiveSegment(id);
    scrollToSection(id);
  };

  return (
    <div className="flex">
      {sections?.map(({ segment }) => {
        const active = activeSegment === segment;
        return (
          <button
            key={segment}
            type="button"
            className={clsx(
              '-mr-[28px] flex flex-col items-center stroke-[#535353] hover:fill-[#00F782] hover:stroke-[#00F782] hover:from-[#00F782] hover:to-[#00F782] cursor-pointer hover:z-20 transition-all duration-0.5s ease-in-out from-[#ACE2D5] to-[#405E56]',
              active ? 'z-30 text-2xl text-[#00F782]' : 'z-10 text-md'
            )}
            onClick={() => {
              handleClick(segment);
            }}
          >
            <div
              className={clsx(
                ' absolute bottom-0 mb-8',
                active ? '' : 'bg-gradient-to-br bg-clip-text text-transparent'
              )}
            >
              {segment}
            </div>
            <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
              <Line
                x1={xA}
                y1={y}
                x2={xB}
                y2={y}
                className={clsx('z-0', active && 'fill-[#ffffff] stroke-[#ffffff]')}
              />
              {active && (
                <Circle
                  x={circleStart}
                  y={y}
                  r={largeCircleRadius}
                  strokeWidth={strokeWidth}
                  className="fill-[#00F782] stroke-[#00F782]"
                />
              )}
              <Circle
                x={circleStart}
                y={y}
                r={circleRadius}
                strokeWidth={2}
                className={clsx(active && 'fill-[#00F782] stroke-[#000000]')}
              />
              {active && (
                <Circle
                  x={xB}
                  y={y}
                  r={largeCircleRadius}
                  strokeWidth={strokeWidth}
                  className="fill-[#00F782] stroke-[#00F782]"
                />
              )}
              <Circle
                x={xB}
                y={y}
                r={circleRadius}
                strokeWidth={2}
                className={clsx(active && 'fill-[#00F782] stroke-[#000000]')}
              />
            </svg>
            <svg
              width={width}
              height={height}
              xmlns="http://www.w3.org/2000/svg"
              className={`glow mt-[-29.1px] -z-50`}
            >
              {active && (
                <Circle
                  x={circleStart}
                  y={y}
                  r={largeCircleRadius}
                  strokeWidth={strokeWidth}
                  className="fill-black stroke-black"
                />
              )}
              {active && (
                <Circle
                  x={xB}
                  y={y}
                  r={largeCircleRadius}
                  strokeWidth={strokeWidth}
                  className="fill-black stroke-black"
                />
              )}
            </svg>
          </button>
        );
      })}
    </div>
  );
};

export default TimelineSelector;
