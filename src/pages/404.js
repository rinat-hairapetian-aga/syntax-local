import { graphql, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="404: Not Found" />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-column align-items-center pb-5 mb-5">
              <StaticImage
                src="../assets/images/404.png"
                alt="404"
                quality={100}
              />
              <p className="text-center text-404">Don't worry. it's not a glitch in the matrix.
                <br />Let's find the right page together and continue your journey on our website.</p>
              <Link to="/" className="btn-404">Go Home</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
