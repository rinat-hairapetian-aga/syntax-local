import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import parse from "html-react-parser";
import React from "react";

import AnchorLink from '../../AnchorLink';
import * as s from "./ContentMenu.module.css";

const ContentMenu = ({ block }) => {

  const bp = useBreakpoint();
  const [zIndex, setZIndex] = React.useState(9999);

  let blockStyles = {
    '--bg-color': block?.bgColor,
    '--rectangle-bg-color': !!block?.rectangleBgColor ? block?.rectangleBgColor : 'unset',
    '--rectangle-bg-gradient': !!block?.rectangleBgGradient ? block?.rectangleBgGradient : 'unset',
  };


  return (
    <>
      <section className={`${s.block}`} style={{ ...blockStyles, zIndex: zIndex }} id={block?.blockId}>
        <div className="container position-relative d-none d-xxl-block">
          <div className="row">
            <div className="col-12">
              {block?.menuItems?.length > 0 && <div className={s.itemsWrapper}>
                {block?.menuItems?.map((item, i) => {
                  return <AnchorLink className={''} actievClassName={s.active} to={item.to} key={i} topOffset={148}>
                    {parse(item.label)}
                  </AnchorLink>
                })}
              </div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContentMenu;
