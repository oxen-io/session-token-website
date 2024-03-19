import { log } from '@/lib/logger';
import { urlForImage } from '@/lib/sanity.image';
import { PortableText as DefaultPortableText } from '@portabletext/react';

const Image = ({ value }: { value: any }) => {
  const imageUrl = urlForImage(value)?.url();

  if (!imageUrl) {
    log.error('Image not found');
    return null;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- TODO: replace with next/image
    <img src={imageUrl} alt={''} />
  );
};

const IFrame = ({ value }: { value: any }) => {
  const { embedCode } = value;

  if (!embedCode) {
    return null;
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: embedCode,
      }}
    />
  );
};

export default function PortableText(props) {
  return (
    <DefaultPortableText
      {...props}
      components={{
        types: {
          image: Image,
          iframe: IFrame,
        },
      }}
    />
  );
}
