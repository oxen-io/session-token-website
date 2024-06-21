import CMSImageBox from '@/components/ImageBox/CMSImageBox';
import type { TileSchemaType } from '@/schemas/objects/flexibleSections/tileGroup';

export default function Tile(props: TileSchemaType) {
  const { title, copy, image } = props;

  return (
    <section className="flex w-full flex-col items-center justify-center gap-4">
      {image && <CMSImageBox className="flex w-1/2" image={image} />}
      {title && <h1 className="text-center text-2xl font-medium lg:text-4xl">{title}</h1>}
      {copy && <p className="text-center text-xl lg:text-2xl">{copy}</p>}
    </section>
  );
}
