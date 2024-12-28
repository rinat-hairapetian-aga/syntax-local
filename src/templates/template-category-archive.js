import { Link, graphql } from "gatsby";
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import React from "react";
import Slider from "react-slick";

import Layout from "../components/layout";

import CareerPathForm from "../components/blocks/CareerPathForm/CareerPathForm";
import FooterBanner from "../components/blocks/FooterBanner/FooterBanner";
import Posts from "../components/blocks/Posts/Posts";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";
import Pagination from "../components/pagination/pagination";
import PostBlog from "../components/post-blog/post-blog";
import Seo from "../components/seo";

const CategoryArchive = ({
  data,
  pageContext: { nextPagePath, previousPagePath, currentPage, pages, totalPosts },
  location
}) => {

  const bp = useBreakpoint();

  const category = data.wpCategory;
  // const posts = data.wpCategory.posts.nodes;
  const posts = [...data?.allWpPost?.nodes];


  const page = category;

  if (currentPage > 1) {
    if (!!page.seo.metaDesc) {
      if (!page.seo.metaDesc.includes(` - Page ${currentPage}`)) {
        page.seo.metaDesc = page.seo.metaDesc + ` - Page ${currentPage}`;
      }
    }
    if (!!page.seo.opengraphTitle) {
      if (!page.seo.opengraphTitle.includes(` - Page ${currentPage}`)) {
        page.seo.opengraphTitle = page.seo.opengraphTitle.replace(' - ', ` - Page ${currentPage} - `);
      }
    }
    if (!!page.seo.twitterDescription) {
      if (!page.seo.twitterDescription.includes(` - Page ${currentPage}`)) {
        page.seo.twitterDescription = page.seo.twitterDescription.replace(' - ', ` - Page ${currentPage} - `);
      }
    }
  }


  const schema = [];

  let title = category.title
  if (currentPage > 1) {
    if (!title.includes(` - Page ${currentPage}`)) {
      title += ` - Page ${currentPage}`;
    }
    if (!page.seo.title.includes(` - Page ${currentPage}`)) {
      page.seo.title = page.seo.title.replace(' - ', ` - Page ${currentPage} - `);
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
      <Seo title={title} location={location} pageSeo={page} schema={schema} />
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Breadcrumbs items={[
                { label: 'Home', to: '/' },
                { label: 'Resources', to: '/blog' },
                { label: <h1>{category.title}</h1>, to: false },
              ]} />
            </div>
          </div>
        </div>
        <div style={{ display: 'none' }}>
          {posts.length > 0 && posts.map((post, i) => {
            return (<Link to={post.uri} key={i}></Link>)
          })}
        </div>
        {(true == bp?.xl) && <div className="container">
          {posts?.length > 0 && <>
            <div className="row" style={{ rowGap: '20px' }}>
              {posts?.map(post => {
                return (
                  <div className="col-12 col-md-6 col-xl-4" key={post.uri}>
                    <PostBlog post={post} />
                  </div>
                )
              })}
            </div>
          </>}
        </div>}
        {(false == bp?.xl) && <>
          {posts?.length > 4 ? <Slider {...mobileSliderSettings}>
            {posts.map((post, i) => {
              return (
                <div className={`w-100 p-2 h-25`} key={post.uri}>
                  <PostBlog post={post} />
                </div>
              );
            })}
          </Slider>
            : <div className="container">
              <div className="row" style={{ rowGap: '20px' }}>
                {posts?.map(post => {
                  return (
                    <div className="col-12 col-md-6 col-xl-4" key={post.uri}>
                      <PostBlog post={post} />
                    </div>
                  )
                })}
              </div>
            </div>}
        </>}
        <div className="container">
          <Pagination pages={pages} previousPagePath={previousPagePath} nextPagePath={nextPagePath} currentPage={currentPage} totalPosts={totalPosts} />
        </div>
        {category?.acfCategory?.careerPathForm?.show && <>
          <div className="mt-md-4"></div>
          <CareerPathForm block={{
            blockId: 'category-career-path-form',
            ...category?.acfCategory?.careerPathForm
          }} course={`category - ${page.title}`} />
        </>}
        {(category?.acfCategory?.relatedCategory?.show && category?.acfCategory?.relatedCategory?.category?.posts?.nodes?.length > 0) && <>
          <Posts block={{
            blockId: 'related-category',
            postsShowing: 3,
            ...category?.acfCategory?.relatedCategory,
          }} />
        </>}
        {category?.acfCategory?.footerBanner?.show && <>
          <FooterBanner block={{
            blockId: 'category-footer-banner',
            ...category?.acfCategory?.footerBanner
          }} />
        </>}
      </div>
    </Layout>
  )
}

export default CategoryArchive

export const pageQuery = graphql`
  query WordPressCategoryPosts(
    $id: String!,
    $offset: Int!,
    $postsPerPage: Int!
  ) {
    wpCategory(id: {eq: $id}) {
      id
      title: name
      slug
      uri
      description
      acfCategory {
        relatedCategory {
          show
          title
          category {
            uri
            slug
            name
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
        careerPathForm {
          show
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
        footerBanner {
          show
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
    allWpPost(
      sort: { fields: date, order: DESC }
      filter: {categories: {nodes: {elemMatch: {id: {eq: $id}}}}}
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
  }
`
