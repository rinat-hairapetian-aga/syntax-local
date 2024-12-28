import { Link } from "gatsby";
import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import * as s from "./mobile-menu.module.css";

var styles = {
  bmBurgerButton: {
    position: "absolute",
    width: "30px",
    height: "24px",
    right: "20px",
    top: "26px",
    cursor: 'pointer',
  },
  bmBurgerBars: {
    background: "#fff",
    height: "3px",
    opacity: "1",
  },
  bmBurgerBarsHover: {
    background: "#ffffff",
  },
  bmCrossButton: {
    top: "20px",
    right: "20px",
    height: "28px",
    width: "28px",
  },
  bmCross: {
    height: "28px",
    // background: "#000",
    background: "#fff",
  },
  bmMenuWrap: {
    position: "fixed",
    top: "0",
    height: "100%",
    width: '320px',
  },
  bmMenu: {
    // background: "#E6D9CD",
    background: "#072341",
    // padding: "0px 50px 0px 18px",
    padding: "0px 18px",
    // fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
  },
  bmItem: {
    display: "flex",
    flexDirection: "columns",
    color: "#fff",
  },
  bmOverlay: {
    top: "0",
    background: "rgba(0, 0, 0, 0.3)",
  },
};

const MobileNav = ({ menuItems, posts }) => {
  const [opened, setOpened] = useState([]);

  const toggleSubMenu = i => {
    let newOpened;
    if (isOpened(i)) {
      newOpened = opened.filter(o => o !== i);
    } else {
      newOpened = [...opened, i];
    }
    setOpened(newOpened);
  };

  const isOpened = i => {
    return opened.some(o => o === i);
  };

  return (
    <Menu className="mobileNav" right styles={styles}>
      <div className={`d-flex flex-column pb-4 pt-5 mt-3`}>
        {menuItems.map((mi, i) => {
          let hasSubMenu = !!mi.items && mi.items.length > 0;
          return (
            <div
              key={`header-menu-item-${i}`}
              className={`${isOpened(i) ? s.opened : ""} ${s.menuItem} ${hasSubMenu ? s.hasSubmenu : ""
                } mb-3`}
            >
              {hasSubMenu && (
                <>
                  <span
                    onClick={() => {
                      toggleSubMenu(i);
                    }}
                  >
                    {mi.label}
                  </span>
                  <div className={`${s.subMenu}`}>
                    {mi.items.map((smi, j) => (
                      <div
                        key={`header-submenu-item-${i}-${j}`}
                        className={`${s.menuItem}`}
                      >
                        {
                          <>
                            {!!smi.uri && smi.uri != '#' && <Link to={smi.uri}>{smi.label}</Link>}
                            {(!smi.uri || smi.uri == '#') && <span>{smi.label}</span>}
                            {(!!smi.items && smi.items.length > 0) &&
                              <div className={`d-flex flex-column`}>
                                {smi.items.map((mmi, k) => (
                                  <div key={mmi.id}>
                                    {!!mmi.uri && mmi.uri != '#' && (
                                      <Link to={mmi.uri}>{mmi.label}</Link>
                                    )}
                                    {(!mmi.uri || mmi.uri == '#') && <span>{mmi.label}</span>}
                                  </div>
                                ))}
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
                    <a href={mi.uri} rel="noreferrer" target="_blank" className={mi.cssClasses.includes('cta-btn') ? s.ctaBtn : ''}>
                      {mi.label}
                    </a>
                  )}
                  {!mi.target && <Link to={mi.uri} className={mi.cssClasses.includes('cta-btn') ? s.ctaBtn : ''}>{mi.label}</Link>}
                </>
              )}
            </div>
          );
        })}
      </div>
    </Menu>
  );
};

export default MobileNav;
