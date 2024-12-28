/**
 * 👋 Hey there!
 * This file is the starting point for your new WordPress/Gatsby site! 🚀
 * For more information about what this file is and does, see
 * https://www.gatsbyjs.com/docs/gatsby-config/
 *
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {

  pathPrefix: `/`,
  siteMetadata: {
    title: "Syntax Technologies",
    url: process.env.GATSBY_SITE_URL,
    siteUrl: process.env.GATSBY_SITE_URL_HTTP,
  },
  /**
   * Adding plugins to this array adds them to your Gatsby site.
   *
   * Gatsby has a rich ecosystem of plugins.
   * If you need any more you can search here: https://www.gatsbyjs.com/plugins/
   */
  plugins: [
    {
      /**
       * First up is the WordPress source plugin that connects Gatsby
       * to your WordPress site.
       *
       * visit the plugin docs to learn more
       * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/README.md
       *
       */
      resolve: `gatsby-source-wordpress`,
      options: {
        // the only required plugin option for WordPress is the GraphQL url.
        url:
          process.env.GATSBY_WPGRAPHQL_URL,
        schema: {
          timeout: 3600000,
          perPage: 50, // currently set to 100
          requestConcurrency: 5, // currently set to 15
          previewRequestConcurrency: 2, // currently set to 5
        },
        develop: {
          hardCacheMediaFiles: true,
        },
        production: {
          hardCacheMediaFiles: true,
        },
      },
    },

    {
      resolve: `gatsby-plugin-readingtime`,
      options: {
        config: {
          // configuration for reading-time package https://github.com/ngryman/reading-time
        },
        types: {
          // Key: GraphQL Type to add reading times to, Value: Resolver function takes source node of Defined GraphQL type and returns content to be processed.
          WpPost: source => {
            // return source.content;
            const { blocks } = source;
            return blocks.map(block => {
              if (["CORE_HEADING", "CORE_LIST", "CORE_PARAGRAPH", 'P', 'H2', 'H3', 'H4', 'UL', 'OL'].includes(block.type)) {
                return block.innerHtml;
              } else {
                return "";
              }
            }).join('');
          },
        },
      },
    },
    /**
     * We need this plugin so that it adds the "File.publicURL" to our site
     * It will allow us to access static url's for assets like PDF's
     *
     * See https://www.gatsbyjs.org/packages/gatsby-source-filesystem/ for more info
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    // {
    //   /* connect gatsby to instagram */
    //   resolve: `gatsby-source-instagram`,
    //   options: {
    //     username: 26248414565,
    //   }
    // },
    // "gatsby-source-instagram": "^0.9.0",//package.json

    /**
     * The following two plugins are required if you want to use Gatsby image
     * See https://www.gatsbyjs.com/docs/gatsby-image/#setting-up-gatsby-image
     * if you're curious about it.
     */
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
          quality: 100,
          webpOptions: {
            quality: 100,
          },
          backgroundColor: `transparent`,
        }
      }
    },
    `gatsby-plugin-image`,
    {
      // See https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/?=gatsby-plugin-manifest
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter WordPress Blog`,
        short_name: `GatsbyJS & WP`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/favicon.png`,
      },
    },

    // See https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/?=gatsby-plugin-react-helmet
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-plugin-webfonts`,
    //   options: {
    //     fonts: {
    //       google: [
    //         {
    //           family: `Plus Jakarta Sans`,
    //           variants: [`400`, `500`, `700`, `900`],
    //           fontDisplay: "swap",
    //         }
    //       ],
    //     },
    //   },
    // },
    {
      resolve: "gatsby-plugin-breakpoints",
      options: {
        queries: {
          sm: '(min-width: 576px)',
          md: '(min-width: 768px)',
          lg: '(min-width: 992px)',
          xl: '(min-width: 1200px)',
          xxl: '(min-width: 1400px)',
        },
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        ignore: [
          'slick-carousel/slick/slick-theme.css',
          'slick-carousel/slick/slick.css',
          'src/assets/css/additional.css',
        ], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
        purgeCSSOptions: {
          // https://purgecss.com/configuration.html#options
          // safelist: ['safelist'], // Don't remove this selector
        },
        // More options defined here https://purgecss.com/configuration.html#options
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GATSBY_GTM_ID,
        includeInDevelopment: true,
        enableWebVitalsTracking: true,
        selfHostedOrigin: process.env.GATSBY_GTM_selfHostedOrigin,
        // gtmAuth: process.env.GATSBY_GTM_AUTH,
        // gtmPreview: process.env.GATSBY_GTM_PREVIEW,
      },
    },
    {
      resolve: `gatsby-plugin-yoast-sitemap`,
      options: {
        baseUrl: process.env.GATSBY_WP_URL,
        gatsbyUrl: process.env.GATSBY_SITE_URL,
        // gatsbyUrl: "http://localhost:8000",
        publicPath: "./public",
      },
    },
  ],
}
