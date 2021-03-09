/// <reference path="./octofy-js/index.d.ts" />

declare module '@octofy/octofy-js' {
  const loadOctofy: (key: string) => Promise<Octofy | null>
}

interface Window {
  Octofy?: import('@octofy/octofy-js').OctofyConstructor
}