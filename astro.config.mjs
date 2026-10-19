// @ts-check
import { defineConfig } from "astro/config";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // TODO: set to the production URL once the domain is live.
  // site: "https://noah-becker.de",

  // Pages build to `work/index.html` etc.; static hosts (Plesk) only resolve
  // those as `/work/`, so every internal link must end in a slash.
  trailingSlash: "always",
  build: { format: "directory" },
});
