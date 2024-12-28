import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React from "react";

import * as s from "./ConnectToTalent.module.css";
import Form from './Form';

const ConnectToTalent = ({ block }) => {
  const bp = useBreakpoint();

  const linesImage = {
    data: block.linesImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: block.linesImage?.altText || ``,
  };

  const styles = {
    '--bg-color': block?.bgColor,
    '--text-color': block?.textColor,
  }

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId} style={styles}>
        {(true == bp.lg && !!linesImage?.data) &&
          <GatsbyImage
            loading="eager"
            placeholder="dominantColor"
            className={s.lines}
            style={{ left: 0 }}
            image={linesImage.data}
            alt={linesImage.alt} />
        }
        <div className={s.wrapper}>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-10 col-xl-8 col-xxl-7'>
                        <h2 className={s.title}>{parse(block?.title)}</h2>
                        {block?.description && <div className={s.description}>{parse(block?.description)}</div>}
                        <Form block={block}/>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default ConnectToTalent;
