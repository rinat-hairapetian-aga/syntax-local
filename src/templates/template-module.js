import { graphql } from "gatsby"
import React from "react"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../assets/css/@wordpress/block-library/build-style/style.css"
import "../assets/css/@wordpress/block-library/build-style/theme.css"
import schemaBuilder from "../utils/schemaBuilder"
import Layout from "./../components/layout"
import Seo from "./../components/seo"

import FAQ from "../components/blocks/FAQ/FAQ"
import FooterBanner from "../components/blocks/FooterBanner/FooterBanner"
import HeroModule from '../components/blocks/HeroModule/HeroModule'
import Mentors from "../components/blocks/Mentors/Mentors"
import ModuleAbout from "../components/blocks/ModuleAbout/ModuleAbout"
import ModuleCareerPathForm from "../components/blocks/ModuleCareerPathForm/ModuleCareerPathForm"
import ModuleCurriculum from "../components/blocks/ModuleCurriculum/ModuleCurriculum"
import ModuleDetails from "../components/blocks/ModuleDetails/ModuleDetails"
import Reviews from "../components/blocks/Reviews/Reviews"
import ReviewsIcons from "../components/blocks/ReviewsIcons/ReviewsIcons"
import WebinarRegisterForm from "../components/blocks/WebinarRegisterForm/WebinarRegisterForm"
import Popup from "../components/blocks/popup/Popup"

const ModuleTemplate = ({ data: { post, site }, location }) => {

  const schema = schemaBuilder({ module: post }, 'module', site);


  let links = [];

  return (
    <Layout>
      <Seo
        title={post.title}
        description={post.excerpt}
        links={links}
        pageSeo={post}
        location={location}
        schema={schema}
      />

      <HeroModule block={post?.acfModule?.heroBlock} courseTitle={post.title} />

      {post?.acfModule?.detailsBlock?.items?.length > 0 && <>
        <ModuleDetails block={post?.acfModule?.detailsBlock} />
      </>}

      {
        !!post?.acfModule?.content &&
        post?.acfModule?.content?.map((block, index) => {
          switch (block.__typename) {
            case 'WpModule_Acfmodule_Content_AboutBlock':
              return <ModuleAbout block={block} key={index} />
              break;
            case 'WpModule_Acfmodule_Content_MentorsBlock':
              return <Mentors block={block} key={index} />
              break;
            case 'WpModule_Acfmodule_Content_WebinarRegisterForm':
              return <WebinarRegisterForm block={block} course={`module - ${post.title}`} key={index} />
              break;
            case 'WpModule_Acfmodule_Content_CareerPathForm':
              return <ModuleCareerPathForm block={block} course={`module - ${post.title}`} key={index} />
              break;
            case 'WpModule_Acfmodule_Content_ReviewsIcons':
              return <ReviewsIcons block={block} key={index} />
              break;
            case 'WpModule_Acfmodule_Content_ReviewsBlock':
              return <Reviews block={block} key={index} />
              break;
            case 'WpModule_Acfmodule_Content_FaqBlock':
              return <FAQ block={block} key={index} />
              break;
            case 'WpModule_Acfmodule_Content_FooterBannerBlock':
              return <FooterBanner block={block} key={index} />
              break;
            case 'WpModule_Acfmodule_Content_CurriculumBlock':
              return <ModuleCurriculum block={block} course={`module - ${post.title}`} key={index} />
              break;

            default:
              return <section className="container d-none" id={block?.blockId} style={{ 'wordBreak': 'break-word' }} key={`block-${index}`}>
                {block.__typename}
                {/* {JSON.stringify(block, null ,2)} */}
                <hr />
              </section>
          }
        })
      }
      {true != post?.pagesPopupSettings?.pagePopupSettigns?.hidePopup && <Popup block={post?.pagesPopupSettings?.pagePopupSettigns} />}
    </Layout>
  )
}

export default ModuleTemplate

