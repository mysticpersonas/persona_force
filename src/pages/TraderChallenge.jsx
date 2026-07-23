import { useState, useEffect } from 'react';
import ChallengeDay from '../components/ChallengeDay';
import { CHALLENGE_DAYS } from '../data/challengeDays';

/**
 * /trader/trader-challenge#day1 … #day5
 *
 * The hash URLs are already out in emails, so this route stays — but it now
 * renders exactly ONE day based on the hash. There is no scrolling between
 * days and no links between days: a visitor only ever sees the day they
 * were sent. Unknown/missing hash falls back to Day 1.
 */
const readDayFromHash = () => {
  const id = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
  return CHALLENGE_DAYS.find((d) => d.id === id) || CHALLENGE_DAYS[0];
};

const TraderChallenge = () => {
  const [day, setDay] = useState(readDayFromHash);

  useEffect(() => {
    const onHashChange = () => setDay(readDayFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // key forces a clean remount (scroll-to-top + title/meta) when the hash changes
  return <ChallengeDay key={day.id} day={day} />;
};

export default TraderChallenge;
