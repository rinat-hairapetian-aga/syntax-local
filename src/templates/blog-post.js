import { graphql, Link } from "gatsby";
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";
import { Helmet } from "react-helmet";
import reactStringReplace from 'react-string-replace';

import "../assets/css/@wordpress/block-library/build-style/style.css";
import "../assets/css/@wordpress/block-library/build-style/theme.css";
import * as s from "../assets/css/blog-post.module.css";
import schemaBuilder from "../utils/schemaBuilder";
import { CopySvg, FaceBookSvg, LinkedInSvg, LinkedInSvgAlt, TwitterSvg } from '../utils/svgs';

import AnchorLink from "../components/AnchorLink";
import PdfDownloadForm1 from "../components/blocks/PdfDownloadForm1/PdfDownloadForm1";
import PdfDownloadForm2 from "../components/blocks/PdfDownloadForm2/PdfDownloadForm2";
import PdfDownloadForm3 from "../components/blocks/PdfDownloadForm3/PdfDownloadForm3";
import Popup from "../components/blocks/popup/Popup";
import Posts from "../components/blocks/Posts/Posts";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";
import FooterSubscribeBlock from "../components/footerSubscribeBlock/FooterSubscribeBlock";
import Layout from "../components/layout";
import Seo from "../components/seo";

