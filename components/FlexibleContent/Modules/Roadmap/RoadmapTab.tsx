'use client';

import { useRef } from 'react';
import RoadmapHero from './RoadmapHero';
import RoadmapSection from './RoadmapSection';

// NOTE - Timeline selector hidden for now
export default function RoadmapTab({ tab, children }: { tab: any; children: React.ReactNode }) {
  const sectionsRef = useRef<Map<any, any>>();

  const sections = tab?.roadmapSections.map(section => section);

  /* function scrollToSection(id) {
    const map = getMap();
    const node = map.get(id);
    node.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  } */

  function getMap() {
    if (!sectionsRef.current) {
      sectionsRef.current = new Map();
    }
    return sectionsRef.current;
  }

  return (
    <div className="flex flex-col items-center">
      {tab?.roadmapHero ? <RoadmapHero {...tab.roadmapHero}>{children}</RoadmapHero> : null}
      {/* <TimelineSelector
        sections={sections}
        defaultSection={sections[0].segment ?? 0}
        scrollToSection={scrollToSection}
      /> */}
      <div className="flex flex-col items-center">
        {sections
          ? sections.map((section, i) => {
              const id = section.segment ?? i;
              return (
                <div key={id} className="flex flex-row">
                  <RoadmapSection
                    {...section}
                    isFirst={i === 0}
                    isFinal={i === sections.length - 1}
                    ref={node => {
                      const map = getMap();
                      if (node) {
                        map.set(id, node);
                      } else {
                        map.delete(id);
                      }
                    }}
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
