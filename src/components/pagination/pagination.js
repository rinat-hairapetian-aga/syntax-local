import { Link } from "gatsby";
import React from "react";

import * as s from "./Pagination.module.css";


const Pagination = ({ pages, previousPagePath, nextPagePath, currentPage, totalPosts }) => {
  const pagination = [];

  if (pages?.length > 1) {
    if (!!previousPagePath) {
      pagination.push(<Link className="" to={previousPagePath} title={"Previous page"} key={'link-prev'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
          <path d="M9.24367 2.06621V1.03094C9.24367 0.941211 9.14055 0.891658 9.07091 0.946568L3.0334 5.66219C2.98211 5.70209 2.9406 5.75317 2.91205 5.81154C2.88349 5.86992 2.86865 5.93404 2.86865 5.99902C2.86865 6.06401 2.88349 6.12813 2.91205 6.18651C2.9406 6.24488 2.98211 6.29596 3.0334 6.33585L9.07091 11.0515C9.14189 11.1064 9.24367 11.0568 9.24367 10.9671V9.93184C9.24367 9.86621 9.21287 9.80327 9.16198 9.76309L4.34055 5.99969L9.16198 2.23496C9.21287 2.19478 9.24367 2.13184 9.24367 2.06621Z" fill="black" fillOpacity="0.85" />
        </svg>
      </Link>);
    }
    pages.map((p) => {
      if (p.number === currentPage) {
        pagination.push(<b className=" active" style={{ cursor: 'auto' }} title={`Current Page`} key={`blog-page-${p.number}`}>{p.number}</b>)
      } else {
        if (p.number == 1 || p.number == pages.length) {
          if (currentPage < pages.length - 2 && p.number == pages.length) {
            pagination.push(<b className="disabled pb-1" title={`...`} key={`blog-page-${p.number}-next`}>•••</b>)
          }
          pagination.push(<Link className="" to={p.link} title={p.number} key={`blog-page-${p.number}`}>{p.number}</Link>)
          if (currentPage > 3 && p.number == 1) {
            pagination.push(<b className="disabled pb-1" title={`...`} key={`blog-page-${p.number}-prev`}>•••</b>)
          }
        } else {
          if (p.number >= currentPage - 1 && p.number <= currentPage + 1) {
            pagination.push(<Link className=" " to={p.link} title={p.number} key={`blog-page-${p.number}`}>{p.number}</Link>)
          }
        }
      }
    })
    if (!!nextPagePath) {
      pagination.push(<Link className="" to={nextPagePath} title={"Next page"} key={'link-next'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
          <path d="M9.80207 5.66281L3.76457 0.947189C3.74879 0.934768 3.72983 0.92705 3.70986 0.924919C3.6899 0.922788 3.66974 0.926332 3.6517 0.935143C3.63365 0.943955 3.61846 0.957676 3.60787 0.974732C3.59727 0.991787 3.5917 1.01149 3.5918 1.03156V2.06683C3.5918 2.13246 3.6226 2.1954 3.67349 2.23558L8.49492 6.00031L3.67349 9.76505C3.62126 9.80522 3.5918 9.86817 3.5918 9.9338V10.9691C3.5918 11.0588 3.69492 11.1083 3.76457 11.0534L9.80207 6.33781C9.85338 6.29779 9.89489 6.24658 9.92345 6.1881C9.952 6.12962 9.96684 6.06539 9.96684 6.00031C9.96684 5.93523 9.952 5.87101 9.92345 5.81253C9.89489 5.75404 9.85338 5.70284 9.80207 5.66281Z" fill="black" fillOpacity="0.85" />
        </svg>
      </Link>);
    }
  }

  return (
    <div className={`d-flex justify-content-center align-items-center flex-column flex-md-row mt-5 mb-4 ${s.pagination}`} style={{ gap: '8px' }}>
      {!!totalPosts && <div className={s.total}>Total {totalPosts} items</div>}
      <div className="d-flex justify-content-center align-items-center">
        {pagination?.length > 0 && pagination.map((p) => {
          return p;
        })}
      </div>
    </div>
  );
};

export default Pagination;