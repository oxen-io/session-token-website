import type { TileGroupSchemaType } from '@/schemas/objects/flexibleSections/tileGroup';
import Tile from '../Tile/Tile';

export default function TileGroup({ tiles, title, showPrimaryBackground }: TileGroupSchemaType) {
  return (
    <section className="relative flex w-full flex-col items-center justify-center gap-14 px-2 lg:px-0">
      {showPrimaryBackground ? (
        <>
          <div className="absolute hidden h-full w-screen bg-gradient-to-b from-transparent via-primary to-transparent opacity-10 lg:block" />
          <div className="absolute hidden h-full w-screen bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-90 lg:block" />
        </>
      ) : null}
      {title && <h1 className="hidden text-center text-5xl font-medium md:block">{title}</h1>}
      <ul className="flex w-full flex-col items-start justify-center gap-10 lg:flex-row lg:gap-24">
        {tiles?.map((tile, i) => {
          return <Tile key={i} {...tile} />;
        })}
      </ul>
    </section>
  );
}
