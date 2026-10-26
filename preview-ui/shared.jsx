// The shared kit for every page: header, footer and theme (PageShell), text roles, cards,
// real app screens, section backgrounds and phone rails. Pages import from here, never from page.jsx.
export {
  PageShell, DocEnd, ThemeCtx, PlayCtx, NAV, FOOTER, DOWNLOADS, SLACK, MODELS, GENERATED,
  Logo, PlatformIcon, Kicker, Title, Lede, Reveal, SceneCard, SectionBg, MobileRail, useRailPulse, useNarrow,
  Shot, ShotSeq, Preload, useCycle, useSteps, ZoomCtx, SeqZoom, useSeqStep, SeqOpenCtx, useZoomOwner, useZoomRegister, ScreenCtx, cmdFor, CmdBar, CmdScope, useTypePulse, DISSOLVE, DISSOLVE_V, SceneRoll, SeqCtrlCtx, Zoomed, screenTime, SCREEN_MS, ScreenCountCtx, PickCtx, pickFraction, BrowserScene, EffCite,
} from './page.jsx';
