import { Link } from 'gatsby';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import parse from "html-react-parser";
import React from "react";
import Slider from "react-slick";

import ButtonCta from "../../buttonCta/buttonCta";
import PostBlog from "../../post-blog/post-blog";
import * as s from "./Posts.module.css";

const Posts = ({ block }) => {
  const bp = useBreakpoint();

  let posts = block?.category?.posts?.nodes;

  if (!posts?.length) {
    return <></>;
  }

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    swipeToSlide: true,
    lazyLoad: false,
    autoplay: false,
    slidesToShow: 1.2,
    centerMode: false,
    rows: 1,
    slidesPerRow: (6 == block?.postsShowing) ? 2 : 1,
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
    <>
      <section className={s.block} id={block?.blockId}>
        <div style={{ display: 'none' }}>
          {posts.length > 0 && posts.map((post, i) => {
            if (i >= block?.postsShowing) {
              return null;
            }
            return (<Link to={post.uri} key={i}></Link>)
          })}
        </div>
        {(true == bp?.xl) && <div className="container">
          <div className="row">
            {!!block?.title && <div className="col-12">
              <h2 className={`${s.title}`}>{parse(block?.title)} </h2>
            </div>}
          </div>
          <div className="row" style={{ rowGap: '20px' }}>
            {posts.length > 0 && posts.map((post, i) => {
              if (i >= block?.postsShowing) {
                return null;
              }
              return (
                <div className="col-12 col-md-6 col-lg-4 col-xl-4" key={post.uri}>
                  <PostBlog post={post} />
                </div>
              )
            })}
          </div>
        </div>}
        {(false == bp?.xl) && <div className="">
          {!!block?.title && <h2 className={`px-2 ${s.title}`}>{parse(block?.title)} </h2>}
          <Slider {...sliderSettings}>
            {posts.map((post, i) => {
              if (i >= block?.postsShowing) {
                return null;
              }
              return (
                <div className={`w-100 p-2 ${6 == block?.postsShowing ? 'h-50' : 'h-100'}`} key={post.uri}>
                  <PostBlog post={post} />
                </div>
              );
            })}
          </Slider>
        </div>}
        <div className={`${s.btnWrapper}  px-2`}>
          <ButtonCta block={{
            link: {
              target: '',
              title: 'View All Posts',
              url: block?.category?.uri,
            },
            color: 'transparetn',
            hoverColor: 'rgba(0, 0, 0, 0.05)',
            textColor: '#696A75',
            borderColor: 'rgba(105, 106, 117, 0.30)',
          }} />
        </div>
      </section>
    </>
  );
};

export default Posts;
