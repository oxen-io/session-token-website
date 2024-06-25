import { log } from '@/lib/logger';
import type { ModulesArraysSchemaType } from '@/schemas/documents/flexibleSections';
import type { SettingsSchemaType } from '@/schemas/singletons/settings';
import BasicCopy from '../Basic Copy/BasicCopy';
import ComingSoon from './Modules/ComingSoon/ComingSoon';
import CopyAndImage from './Modules/CopyAndImage/CopyAndImage';
import FaqsList from './Modules/FaqsList/FaqsList';
import GenericCta from './Modules/GenericCta/GenericCta';
import Hero from './Modules/Hero/Hero';
import IconStrip from './Modules/IconStrip/IconStrip';
import JoinCta from './Modules/JoinCta/JoinCta';
import PostGrid from './Modules/PostGrid/PostGrid';
import RoadmapHero from './Modules/Roadmap/RoadmapHero';
import RoadmapTabs from './Modules/Roadmap/RoadmapTabs';
import StatsTilesServer from './Modules/StatsTiles/StatsTilesServer';
import TileCarousel from './Modules/TileCarousel/TileCarousel';
import TileGroup from './Modules/TileGroup/TileGroup';

const Components: Record<string, (props: object) => JSX.Element | Promise<JSX.Element | null>> = {
  Hero,
  RoadmapHero,
  RoadmapTabs,
  IconStrip,
  JoinCta,
  StatsTiles: StatsTilesServer,
  TileGroup,
  TileCarousel,
  CopyAndImage,
  PostGrid,
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
  rows: ModulesArraysSchemaType;
  settings: SettingsSchemaType;
  topic?: any;
}) => {
  if (!rows) {
    return null;
  }

  return (
    <div>
      {rows.map((row: any, index) => {
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
