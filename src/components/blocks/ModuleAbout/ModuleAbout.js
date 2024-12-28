

import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import parse from "html-react-parser";
import React, { useRef, useState } from "react";
import { useInViewport } from 'react-in-viewport';

import ButtonCta from '../../buttonCta/buttonCta';
import * as s from "./ModuleAbout.module.css";

const ModuleAbout = ({ block }) => {
  const bp = useBreakpoint();
  const blockRef = useRef();
  const {
    inViewport,
    enterCount,
    leaveCount,
  } = useInViewport(
    blockRef,
    {},
    { disconnectOnLeave: false },
    {}
  );
  const image = {
    data: block.image?.localFile?.childImageSharp?.gatsbyImageData,
    src: block.image?.localFile?.publicURL,
    alt: block.image?.altText || ``,
  };

  const content = block?.content.split('<p>[break]</p>');

  const [showFullContent, setShowFullContent] = useState(false);

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId} ref={blockRef}>
        {enterCount > 0 && <>
          <div className="container position-relative">
            <div className="row align-items-center">
              <div className="col-lg-6 col-xxl-5">
                {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
                {!!block?.content && <div className={s.content}>
                  {!!content[0] && <div>
                    {parse(content[0])}
                    {(content?.length > 1 && !showFullContent) && <div className={`${s.readMore} d-md-none`} onClick={() => { setShowFullContent(true) }}>Read More</div>}
                  </div>}
                  {content?.length > 1 && <>
                    <div className={`d-md-block ${!!showFullContent ? 'd-block' : 'd-none'}`}>
                      {content?.map((c, i) => {
                        if (0 == i) {
                          return null
                        }
                        return <div key={i}>{parse(c)}</div>
                      })}
                    </div>
                  </>}
                  {/* {parse(block?.content)} */}
                </div>}
                {!!block?.button?.link?.url && <div className='mt-lg-4 mt-3 d-flex justify-content-center'>
                    <ButtonCta block={block?.button} className='w-100' />
                </div>}
              </div>
              {( !!image?.src) &&
                <div className="col-12 col-lg-6 col-xxl-6 offset-xxl-1">
                  <img src={image.src} alt={image.alt} className={'mw-100'} />
                </div>
              }
            </div>
          </div>
        </>}
      </section>
    </>
  );
};

export default ModuleAbout;
