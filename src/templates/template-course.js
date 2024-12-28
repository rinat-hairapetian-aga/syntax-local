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

import About from "../components/blocks/About/About"
import CareerPathForm from "../components/blocks/CareerPathForm/CareerPathForm"
import CareerPath from "../components/blocks/CareerPaths/CareerPath"
import CareerService from "../components/blocks/CareerService/CareerService"
import Certificate from "../components/blocks/Certificate/Certificate"
import ContentMenu from "../components/blocks/ContentMenu/ContentMenu"
import Curriculum from "../components/blocks/Curriculum/Curriculum"
import FAQ from "../components/blocks/FAQ/FAQ"
import FooterBanner from "../components/blocks/FooterBanner/FooterBanner"
import Hero from "../components/blocks/Hero/Hero"
import JobHelp from "../components/blocks/JobHelp/JobHelp"
import Mentors from "../components/blocks/Mentors/Mentors"
import Reviews from "../components/blocks/Reviews/Reviews"
import ReviewsIcons from "../components/blocks/ReviewsIcons/ReviewsIcons"
import Schedule from "../components/blocks/Schedule/Schedule"
import Stats from "../components/blocks/Stats/Stats"
import Tuition from "../components/blocks/Tuition/Tuition"
import TuitionNew from "../components/blocks/TuitionNew/TuitionNew"
import WebinarRegisterForm from "../components/blocks/WebinarRegisterForm/WebinarRegisterForm"
import WorkPlaces from "../components/blocks/WorkPlaces/WorkPlaces"
import Popup from "../components/blocks/popup/Popup"

