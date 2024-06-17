import { createFileRoute } from '@tanstack/react-router';
import { RootRoute } from './__root';
import withAuth from '../helpers/withAuth';

export const suspect = '/suspect/$steamId';
export const suspectWithEvidence = '/evidence/$evidenceId';
export const suspects = '/suspects';
export const submit = '/submit';
export const topReviewers = '/top-reviewers';
export const login = '/login';
export const about = '/about';
export const settings = '/settings';
export const profile = '/profile';
export const index = '/';
export const paywall = '/paywall';

const SuspectsLazyImport = createFileRoute(suspects)();
const SuspectLazyImport = createFileRoute(suspect)();
const SuspectWithEvidenceLazyImport = createFileRoute(suspectWithEvidence)();
const SubmitLazyImport = createFileRoute(submit)();
const LoginLazyImport = createFileRoute(login)();
const AboutLazyImport = createFileRoute(about)();
const SettingsImport = createFileRoute(settings)();
const ProfileImport = createFileRoute(profile)();
const TopReviewersImport = createFileRoute(topReviewers)();
const IndexLazyImport = createFileRoute(index)();
const PaywallLazyImport = createFileRoute(paywall)();

const TopReviewersLazyRoute = TopReviewersImport.update({
  path: topReviewers,
  getParentRoute: () => RootRoute
} as any).lazy(() =>
  import(/* @vite-ignore */ withAuth('./topReviewers.lazy')).then((d) => d.Route)
);

const SubmitLazyRoute = SubmitLazyImport.update({
  path: submit,
  getParentRoute: () => RootRoute
} as any).lazy(() => import(/* @vite-ignore */ withAuth('./submit.lazy')).then((d) => d.Route));

const SuspectsLazyRoute = SuspectsLazyImport.update({
  path: suspects,
  getParentRoute: () => RootRoute
} as any).lazy(() => import(/* @vite-ignore */ withAuth('./suspects.lazy')).then((d) => d.Route));

const SuspectEvidenceLazyRoute = SuspectWithEvidenceLazyImport.update({
  path: suspectWithEvidence,
  getParentRoute: () => RootRoute
} as any).lazy(() =>
  import(/* @vite-ignore */ withAuth('./suspectEvidence.lazy')).then((d) => d.suspectEvidenceRoute)
);

const SuspectLazyRoute = SuspectLazyImport.update({
  path: suspect,
  getParentRoute: () => RootRoute
} as any).lazy(() =>
  import(/* @vite-ignore */ withAuth('./suspect.lazy')).then((d) => d.suspectRoute)
);

const LoginLazyRoute = LoginLazyImport.update({
  path: login,
  getParentRoute: () => RootRoute
} as any).lazy(() => import(/* @vite-ignore */ withAuth('./login.lazy')).then((d) => d.Route));

const AboutLazyRoute = AboutLazyImport.update({
  path: about,
  getParentRoute: () => RootRoute
} as any).lazy(() => import(/* @vite-ignore */ withAuth('./about.lazy')).then((d) => d.Route));

const SettingsLazyRoute = SettingsImport.update({
  path: settings,
  getParentRoute: () => RootRoute
} as any).lazy(() => import(/* @vite-ignore */ withAuth('./settings.lazy')).then((d) => d.Route));

const ProfileLazyRoute = ProfileImport.update({
  path: profile,
  getParentRoute: () => RootRoute
} as any).lazy(() => import(/* @vite-ignore */ withAuth('./profile.lazy')).then((d) => d.Route));

const IndexLazyRoute = IndexLazyImport.update({
  path: index,
  getParentRoute: () => RootRoute
} as any).lazy(() => import(/* @vite-ignore */ withAuth('./index.lazy')).then((d) => d.Route));

const PaywallLazyRoute = PaywallLazyImport.update({
  path: paywall,
  getParentRoute: () => RootRoute
} as any).lazy(() => import(/* @vite-ignore */ './paywall.lazy').then((d) => d.Route));

export const routeTree = RootRoute.addChildren([
  IndexLazyRoute,
  AboutLazyRoute,
  LoginLazyRoute,
  SubmitLazyRoute,
  SuspectLazyRoute,
  SettingsLazyRoute,
  SuspectEvidenceLazyRoute,
  SuspectsLazyRoute,
  ProfileLazyRoute,
  TopReviewersLazyRoute,
  PaywallLazyRoute
]);

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    [index]: {
      preLoaderRoute: typeof IndexLazyImport;
      parentRoute: typeof RootRoute;
    };
    [about]: {
      preLoaderRoute: typeof AboutLazyImport;
      parentRoute: typeof RootRoute;
    };
    [suspects]: {
      preLoaderRoute: typeof SuspectsLazyImport;
      parentRoute: typeof RootRoute;
    };
    [login]: {
      preLoaderRoute: typeof LoginLazyImport;
      parentRoute: typeof RootRoute;
    };
    [submit]: {
      preLoaderRoute: typeof SubmitLazyImport;
      parentRoute: typeof RootRoute;
    };
    [settings]: {
      preLoaderRoute: typeof SubmitLazyImport;
      parentRoute: typeof RootRoute;
    };
    [suspect]: {
      preLoaderRoute: typeof SuspectLazyImport;
      parentRoute: typeof RootRoute;
    };
    [suspectWithEvidence]: {
      preLoaderRoute: typeof SuspectWithEvidenceLazyImport;
      parentRoute: typeof RootRoute;
    };
    [profile]: {
      preLoaderRoute: typeof ProfileImport;
      parentRoute: typeof RootRoute;
    };
    [topReviewers]: {
      preLoaderRoute: typeof TopReviewersImport;
      parentRoute: typeof RootRoute;
    };
    [paywall]: {
      preLoaderRoute: typeof PaywallLazyImport;
      parentRoute: typeof RootRoute;
    };
  }
}
