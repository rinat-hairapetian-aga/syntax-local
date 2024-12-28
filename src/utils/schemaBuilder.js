import parse from "html-react-parser";
import logo from "../assets/images/header-logo-desktop.png"

const schemaBuilder = (item, type, site) => {
  let schema = {};
  switch (type) {
    case 'blog':
      schema = buildBlogSchema(item, site);
      break;
    case 'author':
      schema = buildAuthorShcema(item, site);
      break;
    case 'post':
      schema = buildPostSchema(item, site);
      break;
    case 'page':
      schema = buildPageSchema(item, site);
      break;
    case 'course':
      schema = buildCourseSchema(item, site);
      break;
    case 'webinar':
      schema = buildWebinarSchema(item, site);
      break;

    default:

      break;
  }

  return schema;
}

const buildCourseSchema = (item, site) => {
  const WebPageSchema = {
    "@context": "https://schema.org/",
    "@type": "WebPage",
    "name": item.course.title,
    "speakable": {
      "@type": "SpeakableSpecification",
      "xpath": [
        "/html/head/title",
        "/html/head/meta[@name='description']/@content"
      ]
    },
    "publisher": getOrganizationSchema(site),
    "url": `${site.siteMetadata.siteUrl}${item?.course.uri}`,
  }

  const featuredImage = {
    data: item.course.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    url: item.course.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src,
    alt: item.course.featuredImage?.node?.alt || ``,
    width: item.course.featuredImage?.node?.localFile?.childImageSharp?.width,
    height: item.course.featuredImage?.node?.localFile?.childImageSharp?.height,
  }

  const CourseSchema = {
    "@context": "https://schema.org/",
    "@type": "Course",
    "@id": `${site.siteMetadata.siteUrl}${item?.course.uri}`,
    "name": item.course.title,
    "description": item.course?.acf_course?.schemaBlock?.description,
    "publisher": getOrganizationSchema(site),
    "provider": getOrganizationSchema(site),
    "url": `${site.siteMetadata.siteUrl}${item?.course.uri}`,
    "inLanguage": "en",
    "availableLanguage": 'en',
    "isAccessibleForFree": false,
    "hasCourseInstance": {
      "courseMode": 'online',
      "courseWorkload": item.course?.acf_course?.schemaBlock?.duration,
      "startDate": `${item.course?.acf_course?.schemaBlock?.startDate}-05:00`,
      "endDate": `${item.course?.acf_course?.schemaBlock?.endDate}-05:00`,
    },
    "totalHistoricalEnrollment": item.course?.acf_course?.schemaBlock?.totalHistoricalEnrollment, //5200, //schema fields
    "learningResourceType": item.course?.acf_course?.schemaBlock?.learningResourceType, //'Instructor Led, Remote Learning',
    "abstract": item.course?.acf_course?.schemaBlock?.abstract,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "ratingCount": "473"
    },

    "offers": {
      "@type": "Offer",
      "category": "Paid",
      "url": `${site.siteMetadata.siteUrl}${item?.course.uri}`,
      "availability": "Available",
      "validFrom": item.course?.date,
      "price": item.course?.acf_course?.schemaBlock?.price,
      "priceCurrency": "USD"
    },

    "about": item.course?.acf_course?.schemaBlock?.about,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": item.course?.acf_course?.schemaBlock?.ratingValue,
      "ratingCount": item.course?.acf_course?.schemaBlock?.ratingCount,
      "bestRating": 5,
      "worstRating": 0.5
    }
  }

  if (item.course?.acf_course?.schemaBlock?.audience?.length > 0) {
    CourseSchema['audience'] = {
      "@type": "Audience",
      "audienceType": item.course?.acf_course?.schemaBlock?.audience?.map(a => a.name)
    }
  }

  const EducationEventSchema = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    "name": item.course.title,
    "url": `${site.siteMetadata.siteUrl}${item?.course.uri}`,
    "previousStartDate": `${item.course?.acf_course?.schemaBlock?.startDate}-05:00`,
    "startDate": `${item.course?.acf_course?.schemaBlock?.startDate}-05:00`,
    "endDate": `${item.course?.acf_course?.schemaBlock?.endDate}-05:00`,
    "duration": item.course?.acf_course?.schemaBlock?.duration,
    "eventStatus": "https://schema.org/EventRescheduled",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "offers": {
      "@type": "Offer",
      "category": "Paid",
      "url": `${site.siteMetadata.siteUrl}${item?.course.uri}`,
      "availability": "Available",
      "validFrom": item.course?.date,
      "price": item.course?.acf_course?.schemaBlock?.price,
      "priceCurrency": "USD"
    },
    "location": {
      "@type": "VirtualLocation",
      "url": `${site.siteMetadata.siteUrl}${item?.course.uri}`,
    },
    "image": {
      "@type": "ImageObject",
      "url": `${site.siteMetadata.siteUrl}${featuredImage.url}`,
      "width": featuredImage.width,
      "height": featuredImage.height,
    },
    "organizer": getOrganizationSchema(site),
    "teaches": item.course?.acf_course?.schemaBlock?.teaches,
    "description": item.course?.acf_course?.schemaBlock?.description,
  }

  let FAQSchema = {};

  if (!!item?.course?.acf_course?.heroBlock?.title) {
    CourseSchema["offers"]['name'] = `${item?.course?.acf_course?.heroBlock?.title}`;
    EducationEventSchema["name"] = item?.course?.acf_course?.heroBlock?.title;
  }

  {
    !!item?.course?.acf_course?.content &&
      item?.course?.acf_course?.content?.map((block, index) => {
        switch (block.__typename) {
          case 'WpCourse_AcfCourse_Content_CurriculumBlock':
            let teacesArray = block?.items?.map((item, i) => item.title);
            if (teacesArray?.length > 0) {
              CourseSchema['syllabusSections'] = getSyllabusSchema(block?.items);
              CourseSchema['teaches'] = teacesArray.join(', ');
              EducationEventSchema['about'] = teacesArray.join(', ');
            }
            break;
          case 'WpCourse_AcfCourse_Content_MentorsBlock':
            if (block?.mentors?.length > 0) {
              CourseSchema['hasCourseInstance']['instructor'] = getMentorsSchema(block?.mentors)
              EducationEventSchema['performer'] = getMentorsSchema(block?.mentors)
              EducationEventSchema['instructor'] = getMentorsSchema(block?.mentors)
            }
            break;
          case 'WpCourse_AcfCourse_Content_ShceduleBlock':
            if (!!block?.subtitle) {
              CourseSchema['educationalLevel'] = block?.subtitle;
            }
            break;
          case 'WpCourse_AcfCourse_Content_CertificateBlock':
            let certificateImage = {
              data: block.image?.localFile?.childImageSharp?.gatsbyImageData,
              alt: block.image?.altText || ``,
            };
            if (!!certificateImage?.data) {
              CourseSchema['educationalCredentialAwarded'] = {
                "@type": "EducationalOccupationalCredential",
                "name": "Syntax Technologies Certificate",
                "url": `${site.siteMetadata.siteUrl}${certificateImage.data?.images?.fallback?.src}`, // replace wiwth actual certificate url
                "credentialCategory": "Certificate"
              }
              CourseSchema['occupationalCredentialAwarded'] = {
                "@type": "EducationalOccupationalCredential",
                "name": "Syntax Technologies Certificate",
                "url": `${site.siteMetadata.siteUrl}${certificateImage.data?.images?.fallback?.src}`, // replace wiwth actual certificate url
                "credentialCategory": "Certificate"
              }
            }
            break;
          case 'WpCourse_AcfCourse_Content_ReviewsBlock':
            let reviews = [{ review: { ...block?.mainReview } }, ...block?.reviews];
            if (reviews?.length > 0) {
              CourseSchema['review'] = getReviewsSchema(reviews);
            }
            break;
          case 'WpCourse_AcfCourse_Content_FaqBlock':
            if (block?.items?.length > 0) {
              FAQSchema = getFaqSchema(block?.items)
            }
            break;
          default:
            break;
        }
      })
  }


  // return WebPageSchema;
  return [WebPageSchema, CourseSchema, EducationEventSchema, FAQSchema];
}

