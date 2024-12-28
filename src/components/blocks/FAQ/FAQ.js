
import parse from "html-react-parser";
import React from "react";

import * as s from "./FAQ.module.css";

const FAQ = ({ block }) => {

  return (
    <>
      <section className={`${s.block}`} id={block?.blockId}>
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-12">
              {!!block?.title && <h2 className={s.title}>{parse(block?.title)}</h2>}
            </div>
            <div className="col-lg-12 col-xl-10 col-xxl-9">
              {block?.items?.length > 0 && <div className={s.itemsWrapper}>
                {block?.items?.map((item, i) => {
                  return <Item block={item} key={i} />
                })}
              </div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;

const Item = ({ block }) => {

  const [opened, setOpened] = React.useState(false);

  const toggleOpened = () => {
    setOpened(!opened);
  }

  return <div className={`${s.questionWrapper} ${opened ? s.opened : ''}`}>
    <div className='d-flex justify-content-between align-items-start cursor-pointer' onClick={toggleOpened}>
      <div className={s.question}>{parse(block?.question)}</div>
      <div>
        {opened
          ? <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 29" fill="none">
            <path d="M13.9987 25.8851C20.442 25.8851 25.6654 20.6617 25.6654 14.2184C25.6654 7.7751 20.442 2.55176 13.9987 2.55176C7.55538 2.55176 2.33203 7.7751 2.33203 14.2184C2.33203 20.6617 7.55538 25.8851 13.9987 25.8851Z" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.33203 14.2188H18.6654" stroke="white" strokeWidth="2.33333" strokeLinecap="square" strokeLinejoin="round" />
          </svg>
          : <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 30 30" fill="none">
            <path d="M14.5562 27.1904C21.2383 27.1904 26.6553 21.7735 26.6553 15.0913C26.6553 8.40915 21.2383 2.99219 14.5562 2.99219C7.874 2.99219 2.45703 8.40915 2.45703 15.0913C2.45703 21.7735 7.874 27.1904 14.5562 27.1904Z" stroke="white" strokeWidth="2.41983" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.5586 10.251V19.9303" stroke="white" strokeWidth="2.41983" strokeLinecap="square" strokeLinejoin="round" />
            <path d="M9.71875 15.0908H19.3981" stroke="white" strokeWidth="2.41983" strokeLinecap="square" strokeLinejoin="round" />
          </svg>
        }
      </div>
    </div>
    {!!block?.answer && <div className={s.answer}>{parse(block?.answer)}</div>}
  </div>
}
