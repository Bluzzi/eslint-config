export type ParamsPerfectionist = {
  /**
   * Specifies the directory of the root tsconfig.json file (ex: .).
   * This is used for marking aliased imports as internal or internal-type in the groups option.
   * @see https://perfectionist.dev/rules/sort-imports#tsconfigrootdir
   */
  tsconfigPath?: string;
};
