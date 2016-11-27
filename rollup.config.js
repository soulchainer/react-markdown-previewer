// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import scss from 'rollup-plugin-scss';
import string from 'rollup-plugin-string';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/index.jsx',
  dest: 'build/js/bundle.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    string({
      include: 'static/doc/*.md',
    }),
    scss({
      outputStyle: 'compressed',
      output: 'build/styles/bundle.css',
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs({
      include: ['node_modules/**', 'static/lib/**'],
      namedExports: {
        'node_modules/react-dom/index.js': ['render'],
        'static/lib/highlight/index.js': ['hljs'],
      },
    }),
    eslint({
      exclude: [
        'styles/**'
      ]
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ],
};
