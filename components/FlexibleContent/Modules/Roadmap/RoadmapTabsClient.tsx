'use client';

import { AnimatedElement } from '@/components/AnimatedComponent/AnimatedComponent';
import { useState } from 'react';
import RoadmapTab from './RoadmapTab';
import type { RoadmapTabButton } from './RoadmapTabs';

export default function RoadmapTabsClient({
  tabs,
  roadmapButtons,
}: {
  tabs: Array<any>;
  roadmapButtons: Array<RoadmapTabButton>;
}) {
  const [activeTab, setActiveTab] = useState(0);

  const tabButtonImages = roadmapButtons.map(({ title, imageData }, i) => {
    return (
      <li key={i}>
        <button
          onClick={() => setActiveTab(i)}
          className="items-center justify-center flex flex-col group"
        >
          <TabButton svgData={imageData} active={activeTab === i} />
          <span className="text-center text-xs mt-3 w-max group-hover:text-primary group-hover:opacity-100 opacity-0 ease-in-out transition-all ">
            {title}
          </span>
        </button>
      </li>
    );
  });

  return (
    <div className="flex flex-col">
      {tabs.map((tab, i) =>
        activeTab === i ? (
          <RoadmapTab key={i} tab={tab}>
            <AnimatedElement className="mt-4 space-x-6" type={'ul'} delay={300}>
              {tabButtonImages}
            </AnimatedElement>
          </RoadmapTab>
        ) : null
      )}
    </div>
  );
}

function TabButton({ svgData, active }: { svgData: string; active: boolean }) {
  // remove width and height from svg
  const svgDataNoWidth = svgData.replace(/width=".*?"/, '');
  const svgDataNoHeight = svgDataNoWidth.replace(/height=".*?"/, '');

  // Wrap the SVG data in a div that will handle the hover state
  const svgWithHover = `
        <div class="roadmap-button-hover-wrapper ${
          active && 'roadmap-button-hover-wrapper-active'
        }">
            ${svgDataNoHeight}
        </div>
    `;

  return (
    <AnimatedElement
      delay={200}
      className="w-14 h-14"
      dangerouslySetInnerHTML={{ __html: svgWithHover }}
    />
  );
}
