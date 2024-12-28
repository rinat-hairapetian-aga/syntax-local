import { graphql } from "gatsby";
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { StaticImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";

import * as s from "../assets/css/policy.module.css";


// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../assets/css/@wordpress/block-library/build-style/style.css";
import "../assets/css/@wordpress/block-library/build-style/theme.css";

import AnchorLink from "../components/AnchorLink";
import Layout from "../components/layout";
import Seo from "../components/seo";
import schemaBuilder from "../utils/schemaBuilder";
import ThankYou from "../components/thank-you/ThankYou/ThankYou";

const ThankYouPageTemplate = ({ data: { page, site }, location }) => {
  const bp = useBreakpoint();

  const schema = schemaBuilder({ page: page }, 'page', site);

  return (
    <Layout>
      <Seo
        title={page.title}
        description={""}
        pageSeo={page}
        location={location}
        schema={schema}
      />
      <ThankYou block={page?.template?.acfThankYou?.thankYou} />
    </Layout>
  )
}

export default ThankYouPageTemplate

export const pageQuery = graphql`
  query ThankYouPageById(
    $id: String!
  ) {
    site {
      siteMetadata {
        siteUrl: url
        title
      }
    }
    page: wpPage(id: { eq: $id }) {
      id
      content
      title
      uri
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
      template {
        ... on WpThankYouTemplate {
          acfThankYou {
            thankYou {
              bgDesktop {
                altText
                localFile {
                    childImageSharp {
                    gatsbyImageData(quality: 100)
                    }
                }
              }
              bgMobile {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
                  }
                }
              }
              title
              subtitle
              description
              buttons {
                color
                hoverColor
                textColor
                link {
                  target
                  title
                  url
                }
              }
            }
          }
        }
      }
      seo {
        metaKeywords
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphAuthor
        opengraphDescription
        title
        twitterDescription
        twitterTitle
        opengraphSiteName
        opengraphTitle
        opengraphUrl
        focuskw
        opengraphImage {
          localFile {
            childImageSharp {
              fixed {
                src
                width
                height
              }
            }
            extension
          }
        }
        twitterImage {
          localFile {
            childImageSharp {
              fixed {
                src
                width
                height
              }
            }
            extension
          }
        }
        opengraphType
      }
    }
  }
`
