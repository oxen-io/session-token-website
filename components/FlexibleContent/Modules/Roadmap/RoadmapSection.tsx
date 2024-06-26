'use client';

import PortableText from 'components/PortableText/PortableText';

import CMSImageBox from '@/components/ImageBox/CMSImageBox';
import { useScreenWidth } from '@/hooks/screen';
import clsx from 'clsx';
import { AnimatedElement } from 'components/AnimatedComponent/AnimatedComponent';
import NavLink from 'components/NavLink/NavLink';
import { motion, useScroll, useTransform } from 'framer-motion';
import { forwardRef, useRef, type HTMLAttributes } from 'react';

const circleRadius = 26;
const largeCircleRadius = circleRadius * 1.05;
const strokeWidth = 3;
const height = 2 * largeCircleRadius + strokeWidth;
const width = 120;
const y = height / 2;
const x = width / 2;
const circleY = y + 320;
const strokeFadePercent = 20;

interface RoadmapLineProps extends HTMLAttributes<HTMLDivElement> {
  scrollYProgress: any;
  circlePassiveScale: any;
  circleActiveScale: any;
  circleStrokeGradient: any;
  circleFillGradient: any;
  isFirst: boolean;
  isFinal: boolean;
}

/** NOTE: The roadmap line is very fragile and needs extensive testing if any changes are made */
const RoadmapLine = forwardRef<HTMLDivElement, RoadmapLineProps>(
  (
    {
      className,
      scrollYProgress,
      circlePassiveScale,
      circleActiveScale,
      circleStrokeGradient,
      circleFillGradient,
      isFirst,
      isFinal,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx('flex w-32 min-w-32 flex-col items-center', className)}
        {...props}
      >
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
                    <stop offset="0%" stopColor="var(--black)" stopOpacity={0} />
                    <stop offset="50%" stopColor="var(--black)" stopOpacity={1} />
                    <stop offset="100%" stopColor="var(--black)" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <line x1={x} x2={x} y1={circleY} y2="100%" strokeWidth={6} stroke="var(--black)" />
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
                fill: 'var(--black)',
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
                    <stop offset={`0%`} stopColor="var(--black)" stopOpacity={1} />
                    <stop offset={`100%`} stopColor="var(--black)" stopOpacity={0} />
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
    );
  }
);
RoadmapLine.displayName = 'RoadmapLine';

interface RoadmapSectionProps extends HTMLAttributes<HTMLDivElement> {
  subtitle: string;
  title: string;
  copy: any;
  image: any;
  showLink: boolean;
  link: any;
  isFirst: boolean;
  isFinal: boolean;
}

const RoadmapSection = forwardRef<HTMLDivElement, RoadmapSectionProps>(
  (
    { className, subtitle, title, copy, image, showLink, link, isFirst, isFinal, ...props },
    ref
  ) => {
    const scrollRef = useRef(null);
    const { isSM, isMD } = useScreenWidth();
    const lg = !(isMD || isSM);

    const { scrollYProgress } = useScroll({
      target: scrollRef,
      smooth: 0.5,
      offset: ['start center', 'end center'],
    });

    const circlePassiveScale = useTransform(
      scrollYProgress,
      [0.3, 0.5],
      [lg ? 0.75 : 0.5, lg ? 1 : 0.66]
    );
    const circleActiveScale = useTransform(scrollYProgress, [0.3, 0.5], [0, lg ? 1 : 0.66]);
    const circleStrokeGradient = useTransform(scrollYProgress, [0.3, 0.5], ['#5C5C5C', '#000000']);
    const circleFillGradient = useTransform(scrollYProgress, [0.3, 0.5], ['var(--black)', 'none']);

    return (
      <div ref={scrollRef}>
        <section ref={ref} className={clsx('flex flex-row', className)} {...props}>
          <RoadmapLine
            scrollYProgress={scrollYProgress}
            circlePassiveScale={circlePassiveScale}
            circleActiveScale={circleActiveScale}
            circleStrokeGradient={circleStrokeGradient}
            circleFillGradient={circleFillGradient}
            className="-ml-14 -mr-4 md:-ml-16 lg:ml-0"
            isFirst={isFirst}
            isFinal={isFinal}
          />
          <div className="flex h-full w-full flex-col-reverse items-center lg:-mt-16 lg:h-auto lg:flex-row lg:gap-16 lg:px-10">
            <AnimatedElement className="flex w-full flex-col gap-4 lg:gap-8" delay={100}>
              {subtitle && (
                <AnimatedElement
                  type="h3"
                  className="-mb-1 bg-gradient-to-tr from-[#A0C5B5] to-[#AED0D8] bg-clip-text text-sm font-medium text-transparent lg:-mb-2 lg:text-lg"
                  delay={0}
                  dangerouslySetInnerHTML={{
                    __html: subtitle,
                  }}
                />
              )}
              {title && (
                <AnimatedElement
                  type="h2"
                  className="-mb-4 bg-gradient-to-tr from-[#FFFFFF] to-[#97A99E] bg-clip-text pb-4 text-3xl font-medium text-transparent lg:text-7xl"
                  delay={100}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              )}
              {copy && (
                <AnimatedElement
                  className="text-base font-medium lg:text-2xl"
                  type="div"
                  delay={200}
                >
                  <PortableText value={copy} />
                </AnimatedElement>
              )}
              {showLink && link && (
                <NavLink {...link} className="text-lg font-medium text-primary lg:text-2xl">
                  <span>{link.title}</span>
                </NavLink>
              )}
            </AnimatedElement>
            <AnimatedElement
              className="flex-shrink-0 self-start md:w-3/4 lg:w-1/3 lg:self-auto"
              delay={200}
            >
              {image && <CMSImageBox image={image} />}
            </AnimatedElement>
          </div>
        </section>
      </div>
    );
  }
);
RoadmapSection.displayName = 'RoadmapSection';

export default RoadmapSection;
