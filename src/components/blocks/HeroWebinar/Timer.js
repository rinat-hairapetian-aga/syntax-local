import parse from "html-react-parser";
import React, { useEffect } from "react";
import * as s from "./Timer.module.css";

const Timer = ({ date, styles }) => {

  const [countDown, setCountDown] = React.useState({
    total: null,
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  });

  let d = Date.parse(date);
  let dd = new Date(d);
  const dateFormatted = new Date(dd.valueOf() + (5 * 60 + (-1 * dd.getTimezoneOffset())) * 60000);

  useEffect(() => {
    const interval = setInterval(() => {
      const total = Date.parse(dateFormatted) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      setCountDown({
        total,
        days,
        hours,
        minutes,
        seconds
      })
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <>
      {countDown?.total > 0 && <div className={`${s.timer} text-white`} style={styles}>
        {countDown?.days > 0 &&
          <div className={s.date}>
            <div className={s.dateWrapper}>{countDown?.days}</div>
            <span>Days</span>
          </div>
        }
        {(countDown?.days > 0 || countDown?.hours > 0) &&
          <div className={s.date}>
            <div className={s.dateWrapper}><FormattedNumber number={countDown?.hours} /></div>
            <span>Hours</span>
          </div>
        }
        {(countDown?.days > 0 || countDown?.hours > 0 || countDown?.minutes > 0) &&
          <div className={s.date}>
            <div className={s.dateWrapper}><FormattedNumber number={countDown?.minutes} /></div>
            <span>Minutes</span>
          </div>
        }
        {(countDown?.days > 0 || countDown?.hours > 0 || countDown?.minutes > 0 || countDown?.seconds > 0) &&
          <div className={s.date}>
            <div className={`${s.dateWrapper} ${s.secondsWrapper}`}><FormattedNumber number={countDown?.seconds} /></div>
            <span>Seconds</span>
          </div>
        }
      </div>}
    </>
  );
};

export default Timer;

const FormattedNumber = ({ number }) => {
  return ('' + number).padStart(2, '0');
}