const buildWebinarSchema = (item, site) => {
  const WebPageSchema = {
    "@context": "https://schema.org/",
    "@type": "WebPage",
    "name": item.webinar.title,
    "speakable": {
      "@type": "SpeakableSpecification",
      "xpath": [
        "/html/head/title",
        "/html/head/meta[@name='description']/@content"
      ]
    },
    // "description": item.course.seo.metaDesc,
    "publisher": getOrganizationSchema(site),
    "url": `${site.siteMetadata.siteUrl}${item?.webinar.uri}`,
  }

  const featuredImage = {
    data: item.webinar.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    url: item.webinar.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src,
    alt: item.webinar.featuredImage?.node?.alt || ``,
    width: item.webinar.featuredImage?.node?.localFile?.childImageSharp?.width,
    height: item.webinar.featuredImage?.node?.localFile?.childImageSharp?.height,
  }

  const EventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": item.webinar.title,
    "url": `${site.siteMetadata.siteUrl}${item?.webinar.uri}`,
    "eventStatus": !!item.webinar?.acf_webinar?.heroBlock?.form?.recordingUrl ? "https://schema.org/EventMovedOnline" : "https://schema.org/EventScheduled",
    "startDate": `${item.webinar?.acf_webinar?.heroBlock?.webinarDate}-05:00`,
    "endDate": `${item.webinar?.acf_webinar?.heroBlock?.webinarEndDate}-05:00`,
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "offers": {
      "@type": "Offer",
      "price": 0,
      "priceCurrency": "USD",
      "description": "Free",
      "availability": "OnlineOnly",
      "validFrom": item.webinar.date,
      "url": `${site.siteMetadata.siteUrl}${item?.webinar.uri}`,
    },
    "location": {
      "@type": "VirtualLocation",
      "url": `${site.siteMetadata.siteUrl}${item?.webinar.uri}`,
      // "name": locationName,
    },
    "organizer": getOrganizationSchema(site),
    "performer": getOrganizationSchema(site),
    "image": {
      "@type": "ImageObject",
      "url": `${site.siteMetadata.siteUrl}${featuredImage.url}`,
      "width": featuredImage.width,
      "height": featuredImage.height,
    },
    "description": item.webinar.seo.metaDesc,
  }

  let FAQSchema = {};
  {
    !!item?.webinar?.acf_webinar?.content &&
      item?.webinar?.acf_webinar?.content?.map((block, index) => {
        switch (block.__typename) {
          case 'WpWebinar_AcfWebinar_Content_MentorsBlock':
            if (block?.mentors?.length > 0) {
              EventSchema['performer'] = getMentorsSchema(block?.mentors)
            }
            break;
          case 'WpWebinar_AcfWebinar_Content_FaqBlock':
            if (block?.items?.length > 0) {
              FAQSchema = getFaqSchema(block?.items)
            }
            break;
          default:
            break;
        }
      })
  }

  const OrganizationSchema = getOrganizationSchema(site);

  // return WebPageSchema;
  return [WebPageSchema, EventSchema, FAQSchema, OrganizationSchema];
}

