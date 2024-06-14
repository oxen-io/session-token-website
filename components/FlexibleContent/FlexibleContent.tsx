import { log } from '@/lib/logger';
import type { SettingsSchemaType } from '@/schemas/singletons/settings';
import BasicCopy from '../Basic Copy/BasicCopy';
import BlogGrid from './Modules/BlogGrid/BlogGrid';
import ComingSoon from './Modules/ComingSoon/ComingSoon';
import CopyAndImage from './Modules/CopyAndImage/CopyAndImage';
import FaqsList from './Modules/FaqsList/FaqsList';
import GenericCta from './Modules/GenericCta/GenericCta';
import Hero from './Modules/Hero/Hero';
import IconStrip from './Modules/IconStrip/IconStrip';
import JoinCta from './Modules/JoinCta/JoinCta';
import RoadmapHero from './Modules/Roadmap/RoadmapHero';
import RoadmapTabs from './Modules/Roadmap/RoadmapTabs';
import StatsTiles from './Modules/StatsTiles/StatsTiles';
import TileCarousel from './Modules/TileCarousel/TileCarousel';

const Components = {
  Hero,
  RoadmapHero,
  RoadmapTabs,
  IconStrip,
  JoinCta,
  StatsTiles,
  TileCarousel,
  CopyAndImage,
  BlogGrid,
  ComingSoon,
  GenericCta,
  FaqsList,
  BasicCopy,
};

const ucFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const FlexibleContent = ({
  rows,
  settings,
  topic,
}: {
  rows: any;
  settings: SettingsSchemaType;
  topic?: any;
}) => {
  if (!rows) {
    return null;
  }

  return (
    <div>
      {rows.map((row, index) => {
        const name = row._type;

        const Component = Components[ucFirst(name)];

        if (!Component) {
          log.debug(`component missing for ${name}`);
          return null;
        }

        if (row?.hide) {
          return null;
        }

        return <Component {...row} key={index} settings={settings} topic={topic} />;
      })}
    </div>
  );
};

export default FlexibleContent;
