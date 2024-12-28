import { graphql } from "gatsby";
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";
import Slider from "react-slick";
import "../assets/css/@wordpress/block-library/build-style/style.css";
import "../assets/css/@wordpress/block-library/build-style/theme.css";
import schemaBuilder from "../utils/schemaBuilder";
import { FaceBookSvg, InstagramSvg, LinkedInSvg, TwitterSvg } from "../utils/svgs";

import * as s from "../assets/css/blog-author.module.css";
import Layout from "../components/layout";

import FooterSubscribeBlock from "../components/footerSubscribeBlock/FooterSubscribeBlock";
import Pagination from "../components/pagination/pagination";
import PostBlog from "../components/post-blog/post-blog";
import Seo from "../components/seo";

// const chunk = require(`lodash/chunk`)

const BlogAuthorTemplate = ({
  data: { author, posts, site, wp: { readingSettings: { postsPerPage } } },
  pageContext: { nextPagePath, previousPagePath, currentPage, pages, totalPosts },
  location
}) => {
  const bp = useBreakpoint();

  const authorAvatarImage = {
    data: ``,
    alt: ``,
  };

  let avatarUrl = author.avatar.url.replace(`s=${author.avatar.size}`, "s=144");

  const schema = schemaBuilder({ author: author }, 'author', site);

  const page = author;

  if (currentPage > 1) {
    if (!!page.seo.metaDesc) {
      if (!page.seo.metaDesc.includes(` - Page ${currentPage}`)) {
        page.seo.metaDesc = page.seo.metaDesc + ` - Page ${currentPage}`;
      }
    }
    if (!!page.seo.opengraphDescription) {
      if (!page.seo.opengraphDescription.includes(` - Page ${currentPage}`)) {
        page.seo.opengraphDescription = page.seo.opengraphDescription + ` - Page ${currentPage}`;
      }
    }
    if (!!page.seo.twitterDescription) {
      if (!page.seo.twitterDescription.includes(` - Page ${currentPage}`)) {
        page.seo.twitterDescription = page.seo.twitterDescription + ` - Page ${currentPage}`;
      }
    }
  }

  let title = author.name
  if (currentPage > 1) {
    title += ` - Page ${currentPage}`;
    page.seo.title = page.seo.title.replace(' - ', ` - Page ${currentPage} - `);
    if (!page.seo.title.includes(` - Page ${currentPage}`)) {
      page.seo.title += ` - Page ${currentPage}`;
    }
  }

  const mobileSliderSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    swipeToSlide: true,
    lazyLoad: false,
    autoplay: false,
    slidesToShow: 1.2,
    centerMode: false,
    rows: 1,
    slidesPerRow: 4,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1.2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1.5,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 1.8,
        },
      },
    ],
  }

  return (
    <Layout>
      <Seo title={title} description={author.description} location={location} pageSeo={page} schema={schema} />

      <article className="blog-post">
        <section className={s.heading}>
          <StaticImage
            loading="eager"
            placeholder="none"
            className={s.bg}
            quality={100}
            alt="blog-author-hero-lines"
            src={'../assets/images/blog-author-hero-lines2.png'}
          />
          <div className="container position-relative">
            <div className={`${s.headingInner}`}>
              {!!authorAvatarImage.data &&
                <GatsbyImage
                  loading="eager"
                  placeholder="dominantColor"
                  image={authorAvatarImage.data}
                  alt={author.name}
                  className={s.authorImg} />
              }
              {!authorAvatarImage.data &&
                <img src={avatarUrl} alt={author.name} className={s.authorImg} />
              }
              <h1>{parse(author.name)}</h1>
              {!!author.description && <div className="row justify-content-center">
                <div className="col-12 col-xl-10 col-xxl-8">
                  <div className={s.description}>{parse(author.description)}</div>
                </div>
              </div>
              }
              <div>
                {
                  (!!author?.seo?.social?.facebook
                    || !!author?.seo?.social?.instagram
                    || !!author?.seo?.social?.twitter
                    || !!author?.seo?.social?.linkedIn)
                  && <>
                    <div className={`mt-4 mt-md-2 ${s.authorSocials}`}>
                      {!!author?.seo?.social?.facebook &&
                        <a href={author?.seo?.social?.facebook} target="_blank" rel="noreferrer">
                          <FaceBookSvg />
                        </a>
                      }
                      {!!author?.seo?.social?.instagram &&
                        <a href={author?.seo?.social?.instagram} target="_blank" rel="noreferrer">
                          <InstagramSvg />
                        </a>
                      }
                      {!!author?.seo?.social?.twitter &&
                        <a href={`https://twitter.com/${author?.seo?.social?.twitter}`} target="_blank" rel="noreferrer">
                          <TwitterSvg />
                        </a>
                      }
                      {!!author?.seo?.social?.linkedIn &&
                        <a href={author?.seo?.social?.linkedIn} target="_blank" rel="noreferrer">
                          <LinkedInSvg />
                        </a>
                      }
                    </div>
                  </>}
              </div>
            </div>
          </div>
        </section>
        {posts?.nodes?.length > 0 &&
          <>
            <section>
              <div className="container">
                {!!author.name && <h2 className={s.postedBy}>Latest Posts by {parse(author.name)}</h2>}
              </div>
            </section>
            {(true == bp?.xl) && <div className="container mb-3">
              <div className="row" style={{ rowGap: '20px' }}>
                {posts?.nodes?.map(post => {
                  return (
                    <div className="col-12 col-md-6 col-xl-4" key={post.uri}>
                      <PostBlog post={post} />
                    </div>
                  )
                })}
              </div>
            </div>}
            {(false == bp?.xl) && <>
              {posts?.nodes?.length > 4 ? <Slider {...mobileSliderSettings}>
                {posts?.nodes?.map((post, i) => {
                  return (
                    <div className={`w-100 p-2 h-25`} key={post.uri}>
                      <PostBlog post={post} />
                    </div>
                  );
                })}
              </Slider>
                : <div className="container">
                  <div className="row" style={{ rowGap: '20px' }}>
                    {posts?.nodes?.map(post => {
                      return (
                        <div className="col-12 col-md-6 col-xl-4" key={post.uri}>
                          <PostBlog post={post} />
                        </div>
                      )
                    })}
                  </div>
                </div>}
            </>}
            <div className="container pb-5">
              <Pagination pages={pages} previousPagePath={previousPagePath} nextPagePath={nextPagePath} currentPage={currentPage} totalPosts={totalPosts} />
            </div>
          </>
        }
        <FooterSubscribeBlock page={`author - ${page.name}`} />
      </article>
    </Layout>
  );
};

export default BlogAuthorTemplate;

export const pageQuery = graphql`
  query BlogAuthorById(
    $id: String!
    $authorId: Int!
    $offset: Int!,
    $postsPerPage: Int!
  ) {
    author: wpUser(id: {eq: $id}) {
      avatar {
        size
        url
      }
      firstName
      lastName
      name
      description
      email
      slug
      uri
      seo {
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphDescription
        title
        twitterDescription
        twitterTitle
        opengraphTitle
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
        social {
          facebook
          linkedIn
          twitter
          instagram
        }
      }
      acfUser {
        userSchema {
          name
          url
          givenName
          familyName
          description
          languages {
            language
          }
          email
          gender
          workLocation
          colleague
          knowsAbout {
            item
          }
          sameAs {
            item
          }
          ocupation {
            name
            organization {
              name
              url
              phone
            }
          }
        }
      }
    }
    posts: allWpPost(
      filter: {authorDatabaseId: {eq: $authorId}}
      sort: { fields: date, order: DESC }
      limit: $postsPerPage
      skip: $offset
    ) {
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
    site {
      siteMetadata {
        siteUrl: url
        title
      }
    }
    wp {
      readingSettings {
        postsPerPage
      }
    }
  }
`;