const buildPostSchema = (item, site) => {
  const post = item?.post;
  const author = item?.author;

  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${post.title}`,
    "url": `${site.siteMetadata.siteUrl}${post.uri}`,
    "publisher": getOrganizationSchema(site),
    "description": post.seo.metaDesc,
  };

  let article = {
    "@type": "Article",
    "articleBody": post.title,
    // "accountablePerson": getHamletPersonSchema(),
    "contentLocation": 'USA',
    "dateCreated": post.published,
    "datePublished": post.published,
    "dateModified": post.modified,
    "headline": post.title,
    "url": `${site.siteMetadata.siteUrl}${post.uri}`,
    "keywords": post?.seo?.metaKeywords,
    "name": post.title,
    "author": getPersonSchema(author, site),
    // "author": getHamletPersonSchema(),
    "image": {
      "@type": "ImageObject",
      "url": `${site.siteMetadata.siteUrl}${featuredImage.data?.images?.fallback?.src}`,
      "width": post.featuredImage?.node?.localFile?.childImageSharp?.original?.width,
      "height": post.featuredImage?.node?.localFile?.childImageSharp?.original?.height
    },
    "description": post.seo.metaDesc,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${site.siteMetadata.siteUrl}/blog`,
    }
  }
  if (post?.categories?.nodes?.length > 0) {
    article.articleSection = post?.categories?.nodes?.map((c) => c.name).join(', ');
  }
  schema.mainEntity = article;

  let breadcrumbs = [
    {
      name: 'Home',
      url: site.siteMetadata.siteUrl
    },
    {
      name: `Blog`,
      url: `${site.siteMetadata.siteUrl}/blog`
    },
    {
      name: post.title,
      url: `${site.siteMetadata.siteUrl}${post.uri}`,
    }
  ];

  schema.breadcrumb = getBreadcrumbsSchema(breadcrumbs);

  return schema;
}

