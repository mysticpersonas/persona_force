// Renders the real PersonaForce React pages to static HTML for the GHL export.
// Nothing here changes the site; it only imports the existing components.
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Trader from '../../src/pages/Trader';
import TraderThankYou from '../../src/pages/TraderThankYou';
import { Day1, Day2, Day3, Day4, Day5 } from '../../src/pages/ChallengeDays';
import TraderIntake from '../../src/pages/TraderIntake';
import IntakeThankYou from '../../src/pages/IntakeThankYou';
import OrientationReplay from '../../src/pages/OrientationReplay';
import TraderBlueprint from '../../src/pages/TraderBlueprint';
import TraderBlueprintThankYou from '../../src/pages/TraderBlueprintThankYou';
import PftThirtyDay from '../../src/pages/PftThirtyDay';
import PftSixtyDay from '../../src/pages/PftSixtyDay';
import PftNinetyDay from '../../src/pages/PftNinetyDay';
import OptIn from '../../src/pages/OptIn';
import OptInThankYou from '../../src/pages/OptInThankYou';

const COMPONENTS = {
  trader: Trader,
  traderThankYou: TraderThankYou,
  day1: Day1,
  day2: Day2,
  day3: Day3,
  day4: Day4,
  day5: Day5,
  traderIntake: TraderIntake,
  intakeThankYou: IntakeThankYou,
  orientationReplay: OrientationReplay,
  traderBlueprint: TraderBlueprint,
  traderBlueprintThankYou: TraderBlueprintThankYou,
  pft30: PftThirtyDay,
  pft60: PftSixtyDay,
  pft90: PftNinetyDay,
  optIn: OptIn,
  optInThankYou: OptInThankYou,
};

export function render(key, route) {
  const Page = COMPONENTS[key];
  if (!Page) return null;
  return renderToString(
    <StaticRouter location={route}>
      <Page />
    </StaticRouter>,
  );
}

export { CHALLENGE_DAYS } from '../../src/data/challengeDays';
