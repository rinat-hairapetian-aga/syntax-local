const path = require(`path`)
const cheerio = require('cheerio');
const chunk = require(`lodash/chunk`)

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000,
    },
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes, createFieldExtension } = actions;
  createFieldExtension({
    name: "content",
    extend: extendContentField,
  });

  const typeDefs = `
    type WpPost implements Node {
      toc: JSON
      content: String @content
    }
  `;
  createTypes(typeDefs);
};


exports.createResolvers = ({ createResolvers, schema }) =>
  createResolvers({
    WpPost: {
      toc: {
        resolve: createTableOfContents,
      },
    },
  });

async function createTableOfContents(source, args, context, info) {
  const $ = cheerio.load(source.content)
  const titles = $('h2')
  const getUniqueId = UniqueId()

  const headings = Array.from(titles).map(title => {
    const depth = parseInt($(title).prop('tagName').substr(1), 10)
    const id = createId($, title)
    return { url: `#${getUniqueId(id)}`, title: $(title).text(), depth }
  })

  const reduced = groupHeadings(0, [], headings)
  return { items: reduced }
}

function extendContentField(options, prevFieldConfig) {
  return {
    resolve(source) {
      const $ = cheerio.load(source.content)
      const titles = $('h2')
      const getUniqueId = UniqueId()
      Array.from(titles).forEach(title => {
        const id = createId($, title)
        $(title).attr('id', getUniqueId(id))
      })

      return $('body').html()
    },
  }
}

function createId($, title) {
  let id = $(title).attr('id')

  if (!id) {
    id = $(title)
      .text()
      .toLowerCase()
      .replace(/[^a-z_0-9]+/gi, '-')
      .replace(/-+/g, '-')
  }

  return id
}

function UniqueId() {
  const tempMap = {}
  return el => {
    if (tempMap[el]) {
      tempMap[el] = tempMap[el] + 1
      const result = `${el}-${tempMap[el]}`
      tempMap[result] = 1
      return result
    } else {
      tempMap[el] = 1
      return el
    }
  }
}

function groupHeadings(index, grouping, headings) {
  if (index < headings.length) {
    const nextHeading = headings[index]

    if (grouping.length) {
      const prevHeading = grouping.slice().pop()

      try {
        if (nextHeading.depth > prevHeading.depth) {
          prevHeading.items = prevHeading.items || []
          return groupHeadings(index, prevHeading.items, headings)
        } else if (nextHeading.depth == prevHeading.depth) {
          grouping.push({ ...nextHeading })
          return groupHeadings(++index, grouping, headings)
        } else {
          throw { index: index, heading: nextHeading }
        }
      } catch (higherHeading) {
        if (higherHeading.heading.depth == prevHeading.depth) {
          grouping.push({ ...higherHeading.heading })
          return groupHeadings(++higherHeading.index, grouping, headings)
        } else {
          throw higherHeading
        }
      }
    } else {
      grouping.push({ ...nextHeading })
      groupHeadings(++index, grouping, headings)
    }
  }

  return grouping
}

// This is a simple debugging tool
// dd() will prettily dump to the terminal and kill the process
// const { dd } = require(`dumper.js`)

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async gatsbyUtilities => {
  // Query our posts from the GraphQL server
  const posts = await getPosts(gatsbyUtilities)

  // If there are posts in WordPress
  if (!!posts.length && posts.length > 0) {
    // If there are posts, create pages for them
    await createIndividualBlogPostPages({ posts, gatsbyUtilities })

    // And a paginated archive
    // await createBlogPostArchive({ posts, gatsbyUtilities })
  }

  // Query categories from the GraphQL server
  const postCategories = await getPostCategories(gatsbyUtilities);
  // If there are categories in WordPress
  if (!!postCategories.length && postCategories.length > 0) {
    // Add post categories archive pages
    await createCategoriesPostArchive({ postCategories, gatsbyUtilities });
  }

  // Query our pages from the GraphQL server
  const pages = await getPages(gatsbyUtilities)

  // If there are pages in WordPress
  if (!!pages.length && pages.length > 0) {
    // If there are pages, create pages for them
    await createIndividualPages({ pages, gatsbyUtilities })
  }

  // Query our courses from the GraphQL server
  const courses = await getCourses(gatsbyUtilities)

  // If there are courses in WordPress
  if (!!courses.length && courses.length > 0) {
    // If there are courses, create courses for them
    await createIndividualCoursesPages({ courses, gatsbyUtilities })
  }

  // Query our modules from the GraphQL server
  const modules = await getModules(gatsbyUtilities)

  // If there are modules in WordPress
  if (!!modules.length && modules.length > 0) {
    // If there are courses, create courses for them
    await createIndividualModulesPages({ modules, gatsbyUtilities })
  }

  // Query our courses from the GraphQL server
  const webinars = await getWebinars(gatsbyUtilities)

  // If there are webinars in WordPress
  if (!!webinars.length && webinars.length > 0) {
    // If there are webinars, create webinars for them
    await createIndividualWebinarsPages({ webinars, gatsbyUtilities })
  }

  const authors = await getAuthors(gatsbyUtilities);
  // If there are no authors in WordPress, exit
  if (!!authors.length) {
    // If there are authors, create pages for them
    await createAuthorsPostArchive({ authors, gatsbyUtilities });
  }
}