const BlogPostTemplate = ({ data: { previous, next, post, author, site }, location }) => {

  const bp = useBreakpoint();

  let categories = post?.categories?.nodes?.filter((c) => { return c.slug != 'all-posts' });

  const schema = schemaBuilder({ post: post, author: author }, 'post', site);

  let contentWithShortcodeBlocks = reactStringReplace(post.content, '<p>[pdf_download_form_1]</p>', (match, i) => {
    return <PdfDownloadForm1 page={`post - ${post?.title}`} block={post?.acfPost?.pdfForm1} />
  });

  contentWithShortcodeBlocks = reactStringReplace(contentWithShortcodeBlocks, '<p>[pdf_download_form_2]</p>', (match, i) => {
    return <PdfDownloadForm2 page={`post - ${post?.title}`} block={post?.acfPost?.pdfForm2} />

  });

  contentWithShortcodeBlocks = reactStringReplace(contentWithShortcodeBlocks, '<p>[pdf_download_form_3]</p>', (match, i) => {
    return <PdfDownloadForm3 page={`post - ${post?.title}`} block={post?.acfPost?.pdfForm3} />
  });

  let breadcrumbs = [];
  breadcrumbs.push({ label: 'Home', to: '/' });
  breadcrumbs.push({ label: 'Resources', to: '/blog' });
  if (categories?.length > 0) {
    breadcrumbs.push({ label: categories[0].name, to: categories[0].uri });
  }
  breadcrumbs.push({ label: <span>{post.title}</span>, to: false });


  const copyToClipboard = (str) => {
    const el = document.createElement("textarea")
    el.value = str
    el.setAttribute("readonly", "")
    el.style.position = "absolute"
    el.style.left = "-9999px"
    document.body.appendChild(el)
    el.select()
    document.execCommand("copy")
    document.body.removeChild(el)
  }


  const relatedPostsData = {
    blockId: 'related-posts',
    title: 'Related Articles',
    postsShowing: 3,
    category: {
      slug: post?.acfPost?.relatedPosts?.buttonUrl?.slug ?? '',
      name: post?.acfPost?.relatedPosts?.buttonUrl?.name ?? '',
      uri: post?.acfPost?.relatedPosts?.buttonUrl?.uri ?? '',
      posts: {
        nodes: post?.acfPost?.relatedPosts?.posts?.map((item) => { return item.post })
      }
    }
  }

  return (
    <Layout>
      <Seo
        title={post.title}
        description={post.excerpt}
        pageSeo={post}
        location={location}
        schema={schema}
      />
      <article className="blog-post">
        <section className=" d-none d-md-block">
          <div className={`container`}>
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        <section>
          <div className="container-lg px-0">
            <div className="row mx-0 justify-content-center">
              <div className="col-12 col-lg-8 col-xxl-7">
                <PostHero post={post} author={author} categories={categories} />
                <div className="px-2 px-lg-0">
                  {false == bp?.lg && <div className='mt-1'><Author author={author} /></div>}
                  <div className={`${s.postContent}`}>
                    {contentWithShortcodeBlocks?.map((part, i) => {
                      return <div key={`content-part-${i}`}>
                        {
                          (typeof part) == 'string'
                            ? parse(part)
                            : part
                        }
                      </div>
                    })}
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4 col-xxl-4">
                {true == bp?.lg && <>
                  <div>
                    <Author author={author} />
                  </div>
                  <div className={s.sidebarStickyPart}>
                    <div className={s.shareBlock}>
                      <h4 >Share with your community! </h4>
                      <div className={s.socials}>
                        <a
                          className=""
                          href={`https://www.facebook.com/sharer.php?u=${location.href}&t=${parse(post.title)}`}
                          target="_blank"
                          rel="noreferrer"
                          data-original-title="Facebook"
                        >
                          <FaceBookSvg />
                        </a>
                        <a
                          className=""
                          href={`https://twitter.com/share?url=${location.href}&text=${parse(post.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-original-title="Twitter"
                        >
                          <TwitterSvg />
                        </a>
                        <a
                          className=""
                          href={` https://www.linkedin.com/sharing/share-offsite/?url=${location.href}&text=${parse(post.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-original-title="Linkedin"
                        >
                          <LinkedInSvg />
                        </a>
                        <span
                          className="cursor-pointer"
                          onClick={() => { copyToClipboard(location.href) }}
                        >
                          <CopySvg />
                        </span>
                      </div>
                    </div>
                    {post?.toc?.items?.length > 0 &&
                      <div className={s.postContentMenu}>
                        {!!post?.acfPost?.postContentMenu?.title && <h4>{parse(post?.acfPost?.postContentMenu?.title)}</h4>}
                        <div className={s.menuWrapper}>
                          {post?.toc?.items?.map((item, i) => {
                            return <AnchorLink to={item.url} key={i} actievClassName={s.active} topOffset={86}>{parse(item.title)}</AnchorLink>
                          })}
                        </div>
                      </div>
                    }
                  </div>
                </>}
              </div>
            </div>
          </div>
        </section>
        <section className={s.shareSection}>
          <div className="container-lg px-0 px-lg-3">
            <div className={s.shareSectionWrapper}>
              <div className={s.label}>Like what you read?<br className="d-lg-none" /> Share with your community!</div>
              <div className={s.socials}>
                <a
                  className=""
                  href={`https://www.facebook.com/sharer.php?u=${location.href}&t=${parse(post.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  data-original-title="Facebook"
                >
                  <FaceBookSvg fill='#fff' stroke="#fff" />
                </a>
                <a
                  className=""
                  href={`https://twitter.com/share?url=${location.href}&text=${parse(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-original-title="Twitter"
                >
                  <TwitterSvg fill='#fff' stroke="#fff" />
                </a>
                <a
                  className=""
                  href={` https://www.linkedin.com/sharing/share-offsite/?url=${location.href}&text=${parse(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-original-title="Linkedin"
                >
                  <LinkedInSvg fill='#fff' stroke="#fff" />
                </a>
                <span
                  className="cursor-pointer"
                  onClick={() => { copyToClipboard(location.href) }}
                >
                  <CopySvg fill='#fff' stroke="#fff" />
                </span>
              </div>
            </div>
            <hr className="d-none d-lg-block" style={{ background: '#6C7880' }} />
          </div>
        </section>

        {relatedPostsData?.category?.posts?.nodes?.length > 0 && <>
          <Posts block={relatedPostsData} />
          <div className="container">
            <hr className="d-none d-lg-block my-5" style={{ background: '#6C7880' }} />
          </div>
        </>}

        <FooterSubscribeBlock page={`post - ${post.title}`} />
      </article>
      <Popup />
    </Layout >
  )
}

export default BlogPostTemplate


const PostHero = ({ post, author, categories }) => {

  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }


  const authorAvatarImage = {
    data: ``,
    alt: ``,
  };

  let links = [];
  if (!!featuredImage?.data) {
    links.push({
      rel: 'preload',
      as: 'image',
      fetchpriority: "high",
      href: featuredImage?.data?.images?.fallback?.src,
      imagesrcset: featuredImage?.data?.images?.sources[0]?.srcSet,
    });
  }

  return <>
    {links?.length > 0 && <Helmet link={[].concat(links)} />}
    <div className={`${s.postHeading}`}>
      {featuredImage?.data && (
        <GatsbyImage
          loading="eager"
          placeholder="none"
          image={featuredImage.data}
          alt={featuredImage.alt}
          className={`hero-image ${s.bg}`}
        />
      )}
      {!!post?.readingTime?.text && <div className={s.readingTime}>{post?.readingTime?.text}</div>}
      <div className={`${s.postItem}`} >
        <div className={`h-100 d-flex flex-column`}>
          <div className={s.info}>
            <div className="d-flex flex-wrap mb-2 mb-md-3" style={{ gap: '12px' }}>
              {categories?.map((c, i) => <Link to={c.uri} className={s.category} key={`post-cat-${i}`}>{c.name}</Link>)}
            </div>
            <h1 className={s.title}>{parse(post.title)}</h1>
            <div className={`d-flex align-items-center justify-content-start ${s.postAuthor}`}>
              <div className={`${s.postAuthorName}`}>
                {!!authorAvatarImage.data &&
                  <GatsbyImage
                    loading="eager"
                    placeholder="dominantColor"
                    image={authorAvatarImage.data}
                    alt={author.name}
                    className={s.postAuthorImg} />
                }
                {!authorAvatarImage.data &&
                  <img src={author.avatar.url} alt={author.name} className={`${s.postAuthorImg}`} />
                }
                <span>{author.name}</span>
              </div>
              <div className={`${s.date}`}>{post.date}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

const Author = ({ author }) => {
  const authorAvatarImage = {
    data: ``,
    alt: ``,
  };

  return <div className={s.sidebarAuthorWrapper}>
    <div className={s.sidebarAuthorImgWrapper}>
      <Link to={author.uri} className="d-block position-relative">
        {!!authorAvatarImage.data &&
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            image={authorAvatarImage.data}
            alt={author.name}
            className={s.sidebarAuthorImg} />
        }
        {!authorAvatarImage.data &&
          <img src={author.avatar.url} alt={author.name} className={`${s.sidebarAuthorImg}`} />
        }
      </Link>
      {!!author?.seo?.social?.linkedIn &&
        <a href={author?.seo?.social?.linkedIn} target="_blank" rel="noreferrer">
          <LinkedInSvgAlt />
        </a>
      }
    </div>
    <Link to={author.uri} className="text-decoration-none">
      <h3 className={s.sidebarAuthorName}>{author.name}</h3>
      <div className={s.sidebarAuthorDescription}>{!!author?.acfUser?.descriptionForBlogPosts ? author?.acfUser?.descriptionForBlogPosts : author.description}</div>
    </Link>
  </div>
}

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $authorId: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      toc
      title
      date(formatString: "MMMM DD, YYYY")
      published: date(formatString: "MM/DD/YYYY")
      modified(formatString: "MM/DD/YYYY")
      uri
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
      categories {
        nodes {
          slug
          name
          uri
        }
      }
      tags {
        nodes {
          name
        }
      }
      readingTime {
        text
      }
      acfPost {
        postContentMenu {
          title
          menuItems {
            label
            to
          }
        }
        relatedPosts {
          posts {
            post {
              ... on WpPost {
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
          buttonUrl {
            uri
            name
            slug
          }
        }
        pdfForm1 {
          show
          bgColor
          bgGradient
          title
          subtitle
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
        pdfForm2 {
          show
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
        pdfForm3 {
          show
          leftImage {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100)
              }
            }
          }
          bgColor
          title
          subtitle
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
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
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
      acfUser {
        descriptionForBlogPosts
      }
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
    site {
      siteMetadata {
        siteUrl: url
        title
      }
    }
  }
`
