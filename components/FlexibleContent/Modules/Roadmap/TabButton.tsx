'use server';

import { AnimatedElement } from '@/components/AnimatedComponent/AnimatedComponent';
import { log } from '@/lib/logger';
import { urlForImage, type SanityImage } from '@/lib/sanity.image';

export async function TabButton({ image, active }: { image: SanityImage; active: boolean }) {
  const src = urlForImage(image)?.url();

  if (!src) {
    log.error('No image src for tab button');
    return null;
  }

  // eslint-disable-next-line more/no-then
  const svgData = await fetch(src).then(res => res.text());

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
      className="w-12 h-12"
      dangerouslySetInnerHTML={{ __html: svgWithHover }}
    />
  );
}