/**
 * This function creates all the individual blog pages in this site
 */
const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) =>
  Promise.all(
    posts.map(({ previous, post, next }) =>
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: post.uri,

        // use the blog post template as the page component
        component: path.resolve(`./src/templates/blog-post.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: post.id,
          authorId: post.authorId,

          // We also use the next and previous id's to query them and add links!
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    )
  )

/**
 * This function creates all the individual blog pages in this site
 */
async function createBlogPostArchive({ posts, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const { postsPerPage } = graphqlResult.data.wp.readingSettings

  const postsChunkedIntoArchivePages = chunk(posts, postsPerPage)
  const totalPosts = posts.length
  const totalPages = postsChunkedIntoArchivePages.length

  const getPagePath = page => {
    if (page > 0 && page <= totalPages) {
      // Since our homepage is our blog page
      // we want the first page to be "/" and any additional pages
      // to be numbered.
      // "/blog/2" for example
      return page === 1 ? `/blog` : `/blog/${page}/`
    }

    return null
  }


  const pages = [];
  for (let index = 1; index <= totalPages; index++) {
    let link = getPagePath(index)
    if (!!link) {
      pages.push({
        number: index,
        link: link,
      });
    }
  }

  return Promise.all(
    postsChunkedIntoArchivePages.map(async (_posts, index) => {
      const pageNumber = index + 1

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        path: getPagePath(pageNumber),

        // use the blog post archive template as the page component
        component: path.resolve(`./src/templates/blog-post-archive.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          offset: index * postsPerPage,

          // We need to tell the template how many posts to display too
          postsPerPage,

          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
          currentPage: pageNumber,
          pages: pages,
          totalPosts: totalPosts,
        },
      })
    })
  )
}


