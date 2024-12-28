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

const PolicyPageTemplate = ({ data: { page, site }, location }) => {
  const bp = useBreakpoint();


  const showPageContentMenu = !!page?.template?.policiesPage?.pageContentMenu?.show && page?.template?.policiesPage?.pageContentMenu?.menuItems?.length > 0;

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
      <div className={s.privacyPageHero}>
        <div className={s.heroBackground}>
          <StaticImage
            placeholder="none"
            loading="eager"
            alt="HeroBackground"
            src="../assets/images/privacy-hero-bg.png"
            quality='100'
            className="w-100 h-100" />
        </div>
        <div className="container">
          <div className={s.heroWrap}>
            {!!page.title &&
              <h1 className={s.privacyHeroMainTitle}>
                {page?.title && parse(page.title)}
              </h1>}
            {!!page?.template?.policiesPage?.lastUpdatedText &&
              <p className={s.lastUpdateDate}>
                {parse(page?.template?.policiesPage?.lastUpdatedText)}
              </p>
            }
          </div>
        </div>
      </div>
      <div className="container">
        <div className={`row ${s.privacyWrapper}`}>
          <div className={`col-12 ${showPageContentMenu && 'col-lg-8'}`}>
            <div className={s.privacyDescription}>
              {!!page.content &&
                parse(page.content)
              }
            </div>
          </div>
          {(true == bp?.lg && showPageContentMenu) && <div className="col-lg-4 position-relative pb-3">
            <div className={s.postContentMenu}>
              {!!page?.template?.policiesPage?.pageContentMenu?.title && <h4>{parse(page?.template?.policiesPage?.pageContentMenu?.title)}</h4>}
              <div className={s.menuWrapper}>
                {page?.template?.policiesPage?.pageContentMenu?.menuItems?.map((item, i) => {
                  return <AnchorLink to={item.to} key={i} className='' actievClassName={s.active} topOffset={86}>{parse(item.label)}</AnchorLink>
                })}
              </div>
            </div>
          </div>}
        </div>
      </div>
    </Layout>
  )
}

export default PolicyPageTemplate

export const pageQuery = graphql`
  query PolicyPageById(
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
        ... on WpPoliciesTemplate {
          policiesPage {
            lastUpdatedText
            pageContentMenu {
              show
              title
              menuItems {
                label
                to
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
