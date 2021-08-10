# Set up a monorepo

1. ##### Create a package
   `yarn init --yes`
2. ##### Get yarn > 2 version
   `yarn set version berry`
3. ##### Add workspace tools
   `yarn plugin import workspace-tools`
4. ##### Add nodelinker to `.yarnrc.yml`
   `nodeLinker: node-modules`
5. ##### Add .gitignore
