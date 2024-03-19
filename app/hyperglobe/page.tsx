'use client';

import { HyperGlobe } from '@/components/FlexibleContent/Modules/Roadmap/Hyperglobe';

export default function Page() {
  return (
    <div
      className="bg-slate-500 isolate"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(HyperGlobe),
      }}
    />
  );
}
