<?php
/**
 * The template for displaying the header.
 *
 * This is the template that displays all of the <head> section, opens the <body> tag and adds the site's header.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 */

if (!defined('ABSPATH')) {
  exit(); // Exit if accessed directly.
} ?>

<!DOCTYPE html>
<html <?php language_attributes(); ?> prefix="og: https://ogp.me/ns#">
<head>
	<meta charset="<?php bloginfo('charset'); ?>" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <?php wp_head(); ?>
</head>
  <body <?php body_class(); ?>>

  <?php wp_body_open(); ?>

  <div id="content" class="site-content">
    <header role="banner">
      Header
    </header>
