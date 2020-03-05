# AttiNap

An Atti napping tracking app for tracking Atti's naps.

Bootstrapped on the template project for [nano-react-app](https://github.com/adrianmcli/nano-react-app).

`yarn start` will spawn a development server with a default port of `1234`.
`yarn build` will output a production build in the `dist` directory.

### Timepicker

Timepicker repo [`react-timepicker`](https://github.com/andrew-rayco/react-timepicker) forked from [`react-timepicker`](https://github.com/radekmie/react-timepicker) and updated to resolve unsafe React component lifecycles (until React v17) when the fix will, erm, unfix.

### Prebuild

`prebuild` script in `package.json` destroys `dist` directory before running a new build. Script only works on Linux/Unix systems. Else refer the `parcel-plugin-clean-dist` package.

## Nano-react-app

### Custom port

You can use the `-p` flag to specify a port for development. To do this, you can either run `yarn start` with an additional flag:

```
yarn start -- -p 3000
```

Or edit the `start` script directly:

```
parcel index.html -p 3000
```

### Adding styles

You can use CSS files with simple ES2015 `import` statements in your Javascript:

```js
import './index.css'
```

### Babel transforms

The Babel preset [babel-preset-nano-react-app](https://github.com/adrianmcli/babel-preset-nano-react-app) and a small amount of configuration is used to support the same transforms that Create React App supports.

The Babel configuration lives inside `package.json` and will override an external `.babelrc` file, so if you want to use `.babelrc` remember to delete the `babel` property inside `package.json`.
