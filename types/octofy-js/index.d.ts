declare module '@octofy/octofy-js' {
  interface Octofy {
    enable(): string
  }

  interface OctofyConstructor {
    (key: string): Octofy
  }
}