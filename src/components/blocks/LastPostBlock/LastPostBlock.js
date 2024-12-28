import { Link, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";
import { Helmet } from "react-helmet";
import * as s from "./LastPostBlock.module.css";

const LastPostBlock = ({ block }) => {

  const { allWpPost: { nodes: posts } } = useStaticQuery(graphql`
    query LastPostQuery {
      allWpPost(sort: {fields: date, order: DESC}, limit: 1) {
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
  `)

  const post = posts[0]

  const image = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  };

  let cats = post?.categories?.nodes.filter((c) => { return c.slug != 'all-posts' });

  const category = cats?.length > 0 ? cats[0] : {};
  const author = post.author.node;

  const authorAvatarImage = {
    data: ``,
    alt: ``,
  };

  let links = [];

  if (!!image?.data) {
    links.push({
      rel: 'preload',
      as: 'image',
      fetchpriority: "high",
      href: image?.data?.images?.fallback?.src,
      imagesrcset: image?.data?.images?.sources[0]?.srcSet,
    });
  }

  return (
    <section className={s.block} id={block?.blockId}>
      {links?.length > 0 && <Helmet link={[].concat(links)} />}
      <div className="container position-relative px-0 px-md-3">
        {image?.data && (
          <GatsbyImage
            loading="eager"
            placeholder="none"
            image={image.data}
            alt={image.alt}
            className={s.bg}
          />
        )}
        {!!post?.readingTime?.text && <div className={s.readingTime}>{post?.readingTime?.text}</div>}
        <Link to={post.uri} className={`${s.postItem}`} >
          <div className={`h-100 d-flex flex-column`}>

            <div className={s.info}>
              {!!category && <div className={s.category}>{category?.name}</div>}
              <h3 className={s.title}>{parse(post.title)}</h3>
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
        </Link>
      </div>
    </section>
  );
};

export default LastPostBlock;
