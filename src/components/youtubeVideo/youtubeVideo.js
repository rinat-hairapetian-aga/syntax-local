import React from "react";
import { useState } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import YouTube from "react-youtube";
import * as s from "./youtubeVideo.module.css";

const YoutubeVideo = ({ imageUrl, videoId, sectionClasses, sectionStyles, wrapperClasses, wrapperStyles, placeholderStyles, autoplay }) => {
  const [opened, setOpened] = useState(false);

  const toggleOpened = e => {
    e.preventDefault();
    setOpened(!opened);
  };
  if (undefined == imageUrl?.data) {
    imageUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  if (undefined == autoplay) {
    autoplay = 1;
  }
  return (
    <section className={`${s.youtubeVideoBlock} ${!!sectionClasses ? sectionClasses : ''}`} style={sectionStyles ?? {}}>
      {opened === false && (
        <div onClick={toggleOpened} className={`${s.youtubeVideoPlaceholder} ${!!wrapperClasses ? wrapperClasses : ''}`} style={wrapperStyles ?? {}}>
          {/* {image} */}
          {
            !!imageUrl?.data
              ? <GatsbyImage
                loading="eager"
                placeholder="dominantColor"
                image={imageUrl.data}
                alt={imageUrl.alt}
                className={`mw-100 h-100`}
                style={placeholderStyles ?? {}}
              />
              : <img src={imageUrl} loading="lazy" className="w-100 h-100" style={placeholderStyles ?? {}} />
          }
        </div>
      )}
      {opened === true && (
        <YouTube
          videoId={videoId}
          loading="lazy"
          iframeClassName="mw-100 w-100 h-100"
          className={`mw-100 w-100 ${s.youtubeVideoWrapper} ${!!wrapperClasses ? wrapperClasses : ''}`} style={wrapperStyles ?? {}}
          opts={{ playerVars: { autoplay: autoplay } }}
        />
      )}
    </section>
  );
};

export default YoutubeVideo;
