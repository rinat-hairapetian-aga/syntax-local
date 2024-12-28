import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import * as s from "./author.module.css";

const AuthorBio = ({ author }) => {
  const authorAvatarImage = {
    data: author?.users?.avatar?.localFile?.childImageSharp?.gatsbyImageData,
    alt: author?.users?.avatar?.altText || ``,
  };
  return (
    <>
      <div className={`${s.authorWrapper}`}>
        {!!authorAvatarImage.data &&
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            image={authorAvatarImage.data}
            alt={author.name}
            className={`me-3 d-none d-md-block ${s.authorImg}`} />
        }
        {!authorAvatarImage.data &&
          <img src={author.avatar.url} alt={author.name} className={`me-3 d-none d-md-block ${s.authorImg}`} />
        }
        <div>
          {!!authorAvatarImage.data &&
            <GatsbyImage
              loading="eager"
              placeholder="dominantColor"
              image={authorAvatarImage.data}
              alt={author.name}
              className={`me-3 d-md-none ${s.authorImg}`} />
          }
          {!authorAvatarImage.data &&
            <img src={author.avatar.url} alt={author.name} className={`me-3 d-md-none ${s.authorImg}`} />
          }
          <Link to={author.uri} className={`${s.authorName}`}>
            {author.name}
          </Link>
          <div className={`${s.authorDescription}`}> {author.seo?.metaDesc}</div>
        </div>
      </div>
    </>
  );
};

export default AuthorBio;