/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
async function getPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      # Query all WordPress blog posts sorted by date
      allWpPost(sort: { fields: date, order: DESC }) {
        edges {
          previous {
            id
          }

          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            id
            uri
            authorId
          }

          next {
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPost.edges
}



// /**
//  * This function creates all the individual categories pages in this site
//  */
// async function createPostCategoriesPages({ categories, gatsbyUtilities }) {
//   return Promise.all(
//     categories.map((item) => {
//       // createPage is an action passed to createPages
//       // See https://www.gatsbyjs.com/docs/actions#createPage for more info
//       return gatsbyUtilities.actions.createPage({
//         // Use the WordPress uri as the Gatsby page path
//         // This is a good idea so that internal links and menus work 👍
//         path: item.uri,

//         // use the blog post template as the page component
//         component: path.resolve(`./src/templates/template-category-archive.js`),

//         // `context` is available in the template as a prop and
//         // as a variable in GraphQL.
//         context: {
//           id: item.id,
//         },
//       })
//     }
//     )
//   )
// }

// // Get all categories
// async function getCategories({ graphql, reporter }) {
//   const graphqlResult = await graphql(/* GraphQL */ `
//     query WpCategories {
//       # Query all WordPress categories
//       allWpCategory {
//         nodes {
//           uri
//           slug
//           name
//           count
//           id
//         }
//       }
//     }
//   `)

//   if (graphqlResult.errors) {
//     reporter.panicOnBuild(
//       `There was an error loading your Categories`,
//       graphqlResult.errors
//     )
//     return
//   }

//   return graphqlResult.data.allWpCategory.nodes
// }


async function getPostCategories({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpCategories {
      # Query all WordPress categories
      allWpCategory {
        nodes {
          uri
          slug
          name
          count
          id
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Categories`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpCategory.nodes
}

async function createCategoriesPostArchive({ postCategories, gatsbyUtilities }) {

  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const { postsPerPage } = graphqlResult.data.wp.readingSettings

  postCategories?.forEach(async (category) => {
    await createCategoryPostArchive({ category, postsPerPage, gatsbyUtilities })
  })
}

async function createCategoryPostArchive({ category, postsPerPage, gatsbyUtilities }) {


  // let posts = category?.posts?.nodes;

  // const postsChunkedIntoArchivePages = chunk(posts, postsPerPage)
  const totalPosts = category.count
  const totalPages = Math.ceil(category.count / postsPerPage);

  const getPagePath = page => {
    if (page > 0 && page <= totalPages) {
      // Since our homepage is our blog page
      // we want the first page to be "/" and any additional pages
      // to be numbered.
      // "/blog/2" for example
      return page === 1 ? `${category.uri}` : `${category.uri}${page}/`
    }

    return null
  }


  const pages = [];
  for (let index = 1; index <= totalPages; index++) {
    let link = getPagePath(index)
    if (!!link) {
      pages.push({
        number: index,
        link: link,
      });
    }
  }

  return Promise.all(
    pages.map(async (_posts, index) => {
      const pageNumber = index + 1

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        path: getPagePath(pageNumber),

        // use the blog post archive template as the page component
        component: path.resolve(`./src/templates/template-category-archive.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          id: category.id,
          offset: index * postsPerPage,

          // We need to tell the template how many posts to display too
          postsPerPage,

          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
          currentPage: pageNumber,
          pages: pages,
          totalPosts: totalPosts,
        },
      })
    })
  )
}


/**
 * This function creates all the individual blog pages in this site
 */
const createIndividualPages = async ({ pages, gatsbyUtilities }) =>
  Promise.all(
    pages.map(({ page }) => {
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      if (false == page.isPostsPage) {

        let templatePath = "";

        if ('Default' == page.template.templateName) {
          templatePath = `./src/templates/template-page-default.js`
        }
        if ('Policies Template' == page.template.templateName) {
          templatePath = `./src/templates/template-page-policies.js`
        }
        if ('Contact Us Template' == page.template.templateName) {
          templatePath = `./src/templates/template-page-contact-us.js`
        }
        if ('Thank You Template' == page.template.templateName) {
          templatePath = `./src/templates/template-page-thank-you.js`
        }

        if (!templatePath) {
          return;
        }

        return gatsbyUtilities.actions.createPage({
          // Use the WordPress uri as the Gatsby page path
          // This is a good idea so that internal links and menus work 👍
          path: page.uri,

          // use the blog post template as the page component
          component: path.resolve(templatePath),

          // `context` is available in the template as a prop and
          // as a variable in GraphQL.
          context: {
            // we need to add the post id here
            // so our blog post template knows which blog post
            // the current page is (when you open it in a browser)
            id: page.id,
            authorId: page.authorId,
          },
        })
      }
      return;
    }
    )
  )


// Get all pages
async function getPages({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPages {
      # Query all WordPress blog posts sorted by date
      allWpPage {
        edges {
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          page: node {
            id
            uri
            authorId
            isFrontPage
            isPostsPage
            template {
              templateName
            }
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your pages`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPage.edges
}


/**
 * This function creates all the individual blog pages in this site
 */
const createIndividualWebinarsPages = async ({ webinars, gatsbyUtilities }) =>
  Promise.all(
    webinars.map(({ webinar }) => {
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      return gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: webinar.uri,

        // use the blog post template as the page component
        component: path.resolve(`./src/templates/template-webinar.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          id: webinar.id,
        },
      })
    }
    )
  )

