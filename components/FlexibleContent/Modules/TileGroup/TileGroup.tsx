import BackgroundGradientContainer from '@/components/BackgroundGradientContainer/BackgroundGradientContainer';
import type { TileGroupSchemaType } from '@/schemas/objects/flexibleSections/tileGroup';
import Tile from '../Tile/Tile';

export default function TileGroup({ tiles, title, showPrimaryBackground }: TileGroupSchemaType) {
  const Comp = showPrimaryBackground ? BackgroundGradientContainer : 'section';
  return (
    <Comp
      as="section"
      className="relative flex w-full flex-col items-center justify-center gap-14 px-2 lg:px-0"
      {...(showPrimaryBackground && { gradientClassName: 'w-screen' })}
    >
      {title && <h1 className="hidden text-center text-5xl font-medium md:block">{title}</h1>}
      <ul className="flex w-full flex-col items-start justify-center gap-10 lg:flex-row lg:gap-24">
        {tiles?.map((tile, i) => {
          return <Tile key={i} {...tile} />;
        })}
      </ul>
    </Comp>
  );
}
