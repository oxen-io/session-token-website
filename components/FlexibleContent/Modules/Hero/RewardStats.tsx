import { AnimatedElement } from '@/components/AnimatedComponent/AnimatedComponent';
import { SettingsContext } from '@/components/Contexts/SettingsContext';
import { log } from '@/lib/logger';
import clsx from 'clsx';
import { useContext } from 'react';
import s from './RewardStats.module.sass';

const giftIcon = (
  <svg width="23" height="26" viewBox="0 0 23 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      // eslint-disable-next-line max-len
      d="M2.02372 21.0763C2.02372 22.9886 3.14849 24.0123 5.06891 24.0123H10.3515V14.1641H2.02372V21.0763ZM12.4643 24.0123H17.7582C19.6673 24.0123 20.8033 22.9886 20.8033 21.0763V14.1641H12.4643V24.0123ZM0.471191 11.0058C0.471191 12.2517 1.18614 12.8072 2.42703 12.8072H10.3515V6.5068H8.66336C6.94785 6.5068 5.95289 5.45758 5.95289 4.24066C5.95289 3.04796 6.79114 2.32248 8.00402 2.32248C9.29962 2.32248 10.3515 3.34748 10.3515 4.93588V6.5068H12.4643V4.93588C12.4643 3.34748 13.5203 2.32248 14.8138 2.32248C16.0267 2.32248 16.8649 3.04796 16.8649 4.24066C16.8649 5.45758 15.8772 6.5068 14.1544 6.5068H12.4643V12.8072H20.3979C21.6389 12.8072 22.3558 12.2517 22.3558 11.0058V8.49581C22.3558 7.12084 21.5803 6.5068 20.2104 6.5068H17.9709C18.617 5.87816 19.0073 5.02736 19.0073 4.03688C19.0073 1.80371 17.2358 0.212402 15.0066 0.212402C13.3586 0.212402 11.9635 1.14414 11.4079 2.77737C10.8543 1.14414 9.46641 0.212402 7.8092 0.212402C5.59128 0.212402 3.81053 1.80371 3.81053 4.03688C3.81053 5.02736 4.20085 5.87816 4.85615 6.5068H2.61669C1.29262 6.5068 0.471191 7.12084 0.471191 8.49581V11.0058Z"
      fill="white"
    />
  </svg>
);

export default function RewardStats({ visibleOnMobile }: { visibleOnMobile: boolean }) {
  const { rewards } = useContext(SettingsContext);

  if (!rewards) {
    log.error('No rewards found');
    return null;
  }

  const { timeUntilNextRewardPercent, meta } = rewards as any;

  return (
    <AnimatedElement className={clsx(s.Outer, visibleOnMobile && s.VisibleOnMobile)} delay={400}>
      <h3>Current stats</h3>
      <ul>
        {timeUntilNextRewardPercent ? (
          <li>
            <span>{giftIcon} Time until next reward:</span>
            <div className={s.Progress}>
              <div
                style={{
                  width: `${timeUntilNextRewardPercent}%`,
                }}
              />
            </div>
          </li>
        ) : null}
        {meta.map(({ _key, title, copy }) => {
          return (
            <li key={_key}>
              <span>
                {title}:<strong>{copy}</strong>
              </span>
            </li>
          );
        })}
      </ul>
    </AnimatedElement>
  );
}
