// Home lander constellation config (spec §6.1).
// Canonical full 102-node phyllotaxis sphere — the whole identity system revealed.
//
// Colour semantics, and the reason there are three: the resting gradient runs
// across our two brand BLUES (identity at rest), so violet is left free to mean
// exactly one thing — the shadow state the field snaps into under pressure.
export const homeConfig = {
  vertical: 'home',
  nodeCount: 102, // MPHIOS = 102 personas
  arrangement: 'phyllotaxis-sphere',
  accent: '#3b6fe8',    // brand blue — core, at rest
  accent2: '#00AEEF',   // electric blue — far end of the resting gradient
  shadow: '#7c3bed',    // violet — the shadow state under pressure
  bloomIntensity: 0.7,
  density: 'showcase',
  cameraJourney: 'pull-back',
};

export default homeConfig;