const buildBlogSchema = (item, site) => {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "WebPage",
    "name": `${item?.page.title}`,
    "url": `${site.siteMetadata.siteUrl}/blog`,
    "publisher": getOrganizationSchema(site),
    "description": item?.page.seo.metaDesc,
  }
  let blog = {
    "@type": "Blog",
    "mainEntityOfPage": `${site.siteMetadata.siteUrl}/blog`,
    "name": `${item.page.title} ${item.currentPage > 1 ? `Page ${item.currentPage}` : ''}`,
    "description": item.page.seo.metaDesc,
  }

  if (item?.posts?.length > 0) {
    blog.blogPost = item?.posts?.map(p => {
      return getBlogPostingSchema(p, site);
    });
  }
  if (item.currentPage > 1) {
    schema.url = schema.url + '/' + item.currentPage;
  }

  schema.mainEntity = blog;

  let breadcrumbs = [
    {
      name: 'Home',
      url: site.siteMetadata.siteUrl
    },
    {
      name: `Blog`,
      url: schema.url
    }
  ];

  schema.breadcrumb = getBreadcrumbsSchema(breadcrumbs);

  return schema;
}

const buildAuthorShcema = (item, site) => {
  const WebPageSchema = {
    "@context": "https://schema.org/",
    "@type": "WebPage",
    "name": `${item?.author.name}`,
    "url": `${site.siteMetadata.siteUrl}${item?.author.uri}`,
    "publisher": getOrganizationSchema(site),
    "description": item?.author.seo.metaDesc,
  }
  let breadcrumbs = [
    {
      name: 'Home',
      url: site.siteMetadata.siteUrl
    },
    {
      name: item?.author.name,
      url: `${site.siteMetadata.siteUrl}${item?.author.uri}`
    }
  ];

  WebPageSchema.breadcrumb = getBreadcrumbsSchema(breadcrumbs);

  let PersonSchema = {
    "@context": "https://schema.org/",
    "@type": "Person",
    "name": `${!!item?.author?.acfUser?.userSchema?.name ? item?.author?.acfUser?.userSchema?.name : item?.author.name}`,
    "url": `${site.siteMetadata.siteUrl}${item?.author.uri}`,
    "givenName": `${!!item?.author?.acfUser?.userSchema?.givenName ? item?.author?.acfUser?.userSchema?.givenName : item?.author.firstName}`,
    "familyName": `${!!item?.author?.acfUser?.userSchema?.familyName ? item?.author?.acfUser?.userSchema?.familyName : item?.author.lastName}`,
    "description": `${!!item?.author?.acfUser?.userSchema?.description ? item?.author?.acfUser?.userSchema?.description : item?.author.description}`,
  }

  if (item?.author?.acfUser?.userSchema?.languages?.length > 0) {
    PersonSchema.knowsLanguage = item?.author?.acfUser?.userSchema?.languages?.map((item) => item.language);
  }

  if (item?.author?.acfUser?.userSchema?.email) {
    PersonSchema.email = `mailto:${item?.author?.acfUser?.userSchema?.email}`;
  }

  if (item?.author?.acfUser?.userSchema?.gender) {
    PersonSchema.gender = `${item?.author?.acfUser?.userSchema?.gender}`;
  }

  if (item?.author?.acfUser?.userSchema?.workLocation) {
    PersonSchema.workLocation = `${item?.author?.acfUser?.userSchema?.workLocation}`;
  }

  if (item?.author?.acfUser?.userSchema?.colleague) {
    PersonSchema.colleague = `${item?.author?.acfUser?.userSchema?.colleague}`;
  }

  if (item?.author?.acfUser?.userSchema?.knowsAbout?.length > 0) {
    PersonSchema.knowsAbout = item?.author?.acfUser?.userSchema?.knowsAbout?.map((k) => k.item);
  }

  if (item?.author?.acfUser?.userSchema?.sameAs?.length > 0) {
    PersonSchema.sameAs = item?.author?.acfUser?.userSchema?.sameAs?.map((s) => s.item);
  }


  if (item?.author?.acfUser?.userSchema?.ocupation?.name) {
    PersonSchema.hasOccupation = {
      "@type": "Occupation",
      "name": item?.author?.acfUser?.userSchema?.ocupation?.name,

    };

    PersonSchema.worksFor = {
      "@type": "Organization",
      "name": item?.author?.acfUser?.userSchema?.ocupation?.organization?.name,
      "url": item?.author?.acfUser?.userSchema?.ocupation?.organization?.url,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": item?.author?.acfUser?.userSchema?.ocupation?.organization?.phone,
      }
    }
  }

  if (!!item?.author?.users?.avatar?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src) {
    PersonSchema.image = site.siteMetadata.siteUrl + item?.author?.users?.avatar?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;
  } else {
    if (!!item?.author?.avatar?.url) {
      PersonSchema.image = item?.author?.avatar?.url;
    }
  }



  return [WebPageSchema, PersonSchema];
}

