'use client';

import clsx from 'clsx';

import PortableText from 'components/PortableText/PortableText';

import ImageBox from 'components/shared/ImageBox';

import { AnimatedElement } from 'components/AnimatedComponent/AnimatedComponent';
import NavLink from 'components/NavLink/NavLink';
import { motion, useScroll, useTransform } from 'framer-motion';
import { forwardRef, useRef } from 'react';
import s from './RoadmapSection.module.sass';

const circleRadius = 26;
const largeCircleRadius = circleRadius * 1.05;
const strokeWidth = 3;
const height = 2 * largeCircleRadius + strokeWidth;
const width = 120;
const y = height / 2;
const x = width / 2;
const circleY = y + 320;
const strokeFadePercent = 20;

// eslint-disable-next-line react/display-name
const RoadmapSection = forwardRef(
  ({ subtitle, title, copy, image, showLink, link, isFirst, isFinal }: any, ref: any) => {
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: scrollRef,
      smooth: 0.5,
      offset: ['start center', 'end center'],
    });

    const circlePassiveScale = useTransform(scrollYProgress, [0.3, 0.5], [0.75, 1]);
    const circleActiveScale = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

    const circleStrokeGradient = useTransform(scrollYProgress, [0.3, 0.5], ['#5C5C5C', '#000000']);

    const circleFillGradient = useTransform(
      scrollYProgress,
      [0.3, 0.5],
      ['var(--color-black)', 'none']
    );

    return (
      <div ref={scrollRef}>
        <section ref={ref} className="mx-10 flex max-w-screen-3xl flex-row">
          <div className="-ml-16 flex w-32 min-w-32 flex-col items-center lg:ml-0">
            <figure className="progress h-full flex-grow">
              <svg
                width={width}
                height="900px"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full flex-grow"
              >
                <line
                  x1={x}
                  x2={x}
                  y1="0%"
                  y2="100%"
                  strokeWidth={6}
                  strokeDasharray="9"
                  className="stroke-[#5C5C5C]"
                />
                <motion.line
                  x1={x}
                  x2={x}
                  y1={-160}
                  y2="100%"
                  strokeWidth={6}
                  pathLength="1"
                  className="stroke-[#ffffff]"
                  style={{ pathLength: scrollYProgress }}
                />
                {isFinal ? (
                  <>
                    <defs>
                      <linearGradient
                        id="gradFinal"
                        gradientUnits="userSpaceOnUse"
                        x1={x}
                        x2={x}
                        y1={`${100 - strokeFadePercent - 20}%`}
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="var(--color-black)" stopOpacity={0} />
                        <stop offset="50%" stopColor="var(--color-black)" stopOpacity={1} />
                        <stop offset="100%" stopColor="var(--color-black)" stopOpacity={1} />
                      </linearGradient>
                    </defs>
                    <line
                      x1={x}
                      x2={x}
                      y1={circleY}
                      y2="100%"
                      strokeWidth={6}
                      stroke="var(--color-black)"
                    />
                    <line
                      x1={x}
                      x2={x}
                      y1={circleY}
                      y2="100%"
                      strokeWidth={6}
                      strokeDasharray="9"
                      className="stroke-[#5C5C5C]"
                    />
                    <line
                      x1={x}
                      x2={x}
                      y1={`${100 - strokeFadePercent - 20}%`}
                      y2="100%"
                      strokeWidth={6}
                      stroke="url(#gradFinal)"
                    />
                  </>
                ) : null}
                <motion.circle
                  cx={x}
                  cy={circleY}
                  r={circleRadius}
                  strokeWidth={3}
                  style={{
                    fill: 'var(--color-black)',
                    scale: circlePassiveScale,
                  }}
                />
                <motion.circle
                  cx={x}
                  cy={circleY}
                  r={largeCircleRadius}
                  strokeWidth={strokeWidth}
                  className="fill-[#00F782] stroke-[#00F782]"
                  style={{ scale: circleActiveScale }}
                />
                <motion.circle
                  cx={x}
                  cy={circleY}
                  r={circleRadius}
                  strokeWidth={3}
                  className={'glow-large fill-[#00F782]'}
                  style={{ scale: circleActiveScale }}
                />
                <motion.circle
                  cx={x}
                  cy={circleY}
                  r={circleRadius}
                  strokeWidth={3}
                  style={{
                    scale: circlePassiveScale,
                    stroke: circleStrokeGradient,
                    fill: circleFillGradient,
                  }}
                />
                {isFirst ? (
                  <>
                    <defs>
                      <linearGradient
                        id="gradFirst"
                        gradientUnits="userSpaceOnUse"
                        x1={x}
                        x2={x}
                        y1="0%"
                        y2={`${strokeFadePercent}%`}
                      >
                        <stop offset={`0%`} stopColor="var(--color-black)" stopOpacity={1} />
                        <stop offset={`100%`} stopColor="var(--color-black)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <line
                      x1={x}
                      x2={x}
                      y1="0%"
                      y2={`${strokeFadePercent}%`}
                      strokeWidth={6}
                      stroke="url(#gradFirst)"
                    />
                  </>
                ) : null}
              </svg>
            </figure>
          </div>
          <div className="flex w-full flex-col-reverse items-center lg:flex-row lg:pl-24">
            <AnimatedElement className={clsx(s.Content, 'w-full')} delay={100}>
              {subtitle && (
                <AnimatedElement
                  type="h3"
                  delay={0}
                  dangerouslySetInnerHTML={{
                    __html: subtitle,
                  }}
                />
              )}
              {title && (
                <AnimatedElement
                  type="h2"
                  className="mt-8 bg-gradient-to-tr from-[#FFFFFF] to-[#97A99E] bg-clip-text pr-2 text-4xl font-medium text-transparent lg:text-8xl"
                  delay={100}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              )}
              {copy && (
                <AnimatedElement
                  className="mb-[30px] mr-[12px] mt-[40px] text-base font-medium lg:text-3xl"
                  type="div"
                  delay={200}
                >
                  <PortableText value={copy} />
                </AnimatedElement>
              )}
              {showLink && link && (
                <NavLink {...link} className="text-[26px] font-bold text-primary">
                  <span>{link.title}</span>
                </NavLink>
              )}
            </AnimatedElement>
            <AnimatedElement className="w-full flex-shrink-0 lg:w-1/3" delay={200}>
              {image && <ImageBox image={image} />}
            </AnimatedElement>
          </div>
        </section>
      </div>
    );
  }
);

export default RoadmapSection;
