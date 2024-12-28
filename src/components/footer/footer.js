import { Link, graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import parse from "html-react-parser";
import React, { useRef } from 'react';
import { useInViewport } from 'react-in-viewport';
import { LogoFooterSvg } from "../../utils/svgs";

import * as s from "./footer.module.css";

const Footer = () => {

  const footerRef = useRef();
  const {
    inViewport,
    enterCount,
    leaveCount,
  } = useInViewport(
    footerRef,
    {},
    { disconnectOnLeave: false },
    {}
  );

  const {
    wp: { acfOptionsFooterSettings: { themeFooterSettings: { footerSettings } } },
    footerMenu: { footerMenuItems },
    policiesMenu: { policiesMenuItems },
  } = useStaticQuery(graphql`
    query FooterMenuQuery {
      wp {
        acfOptionsFooterSettings {
          themeFooterSettings {
            footerSettings {
              address
              phone
              email
              copyrightText
            }
          }
        }
      }
      footerMenu: wpMenu(locations: {eq: FOOTER_MENU}) {
        footerMenuItems: menuItems {
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
          }
        }
      }
      policiesMenu: wpMenu(locations: {eq: POLICIES_MENU}) {
        policiesMenuItems: menuItems {
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

  let footerMenuItemsTree = flatListToHierarchical(footerMenuItems.nodes);
  let policiesMenuItemsTree = flatListToHierarchical(policiesMenuItems.nodes);

  return (
    <>
      <footer className="d-flex" ref={footerRef}>
        {enterCount > 0 &&
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-xxl-4">
                <div className={s.leftCol}>
                  <div>
                    <LogoFooterSvg />
                  </div>
                  {!!footerSettings?.address && <div className={s.address}>
                    {parse(footerSettings?.address)}
                  </div>}
                  {!!footerSettings?.phone && <div className={s.contact}>
                    <a href={`tel:${footerSettings?.phone}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path d="M21.5777 15.4218L17.1611 13.4428L17.1489 13.4372C16.9196 13.3391 16.6695 13.2997 16.4212 13.3226C16.1729 13.3456 15.9342 13.43 15.7267 13.5684C15.7023 13.5845 15.6788 13.6021 15.6564 13.6209L13.3745 15.5662C11.9289 14.864 10.4364 13.3828 9.73423 11.9559L11.6824 9.63934C11.7011 9.6159 11.7189 9.59247 11.7358 9.56715C11.8712 9.36025 11.9533 9.12308 11.9749 8.87675C11.9965 8.63043 11.9569 8.38258 11.8595 8.15528V8.14403L9.87485 3.71997C9.74617 3.42303 9.52491 3.17567 9.24409 3.01482C8.96327 2.85396 8.63796 2.78824 8.31673 2.82747C7.04639 2.99463 5.88033 3.6185 5.03635 4.58256C4.19237 5.54661 3.72818 6.78493 3.73048 8.06622C3.73048 15.51 9.78673 21.5662 17.2305 21.5662C18.5118 21.5685 19.7501 21.1043 20.7141 20.2603C21.6782 19.4164 22.3021 18.2503 22.4692 16.98C22.5085 16.6588 22.4429 16.3336 22.2823 16.0528C22.1216 15.772 21.8744 15.5507 21.5777 15.4218ZM17.2305 20.0662C14.0489 20.0627 10.9987 18.7973 8.74903 16.5477C6.49935 14.298 5.23395 11.2477 5.23048 8.06622C5.22695 7.15074 5.55677 6.26527 6.15836 5.57519C6.75994 4.88511 7.59214 4.43759 8.49954 4.31622C8.49917 4.31996 8.49917 4.32373 8.49954 4.32747L10.4683 8.73372L8.53048 11.0531C8.51081 11.0757 8.49294 11.0999 8.47704 11.1253C8.33596 11.3418 8.2532 11.591 8.23677 11.8489C8.22035 12.1068 8.27082 12.3645 8.38329 12.5972C9.23266 14.3343 10.983 16.0715 12.7389 16.92C12.9733 17.0314 13.2325 17.0801 13.4913 17.0614C13.7501 17.0426 13.9996 16.9571 14.2155 16.8131C14.2395 16.7969 14.2627 16.7794 14.2849 16.7606L16.5639 14.8162L20.9702 16.7897C20.9702 16.7897 20.9777 16.7897 20.9805 16.7897C20.8606 17.6983 20.4137 18.5322 19.7235 19.1353C19.0333 19.7384 18.147 20.0693 17.2305 20.0662Z" fill="white" />
                      </svg>
                      {footerSettings?.phone}
                    </a>
                  </div>}
                  {!!footerSettings?.email && <div className={s.contact}>
                    <a href={`mailto:${footerSettings?.email}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path d="M21.7305 5.06641H3.73047C3.53156 5.06641 3.34079 5.14542 3.20014 5.28608C3.05949 5.42673 2.98047 5.61749 2.98047 5.81641V18.5664C2.98047 18.9642 3.1385 19.3458 3.41981 19.6271C3.70111 19.9084 4.08264 20.0664 4.48047 20.0664H20.9805C21.3783 20.0664 21.7598 19.9084 22.0411 19.6271C22.3224 19.3458 22.4805 18.9642 22.4805 18.5664V5.81641C22.4805 5.61749 22.4015 5.42673 22.2608 5.28608C22.1201 5.14542 21.9294 5.06641 21.7305 5.06641ZM12.7305 13.0492L5.65891 6.56641H19.802L12.7305 13.0492ZM9.98453 12.5664L4.48047 17.6111V7.52172L9.98453 12.5664ZM11.0945 13.5836L12.2195 14.6195C12.3579 14.7465 12.5389 14.817 12.7267 14.817C12.9145 14.817 13.0955 14.7465 13.2339 14.6195L14.3589 13.5836L19.7964 18.5664H5.65891L11.0945 13.5836ZM15.4764 12.5664L20.9805 7.52078V17.612L15.4764 12.5664Z" fill="white" />
                      </svg>
                      {footerSettings?.email}
                    </a>
                  </div>}
                </div>
              </div>
              <div className="col-lg-7 col-xxl-8">
                <div
                  className={
                    s.footerMenus +
                    " row justify-content-around justify-content-lg-between"
                  }
                >
                  {footerMenuItemsTree.map((mi, i) => {
                    return <div className={`${s.footerMenu} col-6 col-xl-4`} key={mi.id}>
                      {'#' == mi.uri
                        ? <div className={`${s.footerMenuTitle} text-md-center text-xl-start`}>{mi.label}</div>
                        : <Link className={`${s.footerMenuTitle} text-md-center text-xl-start`} to={mi.uri}>{mi.label}</Link>
                      }
                      {(!!mi.items && mi.items.length > 0) &&
                        <ul className="d-flex flex-column align-items-md-center align-items-xl-start">
                          {mi.items.map((smi) => {
                            return <li className={`${s.menuItem} text-start text-md-center text-xl-start`} key={smi.id}>
                              <Link to={smi.uri}>
                                {smi.label}
                                {!!smi.title && <span className={s.menuItemBadge}>{smi.title}</span>}
                              </Link>
                            </li>
                          })}
                        </ul>
                      }
                    </div>
                  })}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 order-1">
                <hr />
              </div>
              <div className="col-lg-6 order-3 order-md-2">
                <div className={`${s.footerPolicies} d-flex justify-content-center justify-content-md-start align-items-center`} style={{ gap: '8px' }}>
                  {policiesMenuItemsTree.map((mi, i) => {
                    return <Link to={mi.uri} key={mi.id}>{mi.label}</Link>
                  })}
                </div>
                <div className={s.footerCopyright + " text-center text-md-start"}>
                  © {new Date().getFullYear()}. <>{!!footerSettings?.copyrightText && parse(footerSettings?.copyrightText)}</>
                </div>
              </div>
              <div className="col-lg-6 order-2 order-md-3">
                <div
                  className={
                    s.footerSocials + " d-flex justify-content-center justify-content-md-end"
                  }
                >
                  <a
                    href="https://www.facebook.com/syntaxtechs"
                    className="d-inline-flex"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <StaticImage
                      loading="eager"
                      placeholder="none"
                      quality={100}
                      alt="facebook"
                      src="../../assets/images/socials/facebook.png"
                    />
                  </a>
                  {/* <a
                    href="https://twitter.com/AzarianAgency"
                    className="d-inline-flex"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <StaticImage
                      loading="eager"
                      placeholder="none"
                    quality={100}
                      alt="twitter"
                      src="../../assets/images/socials/twitter.png"
                    />
                  </a> */}
                  <a
                    href="https://www.youtube.com/channel/UCJZ53EsAlk5uZgJPfeD9oEg/featured"
                    className="d-inline-flex"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <StaticImage
                      loading="eager"
                      placeholder="none"
                      quality={100}
                      alt="youtube"
                      src="../../assets/images/socials/youtube.png"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/syntaxtechs/"
                    className="d-inline-flex"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <StaticImage
                      loading="eager"
                      placeholder="none"
                      quality={100}
                      alt="instagram"
                      src="../../assets/images/socials/instagram.png"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/syntaxtechs"
                    className="d-inline-flex"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <StaticImage
                      loading="eager"
                      placeholder="none"
                      quality={100}
                      alt="linkedin"
                      src="../../assets/images/socials/linkedin.png"
                    />
                  </a>
                </div>

              </div>
            </div>
          </div>
        }
      </footer>
    </>
  );
};

export default Footer;