const CourseTemplate = ({ data: { post, site }, location }) => {

  const schema = schemaBuilder({ course: post }, 'course', site);


  let links = [];

  if (!!post?.acf_course?.heroBlock?.rightImage?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src) {
    links.push({
      rel: 'preload',
      as: 'image',
      media: "(min-width: 992px)",
      fetchpriority: "high",
      href: post?.acf_course?.heroBlock?.rightImage?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src,
      imagesrcset: post?.acf_course?.heroBlock?.rightImage?.localFile?.childImageSharp?.gatsbyImageData?.images?.sources[0]?.srcSet,
    });
  }
  if (!!post?.acf_course?.heroBlock?.mobileImage?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src) {
    links.push({
      rel: 'preload',
      as: 'image',
      media: "(max-width: 992px)",
      fetchpriority: "high",
      href: post?.acf_course?.heroBlock?.mobileImage?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src,
      imagesrcset: post?.acf_course?.heroBlock?.mobileImage?.localFile?.childImageSharp?.gatsbyImageData?.images?.sources[0]?.srcSet,
    });
  }
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

      <Hero block={post?.acf_course?.heroBlock} courseTitle={post.title} />

      {post?.acf_course?.statsBlock?.stats?.length > 0 && <>
        <Stats block={post?.acf_course?.statsBlock} />
      </>}

      {post?.acf_course?.workplacesBlock?.logos?.length > 0 && <>
        <WorkPlaces block={post?.acf_course?.workplacesBlock} />
      </>}

      {post?.acf_course?.contentMenuBlock?.menuItems?.length > 0 &&
        <ContentMenu block={post?.acf_course?.contentMenuBlock} />
      }

      {
        !!post?.acf_course?.content &&
        post?.acf_course?.content?.map((block, index) => {
          switch (block.__typename) {
            case 'WpCourse_AcfCourse_Content_ShceduleBlock':
              return <Schedule block={block} key={index} />
              break;
            case 'WpCourse_AcfCourse_Content_AboutBlock':
              return <About block={block} key={index} />
              break;
            case 'WpCourse_AcfCourse_Content_CurriculumBlock':
              return <Curriculum block={block} course={`course - ${post.title}`} key={index} />
              break;
            case 'WpCourse_AcfCourse_Content_CareerServiceBlock':
              return <CareerService block={block} key={index} />
              break;
            case 'WpCourse_AcfCourse_Content_JobHelpBlock':
              return <JobHelp block={block} key={index} />
              break;
            case 'WpCourse_AcfCourse_Content_CareerPathBlock':
              return <CareerPath block={block} key={index} styles={{ '--title-color': null }} useCentricTitle={true} />
              break;
            case 'WpCourse_AcfCourse_Content_MentorsBlock':
              return <Mentors block={block} key={index} />
              break;
            case 'WpCourse_AcfCourse_Content_CareerPathForm':
              return <CareerPathForm block={block} course={`course - ${post.title}`} key={index} />
              break;
            case 'WpCourse_AcfCourse_Content_TuitionBlock':
              return <Tuition block={block} key={index} />
              break;
            case 'WpCourse_AcfCourse_Content_TuitionBlockNew':
              return <TuitionNew block={block} key={index} />
              break;
            case 'WpCourse_AcfCourse_Content_WebinarRegisterForm':
              return <WebinarRegisterForm block={block} course={`course - ${post.title}`} key={index} />
              break;
            case 'WpCourse_AcfCourse_Content_ReviewsIcons':
              return <ReviewsIcons block={block} key={index} />
              break;
            case 'WpCourse_AcfCourse_Content_ReviewsBlock':
              return <Reviews block={block} key={index} />
              break;
            case 'WpCourse_AcfCourse_Content_CertificateBlock':
              return <Certificate block={block} key={index} />
              break;
            case 'WpCourse_AcfCourse_Content_FaqBlock':
              return <FAQ block={block} key={index} />
              break;
            case 'WpCourse_AcfCourse_Content_FooterBannerBlock':
              return <FooterBanner block={block} key={index} />
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

export default CourseTemplate

export const pageQuery = graphql`
  query CourseById(
    $id: String!
  ) {
    site {
      siteMetadata {
        siteUrl: url
        title
      }
    }
    post: wpCourse(id: { eq: $id }) {
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
      acf_course {
        schemaBlock {
          startDate
          endDate
          duration
          price
          description
          abstract
          about
          teaches
          totalHistoricalEnrollment
          learningResourceType
          ratingCount
          ratingValue
          audience {
            name
          }
        }
        heroBlock {
          backgroundColor
          badges {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100)
              }
            }
          }
          title
          nextBatchDate
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
          infoText
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
        }
        statsBlock {
          bgColor
          stats {
            name
            value
          }
          bottomBorderColors {
            rectangle1GradientStartColor
            rectangle1GradientStopColor
            rectangle2GradientStartColor
            rectangle2GradientStopColor
          }
        }
        workplacesBlock {
          title
          useLocalLogos
          logos {
            altText
            localFile {
              publicURL
            }
          }
        }
        contentMenuBlock {
          bgColor
          rectangleBgColor
          rectangleBgGradient
          menuItems {
            to
            label
          }
        }
        content {
          ... on WpCourse_AcfCourse_Content_ShceduleBlock {
            __typename
            blockId
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
            bgDesktop {
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
            bgMobile {
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
          }
          ... on WpCourse_AcfCourse_Content_AboutBlock {
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
          }
          ... on WpCourse_AcfCourse_Content_CurriculumBlock {
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
            items {
              icon {
                altText
                localFile {
                  publicURL
                }
              }
              title
              description
            }
            buttonText
            form {
              submitButton {
                color
                hoverColor
                textColor
              }
              rightImage {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
                  }
                }
              }
              pdf {
                localFile {
                  publicURL
                  base
                }
              }
            }
          }
          ... on WpCourse_AcfCourse_Content_CareerServiceBlock {
            __typename
            blockId
            title
            stage1 {
              label
              labelBgColor
              labelBgGradient
              labelTextColor
              duration
              items {
                title
                arrowPosition
                arrowColor
                bgColor
                bgGradient
                textColor
                size
              }
            }
            stage2 {
              label
              labelBgColor
              labelBgGradient
              labelTextColor
              duration
              items {
                title
                arrowPosition
                arrowColor
                bgColor
                bgGradient
                textColor
                size
              }
            }
          }
          ... on WpCourse_AcfCourse_Content_JobHelpBlock {
            __typename
            blockId
            topBorder {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            blockBgColor
            title
            titleColor
            subtitle
            cardBgColor
            image {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            itemsColor
            items {
              stepLabel
              title
              description
            }
          }
          ... on WpCourse_AcfCourse_Content_CareerPathBlock {
            __typename
            bgColor
            mainColor
            title
            titleColor
            itemsPosition
            bgLinesImage {
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
            mobileGraphImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            items {
              name
            }
          }
          ... on WpCourse_AcfCourse_Content_MentorsBlock {
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
          ... on WpCourse_AcfCourse_Content_CareerPathForm {
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
          ... on WpCourse_AcfCourse_Content_TuitionBlock {
            __typename
            blockId
            title
            activeBgColor
            borderColor
            steps {
              title
            }
            additionalDescriptionText
            linesImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            banner {
              title
              price
              period
            }
            paymentOptionsTitle
            optionsHeading {
              title
              description
            }
            options {
              title
              loanAmount
              termMonths
              interestRate
              apr
              interestOnlyPayments
              principalAndInterestPayments
            }
          }
          ... on WpCourse_AcfCourse_Content_TuitionBlockNew {
            __typename
            blockId
            title
            subtitle
            linesImageLeft {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            linesImageRight {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            tuition {
              badge
              title
              price
              subtitle
              description
              dropdown {
                show
                label
                content
              }
            }
            salary {
              badge
              averageSalary {
                label
                value
              }
              studentsHired {
                label
                value
              }
              graph {
                low {
                  label
                  value
                }
                average {
                  label
                  value
                }
                high {
                  label
                  value
                }
              }
              level {
                beginner {
                  label
                  value
                }
                mid {
                  label
                  value
                }
                advanced {
                  label
                  value
                }
              }
            }
            button {
              color
              hoverColor
              textColor
              link {
                title
                url
                target
              }
            }
          }
          ... on WpCourse_AcfCourse_Content_WebinarRegisterForm {
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
          ... on WpCourse_AcfCourse_Content_ReviewsIcons {
            __typename
            blockId
            bgColor
            bgGradient
          }
          ... on WpCourse_AcfCourse_Content_ReviewsBlock {
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
          ... on WpCourse_AcfCourse_Content_CertificateBlock {
            __typename
            blockId
            blockBgColor
            title
            image {
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
          ... on WpCourse_AcfCourse_Content_FaqBlock {
            __typename
            blockId
            title
            items {
              question
              answer
            }
          }
          ... on WpCourse_AcfCourse_Content_FooterBannerBlock {
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
        }
      }
    }
  }
`
