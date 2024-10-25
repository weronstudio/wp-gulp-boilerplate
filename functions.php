<?php

if (!defined("ABSPATH")) {
  exit(); // Exit if accessed directly.
}

function foo_head() {
  ?>
    <!-- Preload local font for improved performance. -->
    <link
      rel="preload"
      href="<?php echo get_theme_file_uri(
        "/assets/fonts/inter/inter-variable.woff2",
      ); ?>"
      as="font"
      type="font/woff2"
      crossorigin
    />
  <?php
}

add_action("wp_enqueue_scripts", function () {
  $version = wp_get_theme()->get("Version");

  // Enqueue styles.
  wp_enqueue_style(
    "global",
    get_theme_file_uri("/assets/styles/styles.min.css"),
    [],
    $version,
  );

  // Enqueue script.
  wp_enqueue_script(
    "global",
    get_theme_file_uri("/assets/scripts/scripts.min.js"),
    [],
    $version,
    true,
  );

  // Vendor script.
  wp_enqueue_script(
    "vendor",
    get_theme_file_uri("/assets/vendor/swiper.min.js"),
    [],
    $version,
    true,
  );
});