const buildPageSchema = (item, site) => {
  const WebPageSchema = {
    "@context": "https://schema.org/",
    "@type": "WebPage",
    "name": item.page.title,
    "description": item.page.seo.metaDesc,
    "publisher": getOrganizationSchema(site),
    "url": `${site.siteMetadata.siteUrl}${item?.page.uri}`,
  }

  let breadcrumbs = [
    {
      name: 'Home',
      url: site.siteMetadata.siteUrl
    },
  ];
  if ("/" !== item?.page.uri) {
    breadcrumbs.push({
      name: item?.page.title,
      url: `${site.siteMetadata.siteUrl}${item?.page.uri}`
    })
  }

  WebPageSchema.breadcrumb = getBreadcrumbsSchema(breadcrumbs);

  let ItemsListSchema = [];

  {
    !!item?.page?.acf_content?.contentBlocks &&
      item?.page?.acf_content?.contentBlocks.map((block, index) => {
        switch (block.__typename) {
          case 'WpPage_AcfContent_ContentBlocks_AlumniCoursesBlock':
            if (block?.items?.length > 0) {

              ItemsListSchema = {
                "@context": "https://schema.org",
                "@type": "ItemList"
              }
              ItemsListSchema.itemListElement = block?.items?.map((item, i) => {
                return {
                  "@type": "SiteNavigationElement",
                  "position": i + 1,
                  "name": item?.title,
                  "description": item?.description,
                  "url": `${site.siteMetadata.siteUrl}${item?.button?.link?.url}`
                }
              })
            }
            break;
          default:
            break;
        }
      })
  }

  if ("/" == item?.page.uri) {
    const OrganizationSchema = getOrganizationSchema(site);
    return [WebPageSchema, ItemsListSchema, OrganizationSchema];
  }

  return [WebPageSchema, ItemsListSchema];
}


const removeTags = (str) => {
  if ((str === null) || (str === ''))
    return '';
  else
    str = str.toString();
  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/ig, '');
}

const getOrganizationSchema = (site) => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": `${site.siteMetadata.title}`,
    "url": `${site.siteMetadata.siteUrl}`,
    "sameAs": "https://www.syntaxtechs.com/",
    'address': {
      "@type": "PostalAddress",
      "addressCountry": "US",
      "addressLocality": "Newbrook",
      "streetAddress": "14120 Newbrook Dr Suite 210",
      "addressRegion": "VA",
      "postalCode": "20151"
    },
    'email': `support@syntaxtechs.com`,
    "telephone": "(202)-817-4198",
    'brand': `Syntax Technologies`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "ratingCount": "473"
    },
    'founder': [
      {
        "@type": "Person",
        "name": 'Sumair Jawaid',
        "jobTitle": "CEO and Co-founder",
      },
      {
        "@type": "Person",
        "name": ' Asel Umurzakova',
        "jobTitle": "Co-founder",
      }
    ],
    'foundingDate': `2017`,
    'foundingLocation': `Chantilly, Virginia`,
    'legalName': `Syntax Technologies. Ltd`,
    "description": "",
    "image": {
      "@type": "ImageObject",
      "url": `${site.siteMetadata.siteUrl}${logo}`,
      "width": 336,
      "height": 97
    },
    "logo": {
      "@type": "ImageObject",
      "url": `${site.siteMetadata.siteUrl}${logo}`,
      "width": 336,
      "height": 97
    },
    'numberOfEmployees': `40`,
    'slogan': `Elevate Your Career to New Heights`,
  }
}

const getPersonSchema = (author, site) => {
  return {
    "@type": "Person",
    "name": `${author.name}`,
    "url": `${site.siteMetadata.siteUrl}${author.uri}`,
  }
}

