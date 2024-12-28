import React from 'react';
import * as s from "./Loading.module.css";


const Loading = ({style, spinnerStyle}) => {

  return (
    <div className={`${s.loading}`} style={style}>
        <div className={`${s.spinner}`} style={spinnerStyle}></div>
    </div>
  );
};

export default Loading;