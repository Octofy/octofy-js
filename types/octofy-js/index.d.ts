declare module "@octofy/octofy-js" {
  interface Octofy {
    variation(
      featureKey: string,
      targetKey: string,
      defaultValue?: any
    ): Promise<string | boolean | undefined>;
    register(
      groupKey: string,
      targetKey: string,
      options?: GroupOptions
    ): Promise<any>;
  }

  interface OctofyConstructor {
    (key: string): Octofy;
  }
}

interface GroupOptions {
  $name?: string;
  $email?: string;
  $avatar?: string;
  $firstName?: string;
  $lastName?: string;
}
