// NEED REVIEW

import type { ConfigItem } from "#/utils/type";
import { GLOB_EXCLUDE } from "#/utils/glob";

export function ignores(): ConfigItem[] {
  return [
    {
      ignores: GLOB_EXCLUDE
    }
  ];
}