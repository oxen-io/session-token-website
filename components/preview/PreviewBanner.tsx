export function PreviewBanner() {
  return (
    <div className="fixed top-0 z-20 w-screen bg-gray-lightest px-4 text-sm text-black">
      {'Previewing drafts. '}
      <a className={'underline'} href="/api/disable-draft">
        Back to published ↗
      </a>
    </div>
  );
}
