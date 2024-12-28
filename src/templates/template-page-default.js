import { graphql } from "gatsby";
import parse from "html-react-parser";
import React from "react";

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../assets/css/@wordpress/block-library/build-style/style.css";
import "../assets/css/@wordpress/block-library/build-style/theme.css";
import schemaBuilder from "../utils/schemaBuilder";
import Layout from "./../components/layout";
import Seo from "./../components/seo";

import About from "../components/blocks/About/About";
import AboutAlt from "../components/blocks/AboutAlt/AboutAlt";
import AboutCareer from "../components/blocks/AboutCareer/AboutCareer";
import AcademyCourses from "../components/blocks/AcademyCourses/AcademyCourses";
import AcademyIcons from "../components/blocks/AcademyIcons/AcademyIcons";
import AcademyWhy from "../components/blocks/AcademyWhy/AcademyWhy";
import AlumniCourses from "../components/blocks/AlumniCourses/AlumniCourses";
import AlumniStats from "../components/blocks/AlumniStats/AlumniStats";
import CareerPathForm from "../components/blocks/CareerPathForm/CareerPathForm";
import CareerPaths from "../components/blocks/CareerPaths/CareerPaths";
import CareerService from "../components/blocks/CareerService/CareerService";
import Certificate from "../components/blocks/Certificate/Certificate";
import ConnectToTalent from "../components/blocks/ConnectToTalent/ConnectToTalent";
import ContentMenu from "../components/blocks/ContentMenu/ContentMenu";
import Curriculum from "../components/blocks/Curriculum/Curriculum";
import FAQ from "../components/blocks/FAQ/FAQ";
import FooterBanner from "../components/blocks/FooterBanner/FooterBanner";
import FounderLetter from "../components/blocks/FounderLetter/FounderLetter";
import GallerySlider from "../components/blocks/GallerySlider/GallerySlider";
import GradsInfo from "../components/blocks/GradsInfo/GradsInfo";
import Hero from "../components/blocks/Hero/Hero";
import HeroAcademy from "../components/blocks/HeroAcademy/HeroAcademy";
import HeroAlt from "../components/blocks/HeroAlt/HeroAlt";
import HeroCalendly from "../components/blocks/HeroCalendly/HeroCalendly";
import HeroEnroll from "../components/blocks/HeroEnroll/HeroEnroll";
import HeroHome from "../components/blocks/HeroHome/HeroHome";
import History from "../components/blocks/History/History";
import ImagesSlider from "../components/blocks/ImagesSlider/ImagesSlider";
import JobHelp from "../components/blocks/JobHelp/JobHelp";
import LastPostBlock from "../components/blocks/LastPostBlock/LastPostBlock";
import LearningOptions from "../components/blocks/LearningOptions/LearningOptions";
import Mentors from "../components/blocks/Mentors/Mentors";
import PdfDownloadForm2 from "../components/blocks/PdfDownloadForm2/PdfDownloadForm2";
import Posts from "../components/blocks/Posts/Posts";
import Reviews from "../components/blocks/Reviews/Reviews";
import ReviewsIcons from "../components/blocks/ReviewsIcons/ReviewsIcons";
import Salaries from "../components/blocks/Salaries/Salaries";
import Schedule from "../components/blocks/Schedule/Schedule";
import SimpleTitle from "../components/blocks/SimpleTitle/SimpleTitle";
import Stats from "../components/blocks/Stats/Stats";
import SyntaxInNumbers from "../components/blocks/SyntaxInNumbers/SyntaxInNumbers";
import Tuition from "../components/blocks/Tuition/Tuition";
import WebinarRegisterForm from "../components/blocks/WebinarRegisterForm/WebinarRegisterForm";
import WhySyntax from "../components/blocks/WhySyntax/WhySyntax";
import WorkPlaces from "../components/blocks/WorkPlaces/WorkPlaces";
import FooterSubscribeBlock from '../components/footerSubscribeBlock/FooterSubscribeBlock';
import Popup from "../components/blocks/popup/Popup";

