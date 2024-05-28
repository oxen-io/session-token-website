export function PreviewBanner() {
  return (
    <div className="w-screen fixed text-sm top-0 px-4 z-20 bg-gray-lightest text-black">
      {'Previewing drafts. '}
      <a className={'underline'} href="/api/disable-draft">
        Back to published ↗
      </a>
    </div>
  );
}
