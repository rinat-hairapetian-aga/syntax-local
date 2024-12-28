import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";
import * as s from "./post-blog.module.css";

const PostBlog = ({ post }) => {
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

  const postImgStyles = [];

  return (
    <>
      <Link to={post.uri} className={`${s.postItem}`} >
        {!!post?.readingTime?.text && <div className={s.readingTime}>{post?.readingTime?.text}</div>}
        <div className={`h-100 d-flex flex-column`}>
          {image?.data && (
            <div className={s.postImg} style={postImgStyles}>
              <GatsbyImage
                loading="eager"
                placeholder="none"
                image={image.data}
                alt={image.alt}
                className="w-100 h-100"
              />
            </div>
          )}
          <div className={s.info}>
            {!!category && <div className={s.category}>{category?.name}</div>}
            <h3 className={s.title}>{parse(post.title)}</h3>
            <div className={`d-flex align-items-center justify-content-start ${s.postAuthor}`}>
              <div className={`${s.postAuthorName}`}>
                {!!authorAvatarImage.data &&
                  <GatsbyImage
                    loading="lazy"
                    placeholder="dominantColor"
                    image={authorAvatarImage.data}
                    alt={author.name}
                    className={s.postAuthorImg} />
                }
                {!authorAvatarImage.data &&
                  <img src={author.avatar.url} alt={author.name} className={`${s.postAuthorImg}`} loading="lazy" />
                }
                <span>{author.name}</span>
              </div>
              <div className={`${s.date}`}>{post.date}</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PostBlog;