// Get all webinars
async function getWebinars({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpWebinars {
      # Query all WordPress blog posts sorted by date
      allWpWebinar {
        edges {
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          webinar: node {
            id
            uri
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your webinars`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpWebinar.edges
}

/**
 * This function creates all the individual course pages in this site
 */
const createIndividualCoursesPages = async ({ courses, gatsbyUtilities }) =>
  Promise.all(
    courses.map(({ course }) => {
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      return gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: course.uri,

        // use the course page template as the page component
        component: path.resolve(`./src/templates/template-course.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          id: course.id,
        },
      })
    }
    )
  )

// Get all courses
async function getCourses({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpCourses {
      # Query all WordPress blog posts sorted by date
      allWpCourse {
        edges {
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          course: node {
            id
            uri
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your webinars`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpCourse.edges
}


/**
 * This function creates all the individual module pages in this site
 */
const createIndividualModulesPages = async ({ modules, gatsbyUtilities }) =>
  Promise.all(
    modules.map(({ module }) => {
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      return gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: module.uri,

        // use the course page template as the page component
        component: path.resolve(`./src/templates/template-module.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          id: module.id,
        },
      })
    }
    )
  )

// Get all modules
async function getModules({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpModules {
      # Query all WordPress blog posts sorted by date
      allWpModule {
        edges {
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          module: node {
            id
            uri
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your webinars`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpModule.edges
}


/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog authors. If there are any GraphQL error it throws an error
 * Otherwise it will return the authors 🙌
 */
async function getAuthors({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpAuthors {
      # Query all WordPress blog users
      allWpUser {
        edges {
          author: node {
            uri
            id
            databaseId
            posts {
              nodes {
                id
              }
            }
          }
        }
      }
    }
  `);

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    );
    return;
  }

  return graphqlResult.data.allWpUser.edges;
}

async function createAuthorsPostArchive({ authors, gatsbyUtilities }) {

  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const { postsPerPage } = graphqlResult.data.wp.readingSettings

  authors?.forEach(async ({ author }) => {
    await createAuthorPostArchive({ author, postsPerPage, gatsbyUtilities })
  })
}

async function createAuthorPostArchive({ author, postsPerPage, gatsbyUtilities }) {

  let posts = author?.posts?.nodes;
  if (!(posts?.length > 0)) {
    return null;
  }

  const postsChunkedIntoArchivePages = chunk(posts, postsPerPage)
  const totalPosts = posts?.length
  const totalPages = postsChunkedIntoArchivePages?.length

  const getPagePath = page => {
    if (page > 0 && page <= totalPages) {
      // Since our homepage is our blog page
      // we want the first page to be "/" and any additional pages
      // to be numbered.
      // "/blog/2" for example
      return page === 1 ? `${author.uri}` : `${author.uri}${page}/`
    }

    return null
  }


  const pages = [];
  for (let index = 1; index <= totalPages; index++) {
    let link = getPagePath(index)
    if (!!link) {
      pages.push({
        number: index,
        link: link,
      });
    }
  }

  return Promise.all(
    pages.map(async (_posts, index) => {
      const pageNumber = index + 1

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        path: getPagePath(pageNumber),

        // use the blog post archive template as the page component
        component: path.resolve(`./src/templates/blog-author.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          authorId: author.databaseId,
          id: author.id,
          offset: index * postsPerPage,

          // We need to tell the template how many posts to display too
          postsPerPage,

          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
          currentPage: pageNumber,
          pages: pages,
          totalPosts: totalPosts,
        },
      })
    })
  )
}

// /**
//  * This function creates all the individual blog pages in this site
//  */
// const createIndividualBlogAuthorsPages = async ({ authors, gatsbyUtilities }) =>
//   Promise.all(
//     authors.map(({ author }) =>
//       // createPage is an action passed to createPages
//       // See https://www.gatsbyjs.com/docs/actions#createPage for more info
//       gatsbyUtilities.actions.createPage({
//         // Use the WordPress uri as the Gatsby page path
//         // This is a good idea so that internal links and menus work 👍
//         path: author.uri,

//         // use the blog post template as the page component
//         component: path.resolve(`./src/templates/blog-author.js`),

//         // `context` is available in the template as a prop and
//         // as a variable in GraphQL.
//         context: {
//           // we need to add the post id here
//           // so our blog post template knows which blog post
//           // the current page is (when you open it in a browser)
//           authorId: author.databaseId,
//           id: author.id,
//         },
//       })
//     )
//   );
