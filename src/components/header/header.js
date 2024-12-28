import { graphql, Link, useStaticQuery } from "gatsby";
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import React, { Fragment } from "react";
import { LogoDesktopSvg, LogoMobileSvg } from "../../utils/svgs";
import Timer from "../blocks/HeroWebinar/Timer";

import * as s from "./header.module.css";
import MobileNav from "./mobile-nav";

const Header = () => {
  const bp = useBreakpoint();

  const {
    wpMenu: { wpMenuItems },
  } = useStaticQuery(graphql`
    query HeaderMenuQuery {
      wpMenu(locations: {eq: HEADER_MENU}) {
        wpMenuItems: menuItems {
          nodes {
            id
            uri
            url
            title
            target
            label
            linkRelationship
            cssClasses
            parentId
            connectedNode {
              node {
                ... on WpPage {
                  id
                  title
                  uri
                  featuredImage {
                    node {
                      gatsbyImage(width: 600,quality: 80)
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData
                        }
                      }
                    }
                  }
                  title
                }
              }
            }
          }
        }
      }
    }
  `)

  const flatListToHierarchical = (
    data = [],
    { idKey = "id", parentKey = "parentId", childrenKey = "items" } = {}
  ) => {
    const tree = []
    const childrenOf = {}
    data.forEach(item => {
      const newItem = { ...item }
      const { [idKey]: id, [parentKey]: parentId = 0 } = newItem
      childrenOf[id] = childrenOf[id] || []
      newItem[childrenKey] = childrenOf[id]
      parentId
        ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
        : tree.push(newItem)
    })
    return tree
  }

  let wpMenuItemsTree = flatListToHierarchical(wpMenuItems.nodes);
  let blockStyles = {
    '--bg-color': "#0a141b",
    '--seconds-gradient': "linear-gradient(90deg, #8EDDFF 0%, #3BB79C 100%)",
  };

  let menuPosts = [];
  // if (!!podcasts && podcasts.length > 0) {
  //   menuPosts = [...menuPosts, ...podcasts];
  // }
  // if (!!growthPodcasts && growthPodcasts.length > 0) {
  //   menuPosts = [...menuPosts, ...growthPodcasts];
  // }
  // if (!!webinars && webinars.length > 0) {
  //   menuPosts = [...menuPosts, ...webinars];
  // }
  // if (!!posts && posts.length > 0) {
  //   menuPosts = [...menuPosts, ...posts];
  // }

  return (
    <Fragment>
      <div className={`w-100 ${s.headerWrapper}`}>
      <div className="promo_code">
        <div className="container-xxl">
            <div className="event_name">
              <span className="ribbon">Christmas & New Year Sale</span>
              <span>FLAT 40% OFF ON ALL COURSES</span>
              <Link to="/enroll">CLAIM OFFER</Link>
            </div>
            <Timer date="01/12/2025 11:59 pm" styles={blockStyles} />
        </div>  
      </div>
        <header className={`${s.header} position-relative`}>
          <div className="container-xxl">
            <div className="d-flex justify-content-between">
              <div className={`${s.logoWrapper} ps-2 px-xl-0`}>
                <Link to="/">
                  <div className="d-none d-xxl-block">
                    <LogoDesktopSvg />
                  </div>
                  <div className="d-xxl-none">
                    <LogoMobileSvg />
                  </div>
                </Link>
              </div>
              {(bp.xl) ?
                <div className="d-none d-xl-flex align-items-center">
                  <nav className={`d-flex align-items-center`}>
                    {wpMenuItemsTree.map((mi, i) => {
                      let hasSubMenu = !!mi.items && mi.items.length > 0;
                      let hasMegaMenu = false;
                      if (hasSubMenu) {
                        let megaMenuItems = mi.items.filter((smi) => { return (!!smi.items && smi.items.length > 0) });
                        hasMegaMenu = megaMenuItems.length > 0 ? true : false;

                        if (mi.cssClasses.includes('has-blog-posts')) {
                          hasMegaMenu = true;
                        }
                        if (mi.cssClasses.includes('has-page-imaegs')) {
                          hasMegaMenu = true;
                        }
                      }
                      return (
                        <div

                          key={`header-menu-item-${i}`}
                          className={`${s.menuItem} ${hasSubMenu ? s.hasSubmenu : ""} ${hasMegaMenu ? s.hasMegaMenu : ''} `}
                        >
                          {hasSubMenu && (
                            <>
                              <span>{mi.label}</span>
                              <div className={`${s.subMenu}`}>
                                {mi.items.map((smi, j) => (
                                  <div
                                    key={`header-submenu-item-${i}-${j}`}
                                    className={`${s.menuItem}`}
                                  >
                                    {
                                      <>
                                        {!!smi.uri && smi.uri != '#' && (
                                          <Link to={smi.uri}>{smi.label}</Link>
                                        )}
                                        {(!smi.uri || smi.uri == '#') && <span>{smi.label}</span>}
                                        {(!!smi.items && smi.items.length > 0) &&
                                          <div className={`d-flex flex-column ${s.megaSubMenu}`}>
                                            {smi.items.map((mmi, k) => {
                                              return <div key={mmi.id} className={s.submenuItem}>
                                                {!!mmi.uri && mmi.uri != '#' && (
                                                  <Link to={mmi.uri}>{mmi.label}</Link>
                                                )}
                                                {(!mmi.uri || mmi.uri == '#') && <span>{mmi.label}</span>}
                                              </div>
                                            })}
                                          </div>
                                        }
                                      </>
                                    }
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                          {!hasSubMenu && !!mi.uri && (
                            <>
                              {!!mi.target && mi.target === "_blank" && (
                                <a href={mi.uri} rel="noreferrer" target="_blank" className={`${mi.cssClasses.includes('bordered') ? s.bordered : ''} ${mi.cssClasses.includes('cta-btn') ? s.ctaBtn : ''}`}>
                                  {mi.label}
                                </a>
                              )}
                              {!mi.target && <Link to={mi.uri} className={`${mi.cssClasses.includes('bordered') ? s.bordered : ''} ${mi.cssClasses.includes('cta-btn') ? s.ctaBtn : ''}`}>{mi.label}</Link>}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </nav>
                </div>
                : ''
              }
            </div>
          </div>
          {(!bp.xl) ?
            <div className="d-xl-none">
              <MobileNav menuItems={wpMenuItemsTree} posts={menuPosts} />
            </div>
            : ''
          }
        </header>
      </div>
    </Fragment>
  );
};

export default Header;
