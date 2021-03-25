///<reference path='../types/index.d.ts' />
import { Octofy, OctofyConstructor } from "@octofy/octofy-js";

export type LoadOctofy = (
  ...args: Parameters<OctofyConstructor>
) => Promise<Octofy | null>;

export interface LoadParams {
  debug: boolean;
}

export const initOctofy = (
  maybe: OctofyConstructor | null,
  args: Parameters<OctofyConstructor>
): Octofy | null => {
  if (maybe === null) return null;

  const octofy = maybe.apply(undefined, args);
  return octofy;
};

let octofyPromise: Promise<OctofyConstructor | null> | null = null;

export const loadScript = (
  params: null | LoadParams
): Promise<OctofyConstructor | null> => {
  if (octofyPromise !== null) return octofyPromise;

  octofyPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve(null);
      return;
    }

    if (window.Octofy) {
      resolve(window.Octofy);
      return;
    }

    try {
      let script = findScript();
      if (!script) script = injectScript();

      script.addEventListener("load", () => {
        if (window.Octofy) resolve(window.Octofy);
        reject(new Error("Octofy.js not available."));
      });

      script.addEventListener("error", () => {
        reject(new Error("Failed to load Octofy.js"));
      });
    } catch (error) {
      reject(error);
      return;
    }
  });

  return octofyPromise;
};

const V1_URL = "https://js.octofy.dev/v1";
const V1_URL_REGEX = /^https:\/\/js\.octofy\.dev\/v1\/?(\?.*)?$/;

const findScript = (): HTMLScriptElement | null => {
  const scripts = document.querySelectorAll<HTMLScriptElement>(
    `script[src^="${V1_URL}"]`
  );

  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];

    if (!V1_URL_REGEX.test(script.src)) {
      continue;
    }

    return script;
  }

  return null;
};
const injectScript = (): HTMLScriptElement => {
  const script = document.createElement("script");
  script.src = `${V1_URL}`;

  const headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new Error(
      "Expected document.body not to be null. Octofy.js requires a <body> element."
    );
  }

  headOrBody.appendChild(script);
  return script;
};
