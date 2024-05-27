export function PreviewBanner() {
  return (
    <div className="w-screen absolute top-0">
      {'Previewing drafts. '}
      <a href="/api/disable-draft">Back to published</a>
    </div>
  );
}
