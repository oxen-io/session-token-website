import s from './PreviewBanner.module.sass';

export function PreviewBanner() {
  return (
    <div className={s.PreviewBanner}>
      {'Previewing drafts. '}
      <a href="/api/disable-draft">Back to published</a>
    </div>
  );
}
