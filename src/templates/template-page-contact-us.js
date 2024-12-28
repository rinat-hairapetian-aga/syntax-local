import { graphql } from "gatsby";
import parse from "html-react-parser";
import React, { useEffect } from "react";

import "../assets/css/@wordpress/block-library/build-style/style.css";
import "../assets/css/@wordpress/block-library/build-style/theme.css";
import schemaBuilder from "../utils/schemaBuilder";
import Layout from "./../components/layout";
import Seo from "./../components/seo";
import ContactHero from "../components/contact/contactHero/contactHero";

const ContactUsTemplate = ({ data: { page, author, site }, location }) => {


  const schema = schemaBuilder({ page: page, author: author }, 'page', site);

  return (
    <Layout>

      <Seo
        title={page.title}
        description={""}
        pageSeo={page}
        location={location}
        schema={schema}
      />
      <ContactHero block={page?.template?.contactUsPage?.contactUsBlock} page={page?.title}/>
    </Layout>
  )
}

export default ContactUsTemplate

export const pageQuery = graphql`
  query ContactUsPageById(
    $id: String!
    $authorId: String!
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
      template {
        ... on WpContactUsTemplate {
          contactUsPage {
            contactUsBlock {
              title
              subtitle
              bgImageDesktop {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
                  }
                }
              }
              bgImageMobile {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
                  }
                }
              }
              interestedInList {
                text
              }
              submitButton {
                color
                hoverColor
                textColor
                text
              }
              contacts {
                description
                email
                phone
                phoneLabel
              }
            }
          }
        }
      }
    }
    author: wpUser(id: {eq: $authorId}) {
      avatar {
        size
        url
      }
      name
      description
      email
      slug
      uri
      seo {
        metaDesc
        social {
          facebook
          linkedIn
          twitter
          wikipedia
        }
      }
    }
  }
`