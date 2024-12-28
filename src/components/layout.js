import React from "react"
import Header from './header/header';
import Footer from './footer/footer';

const Layout = ({ isHomePage, children }) => {
  // console.log(`.env.${process.env.NODE_ENV}`);
  // console.log(process.env.WP_URL);
  // console.log(process.env.WPGRAPHQL_URL);
  // console.log(process.env.SITE_URL);
  // console.log(process.env.GATSBY_GTM_ID);
  // console.log(process.env.GATSBY_GTM_AUTH);
  // console.log(process.env.GATSBY_GTM_PREVIEW);

  return (
    <div data-is-root-path={isHomePage}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
