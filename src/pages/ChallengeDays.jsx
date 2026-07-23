import ChallengeDay from '../components/ChallengeDay';
import { CHALLENGE_DAYS } from '../data/challengeDays';

/**
 * Clean standalone routes: /trader/day1 … /trader/day5
 * Each is its own private page. The hash form
 * (/trader/trader-challenge#dayN) remains the canonical link used in emails.
 */
export const Day1 = () => <ChallengeDay day={CHALLENGE_DAYS[0]} />;
export const Day2 = () => <ChallengeDay day={CHALLENGE_DAYS[1]} />;
export const Day3 = () => <ChallengeDay day={CHALLENGE_DAYS[2]} />;
export const Day4 = () => <ChallengeDay day={CHALLENGE_DAYS[3]} />;
export const Day5 = () => <ChallengeDay day={CHALLENGE_DAYS[4]} />;
