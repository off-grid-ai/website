// The shared kit for every page: header, footer and theme (PageShell), text roles, cards,
// real app screens, section backgrounds and phone rails. Pages import from here, never from page.jsx.
export {
  PageShell, ThemeCtx, NAV, FOOTER, DOWNLOADS, SLACK, MODELS, GENERATED,
  Logo, PlatformIcon, Kicker, Title, Lede, SceneCard, SectionBg, MobileRail, useNarrow,
  Shot, ShotSeq, Preload, useCycle, useSteps,
} from './page.jsx';