const PageTemplate = ({ data: { page, author, site }, location }) => {

  // scroll to ref example function
  const scrollToRef = (ref) => {
    ref?.scrollIntoView({ behavior: "smooth" });
  };

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
      {
        !!page?.acf_content?.contentBlocks &&
        page?.acf_content?.contentBlocks.map((block, index) => {
          switch (block.__typename) {
            case 'WpPage_AcfContent_ContentBlocks_Hero':
              return <Hero block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_HeroHome':
              return <HeroHome block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_HeroAcademy':
              return <HeroAcademy block={block} key={index} />
              break;

            case 'WpPage_AcfContent_ContentBlocks_HeroEnroll':
              return <HeroEnroll block={block} title={`page - ${page.title}`} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_HeroAlt':
              return <HeroAlt block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_HeroCalendly':
              return <HeroCalendly block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_LastPostBlock':
              return <LastPostBlock block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_Stats':
              return <Stats block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_Workplaces':
              return <WorkPlaces block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_ImagesSlider':
              return <ImagesSlider block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_GallerySlider':
              return <GallerySlider block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_ContentMenu':
              return <ContentMenu block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_ShceduleBlock':
              return <Schedule block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_AboutBlock':
              return <About block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_AboutAltBlock':
              return <AboutAlt block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_AboutCareerBlock':
              return <AboutCareer block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_CurriculumBlock':
              return <Curriculum block={block} course={`page - ${page.title}`} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_CareerServiceBlock':
              return <CareerService block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_JobHelpBlock':
              return <JobHelp block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_MentorsBlock':
              return <Mentors block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_SalariesBlock':
              return <Salaries block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_CareerPathForm':
              return <CareerPathForm block={block} course={`page - ${page.title}`} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_TuitionBlock':
              return <Tuition block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_WebinarRegisterForm':
              return <WebinarRegisterForm block={block} course={`page - ${page.title}`} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_ReviewsIcons':
              return <ReviewsIcons block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_ReviewsBlock':
              return <Reviews block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_CertificateBlock':
              return <Certificate block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_FaqBlock':
              return <FAQ block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_FooterBannerBlock':
              return <FooterBanner block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_FooterSubscribeBlock':
              return <div key={index} id={block?.blockId}><FooterSubscribeBlock page={`page - ${page.title}`} /></div>
              break;
            case 'WpPage_AcfContent_ContentBlocks_PostsBlock':
              return <Posts block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_PdfDownloadBanner':
              return <section key={index}>
                <div className="container-lg">
                  <PdfDownloadForm2 block={{ ...block, show: true }} page={`page - ${page.title}`} />
                </div>
              </section>
              break;
            case 'WpPage_AcfContent_ContentBlocks_SimpleTitleBlock':
              return <SimpleTitle block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_AlumniStatsBlock':
              return <AlumniStats block={block} page={`page - ${page.title}`} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_AlumniCoursesBlock':
              return <AlumniCourses block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_CareerPathsBlock':
              return <CareerPaths block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_FounderLetterBlock':
              return <FounderLetter block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_HistoryBlock':
              return <History block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_WhySyntaxBlock':
              return <WhySyntax block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_GradsInfoBlock':
              return <GradsInfo block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_ConnectToTalentBlock':
              return <ConnectToTalent block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_SyntaxInNumbers':
              return <SyntaxInNumbers block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_LearningOptionsBlock':
              return <LearningOptions block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_AcademyIconsBlock':
              return <AcademyIcons block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_AcademyCoursesBlock':
              return <AcademyCourses block={block} key={index} />
              break;
            case 'WpPage_AcfContent_ContentBlocks_AcademyWhyBlock':
              return <AcademyWhy block={block} key={index} />
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
      <section className="container">
        {!!page.content && (
          <section>{parse(page.content)}</section>
        )}
      </section>
      {true != page?.pagesPopupSettings?.pagePopupSettigns?.hidePopup && <Popup block={page?.pagesPopupSettings?.pagePopupSettigns}/>}
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageById(
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
      acf_content{
        contentBlocks {
          ... on WpPage_AcfContent_ContentBlocks_Hero {
            __typename
            blockId
            backgroundColor
            badges {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            leftColumnContentPposition
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
          ... on WpPage_AcfContent_ContentBlocks_HeroHome {
            __typename
            blockId
            backgroundColor
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
          }
          ... on WpPage_AcfContent_ContentBlocks_HeroAcademy {
            __typename
            blockId
            backgroundColor
            preTitle
            title
            nextBatchDate
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
          ... on WpPage_AcfContent_ContentBlocks_HeroEnroll {
            __typename
            blockId
            backgroundColor
            linesImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            badges {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            leftColumnContentPposition
            title
            textColor
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
            form {
              programmsList {
                text
              }
              whereYouHearList {
                text
              }
              submitButton {
                color
                hoverColor
                textColor
                text
              }
              onSubmit
              thankYouPage {
                ... on WpPage {
                  uri
                }
              }
              thankYouText
            }
          }
          ... on WpPage_AcfContent_ContentBlocks_HeroAlt {
            __typename
            blockId
            backgroundColor
            textColor
            title
            subtitle
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
            bgImage {
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
          }
          ... on WpPage_AcfContent_ContentBlocks_HeroCalendly {
            __typename
            blockId
            backgroundColor
            bgImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            textColor
            title
            subtitle
            calendlyUrl
          }
          ... on WpPage_AcfContent_ContentBlocks_LastPostBlock {
            __typename
            blockId
          }
          ... on WpPage_AcfContent_ContentBlocks_Stats {
            __typename
            blockId
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
          ... on WpPage_AcfContent_ContentBlocks_Workplaces {
            __typename
            blockId
            title
            useLocalLogos
            logos {
              altText
              localFile {
                publicURL
              }
            }
          }
          ... on WpPage_AcfContent_ContentBlocks_ImagesSlider {
            __typename
            useLocal
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
            bgImageMobile {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            title
            titleColor
            slides {
              label
              image {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
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
          ... on WpPage_AcfContent_ContentBlocks_GallerySlider {
            __typename
            blockId
            bgColor
            title
            titleColor
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
            images {
              altText
              localFile {
                publicURL
              }
            }
          }
          ... on WpPage_AcfContent_ContentBlocks_ContentMenu {
            __typename
            blockId
            bgColor
            rectangleBgColor
            rectangleBgGradient
            menuItems {
              to
              label
            }
          }
          ... on WpPage_AcfContent_ContentBlocks_ShceduleBlock {
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
          ... on WpPage_AcfContent_ContentBlocks_AboutBlock {
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
          ... on WpPage_AcfContent_ContentBlocks_AboutAltBlock {
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
          ... on WpPage_AcfContent_ContentBlocks_AboutCareerBlock {
            __typename
            blockId
            lines {
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
            contentItems {
              title
              content
            }
          }
          ... on WpPage_AcfContent_ContentBlocks_CurriculumBlock {
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
          ... on WpPage_AcfContent_ContentBlocks_CareerServiceBlock {
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
          ... on WpPage_AcfContent_ContentBlocks_JobHelpBlock {
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
          ... on WpPage_AcfContent_ContentBlocks_MentorsBlock {
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
          ... on WpPage_AcfContent_ContentBlocks_SalariesBlock {
            __typename
            blockId
            title
            labelsBgColor
            labelsTextColor
            label1
            label2
            salaries {
              color
              title
              value1
              value2
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
          ... on WpPage_AcfContent_ContentBlocks_CareerPathForm {
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
          ... on WpPage_AcfContent_ContentBlocks_TuitionBlock {
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
          ... on WpPage_AcfContent_ContentBlocks_WebinarRegisterForm {
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
          ... on WpPage_AcfContent_ContentBlocks_ReviewsIcons {
            __typename
            blockId
            bgColor
            bgGradient
          }
          ... on WpPage_AcfContent_ContentBlocks_ReviewsBlock {
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
          ... on WpPage_AcfContent_ContentBlocks_CertificateBlock {
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
          ... on WpPage_AcfContent_ContentBlocks_FaqBlock {
            __typename
            blockId
            title
            items {
              question
              answer
            }
          }
          ... on WpPage_AcfContent_ContentBlocks_FooterBannerBlock {
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
            description
            titleColor
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
          ... on WpPage_AcfContent_ContentBlocks_FooterSubscribeBlock {
            __typename
            blockId
          }
          ... on WpPage_AcfContent_ContentBlocks_PostsBlock {
            __typename
            blockId
            title
            postsShowing
            category {
              slug
              name
              uri
              posts {
                nodes {
                  uri
                  date(formatString: "MMM DD, YYYY")
                  title
                  categories {
                    nodes {
                      slug
                      name
                      uri
                    }
                  }
                  readingTime {
                    text
                  }
                  author {
                    node {
                      avatar {
                        size
                        url
                      }
                      name
                      slug
                      uri
                    }
                  }
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
                }
              }
            }
          }
          ... on WpPage_AcfContent_ContentBlocks_PdfDownloadBanner {
            __typename
            blockId
            bgColor
            bgGradient
            title
            submitButton {
              color
              hoverColor
              textColor
              text
            }
            pdfFile {
              localFile {
                publicURL
                base
              }
            }
          }
          ... on WpPage_AcfContent_ContentBlocks_SimpleTitleBlock {
            __typename
            blockId
            title
            subtitle
          }
          ... on WpPage_AcfContent_ContentBlocks_AlumniStatsBlock {
            __typename
            blockId
            bgColor
            title
            top {
              lines {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
                  }
                }
              }
              statsChartDesktop {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
                  }
                }
              }
              statsChartMobile {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
                  }
                }
              }
              stats {
                value
                label
              }
            }
            bottom {
              lines {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
                  }
                }
              }
              salaryGraphDesktop {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
                  }
                }
              }
              salaryGraphMobile {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
                  }
                }
              }
              pieImages {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
                  }
                }
              }
              locationsTitle
              locationsImageUsa {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
                  }
                }
              }
              locationsImageWorld {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
                  }
                }
              }
            }
            form {
              show
              modalButton {
                color
                hoverColor
                textColor
                text
              }
              title
              submitButton {
                color
                hoverColor
                textColor
                text
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
          ... on WpPage_AcfContent_ContentBlocks_AlumniCoursesBlock {
            __typename
            blockId
            bgColor
            title
            titleColor
            items {
              image {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
                  }
                }
              }
              title
              description
              tuition {
                label
                value
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
          }
          ... on WpPage_AcfContent_ContentBlocks_CareerPathsBlock {
            __typename
            blockId
            bgColor
            title
            titleColor
            paths {
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
          }
          ... on WpPage_AcfContent_ContentBlocks_FounderLetterBlock {
            __typename
            blockId
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
            founderImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            title
            letterText
            founderSignImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
          }
          ... on WpPage_AcfContent_ContentBlocks_HistoryBlock {
            __typename
            blockId
            topImageDesktop {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            topImageMobile {
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
            bgColor
            title
            titleColor
            itemDotsGradient
            items {
              icon {
                altText
                height
                localFile {
                  publicURL
                }
              }
              year
              title
              text
            }
          }
          ... on WpPage_AcfContent_ContentBlocks_WhySyntaxBlock {
            __typename
            blockId
            bgColor
            title
            subtitle
            leftLinesImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            rightLinesImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            items {
              image {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100)
                  }
                }
              }
              content {
                title
                text
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
          ... on WpPage_AcfContent_ContentBlocks_GradsInfoBlock {
            __typename
            blockId
            bgColor
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
            textColor
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
            rightContent {
              title
              description
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
          ... on WpPage_AcfContent_ContentBlocks_ConnectToTalentBlock {
            __typename
            blockId
            bgColor
            textColor
            title
            description
            linesImage {
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
              text
            }
          }
          ... on WpPage_AcfContent_ContentBlocks_SyntaxInNumbers {
            __typename
            blockId
            bgColor
            textColor
            title
            description
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
            imageDesktop {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            imageMobile: mobile {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            statsBgGradient
            statsTextColor
            stats {
              value
              title
            }
            bottomImageDesktop {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            bottomImageMobile {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
          }
          ... on WpPage_AcfContent_ContentBlocks_LearningOptionsBlock {
            __typename
            blockId
            title
            optionsList {
              bgColor
              title
              size
              items {
                image {
                  altText
                  localFile {
                    childImageSharp {
                      original {
                        src
                      }
                    }
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
            }
          }
          ... on WpPage_AcfContent_ContentBlocks_AcademyIconsBlock {
            __typename
            blockId
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
            linesImageMobile {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            title
            icons {
              altText
              localFile {
                publicURL
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
          ... on WpPage_AcfContent_ContentBlocks_AcademyCoursesBlock {
            __typename
            blockId
            bgColor
            topBorderColors {
              rectangle1GradientStartColor
              rectangle1GradientStopColor
              rectangle2GradientStartColor
              rectangle2GradientStopColor
            }
            linesImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            title
            items {
              image {
                altText
                localFile {
                  publicURL
                }
              }
              estimateTime
              title
              description
              link {
                target
                title
                url
              }
            }
          }
          ... on WpPage_AcfContent_ContentBlocks_AcademyWhyBlock {
            __typename
            blockId
            bgColor
            title
            titleColor
            linesImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100)
                }
              }
            }
            items {
              image {
                altText
                localFile {
                  publicURL
                }
              }
              title
              description
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