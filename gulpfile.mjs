/**
 * 1. Adds vendor prefixes to CSS for cross-browser compatibility.
 * 2. Live reloading for previewing changes in the browser.
 * 3. Minifies CSS files to reduce size.
 * 4. Core Gulp library to manage tasks.
 * 5. Used to clean the assets folder for a fresh export.
 * 6. Concatenate JS and CSS files.
 * 7. Used to optimize images.
 * 8. Process CSS using PostCSS plugins.
 * 9. Rename files, typically for adding `.min` suffix.
 * 10. Compile Sass files to CSS.
 * 11. Generate sourcemaps for CSS and JS.
 * 12. Minifies JavaScript files.
 * 13. Zips files for distribution.
 * 14. Removes comments from CSS files.
 * 15. Sass compiler used with gulp-sass.
 */

import autoprefixer from 'autoprefixer' /* 1 */
import browserSync from 'browser-sync' /* 2 */
import cssnano from 'cssnano' /* 3 */
import gulp from 'gulp' /* 4 */
import clean from 'gulp-clean' /* 5 */
import concat from 'gulp-concat' /* 6 */
import imagemin, {
  gifsicle,
  mozjpeg,
  optipng,
  svgo,
} from 'gulp-imagemin' /* 7 */
import postcss from 'gulp-postcss' /* 8 */
import rename from 'gulp-rename' /* 9 */
import gulpSass from 'gulp-sass' /* 10 */
import sourcemaps from 'gulp-sourcemaps' /* 11 */
import terser from 'gulp-terser' /* 12 */
import zip from 'gulp-zip' /* 13 */
import comments from 'postcss-discard-comments' /* 14 */
import sass from 'sass' /* 15 */

const { dest, parallel, series, src, watch } = gulp

const bs = browserSync.create()
const sassCompiler = gulpSass(sass)

/* Root path. */
const paths = {
  root: '.',
}

/* Folder paths. */
const basePaths = ['src', 'assets']

/* Folder names. */
const folders = ['fonts', 'img', 'scripts', 'styles', 'vendor']

/* Assigns paths for each base path, converting folder names to camelCase format. */
basePaths.forEach((base) => {
  if (!paths[base]) {
    paths[base] = {
      base: `./${base}`,
    }
  }

  const currentBase = paths[base]

  if (typeof currentBase !== 'object') {
    console.error(`Error: base '${base}' is not an object!`)
    return
  }

  folders.forEach((folderName) => {
    const toCamelCase = folderName.replace(/\b-([a-z])/g, (_, c) =>
      c.toUpperCase(),
    )
    currentBase[toCamelCase] = `./${base}/${folderName}`
  })
})

/**
 * Initialize live preview using BrowserSync.
 *
 * 1. Initialize BrowserSync with specified proxy and port.
 * 2. Disable the notification popup from BrowserSync.
 * 3. Callback function to signal completion.
 */
function livePreview(done) {
  bs.init({
    proxy: 'http://localhost:10049' /* 1 */,
    port: 3333 /* 1 */,
    notify: false /* 2 */,
  })
  done() /* 3 */
}

/**
 * Reload the browser preview.
 *
 * 1. Log a message indicating browser reload.
 * 2. Trigger browser reload using BrowserSync.
 * 3. Callback function to signal completion.
 */
function previewReload(done) {
  console.log('\n\t🔄  Reloading browser preview.\n') /* 1 */
  bs.reload() /* 2 */
  done() /* 3 */
}

/**
 * Process and compile SCSS files.
 *
 * 1. Source SCSS files.
 * 2. Initialize sourcemaps for better debugging.
 * 3. Compile SCSS to CSS and handle errors.
 * 4. Add vendor prefixes to CSS for better browser compatibility.
 * 5. Minify CSS to reduce file size.
 * 6: Remove comments from CSS for production.
 * 7. Concatenate all CSS files into one.
 * 8. Add `.min` suffix to the filename for minified version.
 * 9. Write sourcemaps to a separate file.
 * 10. Output the processed CSS files to the destination directory.
 */
function devStyles() {
  return src(`${paths.src.styles}/*.scss`) /* 1 */
    .pipe(sourcemaps.init()) /* 2 */
    .pipe(
      sassCompiler({
        silenceDeprecations: ['legacy-js-api'],
      }).on('error', sassCompiler.logError) /* 3 */,
    )
    .pipe(
      postcss([
        autoprefixer() /* 4 */,
        cssnano() /* 5 */,
        comments({ removeAll: true }) /* 6 */,
      ]),
    )
    .pipe(concat({ path: 'styles.css' })) /* 7 */
    .pipe(rename({ suffix: '.min' })) /* 8 */
    .pipe(sourcemaps.write('.')) /* 9 */
    .pipe(dest(paths.assets.styles)) /* 10 */
}

