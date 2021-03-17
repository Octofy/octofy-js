declare module "@octofy/octofy-js" {
  interface Octofy {
    variation(
      featureKey: string,
      targetGroupKey: string,
      targetKey: string
    ): Promise<string | boolean>;
    addGroup(
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