export const pageQuery = graphql`
  query ModuleById(
    $id: String!
  ) {
    site {
      siteMetadata {
        siteUrl: url
        title
      }
    }
    post: wpModule(id: { eq: $id }) {
      id
      excerpt
      content
      title
      uri
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100)
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
      pagesPopupSettings {
        pagePopupSettigns {
          hidePopup
          useLocal
          popup {
            ... on WpPopup {
              id
              title
              template {
                ... on WpTemplate_WebinarPopup {
                  templateName
                  acfPopupWebinar {
                    webinarPopup {
                      linesImage {
                        altText
                        localFile {
                          childImageSharp {
                            gatsbyImageData(quality: 100)
                          }
                        }
                      }
                      title
                      speakers {
                        title
                        speakers {
                          ... on WpMentor {
                            title
                            featuredImage {
                              node {
                                altText
                                localFile {
                                  childImageSharp {
                                    gatsbyImageData(quality: 100)
                                  }
                                }
                              }
                            }
                            acfMentor {
                              position
                            }
                          }
                        }
                      }
                      button {
                        color
                        hoverColor
                        textColor
                        link {
                          url
                          title
                        }
                      }
                    }
                  }
                }
                ... on WpTemplate_EnrollPopup {
                  templateName
                  acfPopupEnroll {
                    enrollPopup {
                      title
                      topLinesImage {
                        altText
                        localFile {
                          childImageSharp {
                            gatsbyImageData(quality: 100)
                          }
                        }
                      }
                      discount
                      discountColorStart
                      discountColorStop
                      couponCode
                      linesImage {
                        altText
                        localFile {
                          childImageSharp {
                            gatsbyImageData(quality: 100)
                          }
                        }
                      }
                      ctaTitle
                      ctaSubtitle
                      button {
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
            }
          }
          timeDelay
        }
      }
      acfModule {
        heroBlock {
          backgroundColor
          title
          scheduleButton {
            color
            hoverColor
            textColor
            link {
              target
              title
              url
            }
          }
          enrollButton {
            target
            title
            url
          }
          linesImage {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100)
              }
            }
          }
          rightImage {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100)
              }
            }
          }
          mobileImage {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100)
              }
            }
          }
          bottomContent
          bottomButton {
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
        detailsBlock {
          linesImage {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100)
              }
            }
          }
          title
          subtitle
          items {
            icon {
              altText
              localFile {
                publicURL
              }
            }
            description
          }
        }
        content {
          ... on WpModule_Acfmodule_Content_AboutBlock {
            __typename
            blockId
            image {
              altText
              localFile {
                publicURL
              }
            }
            title
            content
            button {
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
          ... on WpModule_Acfmodule_Content_MentorsBlock {
            __typename
            blockId
            linesImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            bgColor
            title
            button {
              color
              hoverColor
              textColor
              link {
                target
                title
                url
              }
            }
            mentors {
              mentor {
                ... on WpMentor {
                  id
                  title
                  featuredImage {
                    node {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData(quality: 100)
                        }
                      }
                    }
                  }
                  acfMentor {
                    position
                    skills {
                      title
                      style
                    }
                    description
                    companyLogo {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData(quality: 100)
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          ... on WpModule_Acfmodule_Content_WebinarRegisterForm {
            __typename
            blockId
            bgColor
            title
            subtitle
            webinar {
              ... on WpWebinar {
                title
                acf_webinar {
                  heroBlock {
                    form {
                      webhookUrl
                      recordingUrl
                    }
                  }
                }
              }
            }
            submitButton {
              label
              color
              hoverColor
              textColor
            }
            topBorderDesktop {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            topBorderMobile {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            bottomBorderDesktop {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            bottomBorderMobile {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            linesImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            imageDesktop {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            imageMobile {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
          }
          ... on WpModule_Acfmodule_Content_CareerPathForm {
            __typename
            blockId
            topBgDesktop {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            topBgMobile {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            title
            subtitle
            image {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            submitButton {
              color
              hoverColor
              textColor
            }
            pdf {
              localFile {
                publicURL
                base
              }
            }
          }
          ... on WpModule_Acfmodule_Content_ReviewsIcons {
            __typename
            blockId
            bgColor
            bgGradient
          }
          ... on WpModule_Acfmodule_Content_ReviewsBlock {
            __typename
            blockId
            bgColor
            textColor
            title
            mainReview {
              ... on WpTestimonial {
                title
                acfTestimonial {
                  title
                  review
                  position
                  desktopImage {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData(quality: 100)
                      }
                    }
                  }
                  mobileImage {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData(quality: 100)
                      }
                    }
                  }
                  youtubeVideoId
                }
              }
            }
            reviews {
              review {
                ... on WpTestimonial {
                  title
                  acfTestimonial {
                    title
                    review
                    position
                    desktopImage {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData(quality: 100)
                        }
                      }
                    }
                    mobileImage {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData(quality: 100)
                        }
                      }
                    }
                    youtubeVideoId
                  }
                }
              }
            }
            button {
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
          ... on WpModule_Acfmodule_Content_FaqBlock {
            __typename
            blockId
            title
            items {
              question
              answer
            }
          }
          ... on WpModule_Acfmodule_Content_FooterBannerBlock {
            __typename
            blockId
            bgColor
            bgImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            title
            titleColor
            link {
              target
              title
              url
            }
          }
          ... on WpModule_Acfmodule_Content_CurriculumBlock {
            __typename
            blockId
            bgColor
            topDesktop {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            bottomDesktop {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            topMobile {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            bottomMobile {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            title
            subtitle
            weeks {
              title
              weekContent
            }
            buttonText
            form {
              submitButton {
                color
                hoverColor
                textColor
              }
              pdf {
                localFile {
                  publicURL
                  base
                }
              }
            }
          }
        }
      }
    }
  }
`