const getHamletPersonSchema = () => {
  return {
    "@type": "Person",
    "name": 'Hamlet Azarian',
    "url": `https://azariangrowthagency.com/author/hamlet/`,
    "jobTitle": "CEO",
    "sameAs": [
      "https://www.linkedin.com/in/hamletazarian/",
      "https://twitter.com/hamletazarian",
      "https://azariangrowthagency.com/author/hamlet/",
    ],
    "knowsAbout": [
      'https://en.wikipedia.org/wiki/Online_advertising',
      'https://en.wikipedia.org/wiki/Growth_hacking',
      'https://en.wikipedia.org/wiki/Digital_marketing',
      'https://en.wikipedia.org/wiki/Email_marketing',
      'https://en.wikipedia.org/wiki/Conversion_rate_optimization',
      'https://en.wikipedia.org/wiki/Google_Analytics',
      'https://en.wikipedia.org/wiki/Social_network_advertising',
      'https://en.wikipedia.org/wiki/Search_engine_optimization',
      'https://en.wikipedia.org/wiki/Content_marketing',
      'https://en.wikipedia.org/wiki/Search_engine_marketing',
    ],
  }
}
const getFounderPersonSchema = () => {
  return {
    "@type": "Person",
    "name": 'Hamlet Azarian',
    "url": `https://azariangrowthagency.com/author/hamlet/`,
    "jobTitle": "CEO",
    "sameAs": [
      "https://www.linkedin.com/in/sumair-jawaid/",
      "https://twitter.com/hamletazarian",
      "https://azariangrowthagency.com/author/hamlet/",
    ],
    // "knowsAbout": [
    //   'https://en.wikipedia.org/wiki/Online_advertising',
    //   'https://en.wikipedia.org/wiki/Growth_hacking',
    //   'https://en.wikipedia.org/wiki/Digital_marketing',
    //   'https://en.wikipedia.org/wiki/Email_marketing',
    //   'https://en.wikipedia.org/wiki/Conversion_rate_optimization',
    //   'https://en.wikipedia.org/wiki/Google_Analytics',
    //   'https://en.wikipedia.org/wiki/Social_network_advertising',
    //   'https://en.wikipedia.org/wiki/Search_engine_optimization',
    //   'https://en.wikipedia.org/wiki/Content_marketing',
    //   'https://en.wikipedia.org/wiki/Search_engine_marketing',
    // ],
  }
}

const getReviewsSchema = (reviews) => {
  return reviews.map((r) => {
    return {
      "@type": "Review",
      "author": {
        "type": "Person",
        "name": r.review?.title
      },
      // "datePublished": "2011-04-01",
      "reviewBody": parse(r.review?.acfTestimonial?.review),
      "name": r.review?.title,
      "reviewRating": {
        "@type": "Rating",
        "bestRating": "5",
        "ratingValue": "5",
        "worstRating": "1"
      }
    };
  })
}

const getFaqSchema = (items) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "FAQ",
    "mainEntity": items.map((item, i) => {
      return {
        "@type": "Question",
        "name": `${item.question}`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${item.answer}`
        }
      }
    })
  }
}

const getMentorsSchema = (items) => {

  return items?.map((item, i) => {
    return {
      "@type": "Person",
      "name": item?.mentor?.title,
    }
  })
}


const getSyllabusSchema = (items) => {
  return items?.map((item, i) => {
    return {
      "@type": "Syllabus",
      "name": item?.title,
      "description": item?.description,
    }
  })
}


const getBlogPostingSchema = (post, site) => {

  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }

  return {
    "@type": "BlogPosting",
    "mainEntityOfPage": `${site.siteMetadata.siteUrl}${post.uri}`,
    "headline": post.title,
    "name": post.title,
    "description": post?.seo?.metaDesc,
    "datePublished": post.published,
    "dateModified": post.modified,
    "author": getPersonSchema(post.author.node, site),
    // "author": getHamletPersonSchema(),
    "image": {
      "@type": "ImageObject",
      "url": `${site.siteMetadata.siteUrl}${featuredImage.data?.images?.fallback?.src}`,
      "width": post.featuredImage?.node?.localFile?.childImageSharp?.original?.width,
      "height": post.featuredImage?.node?.localFile?.childImageSharp?.original?.height
    },
    "url": `${site.siteMetadata.siteUrl}${post.uri}`,
    "keywords": post?.seo?.metaKeywords
  }
}

const getBreadcrumbsSchema = (items) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "name": "Breadcrumbs",
    "itemListElement": items.map((item, i) => {
      return {
        "@type": "ListItem",
        "position": i + 1,
        "item":
        {
          "@id": `${item.url}`,
          "name": `${item.name}`
        }
      }
    })
  }
}

export default schemaBuilder