/**
 * Process and compile JavaScript files.
 *
 * 1. Source JS files.
 * 2. Initialize sourcemaps for better debugging.
 * 3. Minify JavaScript with Terser.
 * 4. Concatenate all JavaScript files into one.
 * 5. Add `.min` suffix to the filename for minified version.
 * 6. Write sourcemaps to a separate file.
 * 7. Output the processed JavaScript files to the destination directory.
 */
function devScripts() {
  return src(`${paths.src.scripts}/**/*.js`) /* 1 */
    .pipe(sourcemaps.init()) /* 2 */
    .pipe(terser()) /* 3 */
    .pipe(concat({ path: 'scripts.js' })) /* 4 */
    .pipe(rename({ suffix: '.min' })) /* 5 */
    .pipe(sourcemaps.write('.')) /* 6 */
    .pipe(dest(paths.assets.scripts)) /* 7 */
}

/**
 * Optimize and compress image files.
 *
 * 1. Source image files.
 * 2. Define plugins for image optimization with specified quality.
 * 3. Optimize images using the defined plugins.
 * 4. Output optimized images to the destination directory.
 */
function devImages() {
  return src(`${paths.src.img}/**/*.{png,jpg,jpeg,gif,svg}`) /* 1 */
    .pipe(
      imagemin([
        gifsicle(),
        mozjpeg({ quality: 75 }) /* 2 */,
        optipng({ quality: 3 }) /* 2 */,
        svgo({
          plugins: [
            {
              name: 'removeViewBox',
              active: false,
            },
            {
              name: 'cleanupIDs',
              active: false,
            },
          ],
        }) /* 3 */,
      ]),
    )
    .pipe(dest(paths.assets.img)) /* 4 */
}

/* Copy fonts to the assets folder. */
function devFonts() {
  return src(`${paths.src.fonts}/**/*.{ttf,otf,woff,woff2}`).pipe(
    dest(paths.assets.fonts),
  )
}

/* Copy third-party files to the assets folder. */
function devThirdParty() {
  return src(`${paths.src.vendor}/**/*.{js,css}`).pipe(
    dest(paths.assets.vendor),
  )
}

/**
 * Watch for file changes and trigger corresponding tasks.
 *
 * 1. Watch PHP files and trigger devStyles and previewReload tasks.
 * 2. Watch SCSS files, trigger devStyles and previewReload tasks.
 * 3. Watch JS files, trigger devScripts, devStyles, and previewReload tasks.
 * 4. Watch image files, trigger devImages and previewReload tasks.
 * 5. Watch font files, trigger devFonts and previewReload tasks.
 * 6. Watch third-party files, trigger devThirdParty and previewReload tasks.
 * 7. Log an information message indicating watching for changes.
 */
function watchFiles() {
  watch('**/*.php', previewReload) /* 1 */
  watch(paths.src.styles, series(devStyles, previewReload)) /* 2 */
  watch(paths.src.scripts, series(devScripts, previewReload)) /* 3 */
  watch(paths.src.img, series(devImages, previewReload)) /* 4 */
  watch(paths.src.fonts, series(devFonts, previewReload)) /* 5 */
  watch(paths.src.vendor, series(devThirdParty, previewReload)) /* 6 */
  console.log('\n\t🔥  Watching for changes...\n') /* 7 */
}

/**
 * Clean the assets folder for a fresh start.
 *
 * 1. Log an information message indicating the cleaning process.
 * 2. Source the assets folder for cleaning.
 *    - The `read: false` option indicates that the content of the files doesn't need to be read.
 *    - The `allowEmpty: true` option ensures that the task doesn't fail if there are no matching files.
 * 3. Clean the assets folder.
 */
function devClean() {
  console.log(`\n\t✅  Cleaning assets folder for a fresh start.\n`) /* 1 */

  return src(paths.assets.base, {
    read: false /* 2 */,
    allowEmpty: true /* 2 */,
  }).pipe(clean()) /* 3 */
}

/**
 * Gulp configuration for the default task.
 *
 * 1. Clean the assets folder.
 * 2. Run all tasks in parallel.
 * 3. Live preview build.
 * 4. Watch for live changes.
 */
export default series(
  devClean /* 1 */,
  parallel(devStyles, devScripts, devImages, devFonts, devThirdParty) /* 2 */,
  livePreview /* 3 */,
  watchFiles /* 4 */,
)

/**
 * Gulp task to bundle necessary production files for a WordPress theme.
 *
 * 1. Defines the essential files and directories to include in the production ZIP.
 * 2. Compresses the selected files into `theme.zip`.
 * 3. Outputs `theme.zip` to the root directory.
 */
function createZip() {
  return src(['assets/**', '*.php', 'style.css']) /* 1 */
    .pipe(zip('theme.zip')) /* 2 */
    .pipe(dest('./')) /* 4 */
}

export const bundle = series(createZip) /* 5 */
