import { Link } from "gatsby";
import React from "react";

import * as s from "./Breadcrumbs.module.css";
import { BreadCrumbArrowSvg } from "../../utils/svgs";
const Breadcrumbs = ({ items }) => {

  return (
    <>
      {items?.length > 0 && <div className={s.breadcrumbs}>
        {items?.map((item, i) => {
          return <Item item={item} key={i} isFirst={0 == i} />
        })}
      </div>}
    </>
  );
};

export default Breadcrumbs;

const Item = ({ item, isFirst }) => {
  return <>
    {!!item.label && <>
      {!isFirst && <BreadCrumbArrowSvg />}
      {!!item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
    </>}
  </>
}