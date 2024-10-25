<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 */

if (!defined("ABSPATH")) {
  exit(); // Exit if accessed directly.
}

get_header();
?>

<div id="primary" class="content-area">
	<div id="content" class="site-content" role="main">
		<?php if (have_posts()): ?>
      <?php while (have_posts()):
        the_post(); ?>
			  <h1>Hello World!</h1>
      <?php
      endwhile; ?>
		<?php else: ?>
			<p>Nothing to see here.</p>
		<?php endif; ?>
	</div><!-- #content -->
</div><!-- #primary -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>
