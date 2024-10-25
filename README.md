# Weron WP Gulp Boilerplate

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen)](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

**Weron WP Gulp Boilerplate** is a streamlined development setup for [WordPress](https://br.wordpress.org/) projects, utilized by **Weron**. This boilerplate leverages **Gulp v5** for automating and optimizing front-end tasks, including SCSS compilation, script minification, image optimization, and live preview. It’s designed to provide an efficient workflow for building and maintaining high-performance WordPress themes.

Feel free to modify any part of this boilerplate according to your project's needs. If you find features that you don't need, don't hesitate to remove them!

## Features

- **SCSS Support:** Compiles SCSS files with automatic vendor prefixing using [autoprefixer](https://github.com/postcss/autoprefixer).
- **CSS Optimization:** Minifies CSS and removes comments in production using [cssnano](https://github.com/cssnano/cssnano).
- **JavaScript Minification:** Reduces JavaScript file sizes using [gulp-terser](https://github.com/duan602728596/gulp-terser).
- **Image Optimization:** Compresses GIF, JPEG, PNG, and SVG images using [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin).
- **Live Preview and Auto-Reloading:** Provides live preview and automatic reloading using [browser-sync](https://github.com/BrowserSync/browser-sync).
- **Production Bundle:** Packages only necessary assets and files into a ZIP file for deployment using [gulp-zip](https://github.com/sindresorhus/gulp-zip).

## Boilerplate Structure

The boilerplate has an organized structure that separates files and folders by functionality. The main folders include:

- `src`: Theme source code, including fonts, image files, scripts, styles, etc.
- `assets`: Compiled output of the build process.

## Requirements

Make sure you have [node.js](https://github.com/nodejs/node) installed on your machine.

It's also important to have the [gulp-cli](https://github.com/gulpjs/gulp-cli) updated to run **Gulp v5**.
