import type { Plugin } from 'vite';

import { writeSeoArtifacts } from './generate-sitemap';

export function sitemapPlugin(): Plugin {
  let outDir = 'dist';

  return {
    name: 'memryloop-sitemap',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      writeSeoArtifacts(outDir);
    },
  };
}
