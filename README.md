# Sites monorepo

A Yarn monorepo for several independent websites running with SvelteKit hosted on Cloudflare.

## Helpful Links

- [Svelte Docs](https://svelte.dev/docs/svelte/overview)
- [SvelteKit Docs](https://svelte.dev/docs/kit/introduction)
- [Svelte Tutorial](https://svelte.dev/tutorial/svelte/welcome-to-svelte)
- [Tailwind Docs](https://tailwindcss.com)
- [Cloudflare Dashboard](https://dash.cloudflare.com/)
- [Yarn](https://yarnpkg.com)

## Setup

### Prerequisites

- [Node](https://nodejs.org/en)
- [nvm](https://github.com/nvm-sh/nvm)
- [Yarn 4](https://yarnpkg.com/)

```bash
# Install correct Node version
nvm install
# Use correct Node version
nvm use
# Install Yarn 4
npm install --global yarn
corepack enable
corepack install
# Install depnendencies
yarn install
```

### Troubleshooting

1. Verify your Node version with `which node` and `node -v`. It should live within nvm, like `/Users/you/.nvm/versions/node/23.10.0/bin/node`. If you're using the system version of Node, you must [switch to nvm](#prerequisites).
2. Verify your Corepack version with `which corepack` and `corepack -v`. It should live within the version of Node you're using in your manager, like `/Users/you/.nvm/versions/node/23.10.0/bin/corepack`.
3. Verify the location of yarn with `which yarn` and `yarn -v`. It should also live within the version of Node you're using, like `/Users/you/.nvm/versions/node/23.10.0/bin/yarn`. If the location of Yarn is incorrect or global, you need to uninstall it using the same method you globally installed it with. To reinstall, run `nvm use` then `npm i -g yarn`.

## Development

You can start a local development server for any workspace with:

```bash
yarn workspace ${workspace} dev
```

Workspace names match their `package.json` name field, and for convenience, the names have been abbreviated to the first letters. For example, Bad Bad Power is `bbp`, Comma Comma is `cc`, and Portfolio is `p`.

### The structure of this repo

- `./packages`: Independent SvelteKit sites. Each site is self-contained.
- `./support`: Supporting packages for the sites. These are imported with `workspace:^` so they're always on the latest version. They provide shared utilities and configurations and are not meant to be published independently.

### Tunneling to a remote device

Start the local dev server with `--host` then open your IP address on your remote device. Run `yarn get-host` to print and copy your computer's IP address to your clipboard.

### Upgrading libraries

Yarn has 2 easy commands for upgrading libraries:

- `yarn upgrade-interactive`: lists available versions to toggle
- `yarn up ${package}`: will upgrade a specific package across all workspaces

## Deploying

Deployments to Cloudflare happen automatically on pushes to main. The configuration is set up in the [Cloudflare Admin Panel](https://dash.cloudflare.com/).

## Global scripts

Any scripts with at least one colon (`:`) in the name are automatically upgraded into a [global script](https://yarnpkg.com/features/workspaces#global-scripts) as long as its name doesn't conflict. Supporting packages, located in `./support`, define their scripts within their own `package.json` files, but these scripts are available globally.

To run any of these global scripts, use the following command format:

```bash
yarn <global-script-name>
# Example
yarn lint:js
```
