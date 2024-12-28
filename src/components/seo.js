/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useEffect } from 'react';

const Seo = ({ description, lang, meta, links, title, pageSeo, location, schema }) => {
  meta = [];
  let link = [];
  if (undefined != links) {
    link = [...links];
  }

  useEffect(() => {
    // send request if utm_source exists on url
    const queryParams = new URLSearchParams(window.location.search);
    const utmSource = queryParams.get("utm_source");
    if (utmSource) {
      sessionStorage.setItem("queryParams", JSON.stringify(Object.fromEntries(queryParams.entries())));
    }
    let params = {
      page_title: title,
    };
    if (!!location && !!location.search) {
      let query = location.search;
      if (query[0] == "?") {
        query = query.slice(1);
      }
      let vars = query.split("&");
      for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        params[pair[0]] = decodeURIComponent(pair[1]);
      }
    }
    Object.keys(params)?.forEach((key, index) => {
      sessionStorage.setItem(key, params[key]);
    });
    if (!!sessionStorage.utm_source) {
      let payload = {};
      Object.keys(sessionStorage)?.forEach((key, index) => {
        if (key[0] !== '@') {
          payload[key] = sessionStorage[key];
        }
      });
      // console.log(payload);
      window.dataLayer.push({ ...payload });
    }
    // END send request if utm_source exists on url
  }, [])

  const { wp, wpUser } = useStaticQuery(
    // const { wp, wpUser } = useStaticQuery(
    graphql`
        query {
          wp {
            generalSettings {
              title
              description
            }
          }

          # if there's more than one user this would need to be filtered to the main user
          wpUser {
            twitter: name
          }
        }
     `
  );
  //// Default Meta Tags
  // // // meta.push({
  // // //   name: `theme-color`,
  // // //   content: `#ff6b00`,
  // // // });
  meta.push({
    name: `msapplication-navbutton-color`,
    content: `#072341`,
  });
  meta.push({
    name: `apple-mobile-web-app-status-bar-style`,
    content: `#072341`,
  });
  const metaDescription = description || wp.generalSettings?.description;
  const defaultTitle = wp.generalSettings?.title || "Syntax Technologies";
  if (!!pageSeo && (pageSeo.seo !== undefined || pageSeo.seo !== null)) {
    // console.log(meta, pageSeo.seo);
    //// End Default Meta Tags
    // opengraphTitle
    let descTitle = title;
    if (!!pageSeo.seo.opengraphTitle) descTitle = pageSeo.seo.opengraphTitle;

    meta.push({
      name: `title`,
      content: descTitle,
    });

    meta.push({
      property: `og:title`,
      content: descTitle,
    });

    // twitterTitle
    let twitterTitle = {
      name: `twitter:title`,
      content: descTitle,
    };
    if (!!pageSeo.seo.twitterTitle)
      twitterTitle.content = pageSeo.seo.twitterTitle;
    meta.push(twitterTitle);

    //meta description
    let descText = metaDescription;
    if (!!pageSeo.seo.metaDesc) descText = pageSeo.seo.metaDesc;
    meta.push({
      name: `description`,
      content: descText,
    });

    // opengraphDescription
    let ogDescription = {
      property: `og:description`,
      content: descText,
    };
    if (!!pageSeo.seo.opengraphDescription)
      ogDescription.content = pageSeo.seo.opengraphDescription;
    meta.push(ogDescription);

    // twitterDescription
    let twitterDescription = {
      name: `twitter:description`,
      content: descText,
    };
    if (!!pageSeo.seo.twitterDescription)
      twitterDescription.content = pageSeo.seo.twitterDescription;
    meta.push(twitterDescription);

    meta.push({
      property: `og:url`,
      content: process.env.GATSBY_SITE_URL + pageSeo.uri,
    });

    meta.push({
      property: `twitter:url`,
      content: process.env.GATSBY_SITE_URL + pageSeo.uri,
    });

    link.push({
      rel: 'canonical',
      href: process.env.GATSBY_SITE_URL + pageSeo.uri
    });

    meta.push({
      name: `twitter:creator`,
      content: wpUser?.twitter || ``,
    });

    // opengraphType
    let ogType = {
      property: `og:type`,
      content: "website",
    };
    if (!!pageSeo.seo.opengraphType) ogType.content = pageSeo.seo.opengraphType;
    meta.push(ogType);

    // Add ogImage
    let ogImageUrl;
    if (!!pageSeo.seo.opengraphImage) {
      ogImageUrl =
        process.env.GATSBY_SITE_URL +
        pageSeo.seo.opengraphImage.localFile.childImageSharp.fixed.src;
      meta.push({
        property: `og:image`,
        content: ogImageUrl,
      });
      meta.push({
        property: `og:image:width`,
        content:
          pageSeo.seo.opengraphImage.localFile.childImageSharp.fixed.width,
      });
      meta.push({
        property: `og:image:height`,
        content:
          pageSeo.seo.opengraphImage.localFile.childImageSharp.fixed.height,
      });
      meta.push({
        property: `og:image:type`,
        content: "image/" + pageSeo.seo.opengraphImage.localFile.extension,
      });
    }

    // twitterCard
    let twitterCard = {
      name: `twitter:card`,
      content: `summary`,
    };

    // twitterImage
    if (!!pageSeo.seo.twitterImage) {
      twitterCard.content = "summary_large_image";
      meta.push({
        name: `twitter:image`,
        content:
          process.env.GATSBY_SITE_URL +
          pageSeo.seo.twitterImage.localFile.childImageSharp.fixed.src,
      });
    } else {
      if (!!ogImageUrl) {
        twitterCard.content = "summary_large_image";
        meta.push({
          name: `twitter:image`,
          content: ogImageUrl,
        });
      }
    }
    meta.push(twitterCard);
  } else {
    let ogType = {
      property: `og:type`,
      content: "profile",
    };
    meta.push(ogType);
    if (!!title) {
      meta.push({
        name: `title`,
        content: title,
      });
      meta.push({
        property: `og:title`,
        content: title,
      });
      // twitterTitle
      let twitterTitle = {
        name: `twitter:title`,
        content: title,
      };
      meta.push(twitterTitle);
    }
    if (!!description) {
      //meta description
      meta.push({
        name: `description`,
        content: description,
      });

      // opengraphDescription
      let ogDescription = {
        property: `og:description`,
        content: description,
      };
      meta.push(ogDescription);

      // twitterDescription
      let twitterDescription = {
        name: `twitter:description`,
        content: description,
      };
      meta.push(twitterDescription);

    }
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={!!pageSeo?.seo?.title ? pageSeo?.seo?.title : title}
      titleTemplate={(!pageSeo?.seo?.title && defaultTitle) ? `%s - ${defaultTitle}` : null}
      meta={[].concat(meta)}
      link={[].concat(link)}
    >
      {(schema instanceof Array) && schema.map((s, i) => {
        if (!!s && !!s['@type']) {
          return <script type="application/ld+json" key={i}>{JSON.stringify(s)}</script>;
        }
        return null;
      })}
      {(!(schema instanceof Array) && !!schema && !!schema['@type']) && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
};

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default Seo;
