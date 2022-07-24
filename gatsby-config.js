require('dotenv').config({
    path: `.env`,
});

module.exports = {
    siteMetadata: {
        title: 'Sanket Gandhi',
        author: {
            name: 'Sanket Gandhi',
        },
        pathPrefix: '/',
        siteUrl: 'https://sanketgandhi.com',
        description: 'Principal Software Engineer',
        feedUrl: 'https://www.sanketgandhi.com/rss.xml',
        logo: 'https://www.sanketgandhi.com/logo.png',
    },
    plugins: [
        // ===================================================================================
        // Meta
        // ===================================================================================

        'gatsby-plugin-react-helmet',
        'gatsby-plugin-netlify',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'Sanket Gandhi',
                short_name: 'Sanket Gandhi',
                description: 'Software developer',
                start_url: '/',
                background_color: 'white',
                theme_color: '#5183f5',
                display: 'minimal-ui',
                icon: `static/logos/logo-48.png`,
            },
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
                feeds: [
                    {
                        serialize: ({ query: { site, allMarkdownRemark } }) => {
                            return allMarkdownRemark.edges.map((edge) => {
                                return Object.assign({}, edge.node.frontmatter, {
                                    description: edge.node.excerpt,
                                    date: edge.node.frontmatter.date,
                                    url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                                    guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                                    custom_elements: [
                                        {
                                            'content:encoded': edge.node.html,
                                        },
                                        {
                                            author: 'sanket@sanketgandhi.com',
                                        },
                                    ],
                                });
                            });
                        },
                        query: `
              {
                allMarkdownRemark(
                  limit: 30,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { template: { eq: "post" } } }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                        template
                      }
                    }
                  }
                }
              }
            `,
                        output: '/rss.xml',
                        title: 'Sanket Gandhi | RSS Feed',
                    },
                ],
            },
        },

        // ===================================================================================
        // Images and static
        // ===================================================================================

        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'posts',
                path: `${__dirname}/content/`,
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'assets',
                path: `${__dirname}/static/`,
            },
        },

        // ===================================================================================
        // Markdown
        // ===================================================================================

        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    {
                        resolve: `gatsby-plugin-google-gtag`,
                        options: {
                            trackingIds: [process.env.GA_MEASUREMENT_ID],
                            pluginConfig: {
                                head: true,
                            },
                        },
                    },
                    'gatsby-remark-autolink-headers',
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 650,
                            wrapperStyle: (fluidResult) => `max-width: none;`,
                        },
                    },
                    {
                        resolve: 'gatsby-remark-prismjs',
                        options: {
                            classPrefix: 'language-',
                            inlineCodeMarker: null,
                            aliases: {},
                            showLineNumbers: false,
                            noInlineHighlight: false,
                            prompt: {
                                user: 'root',
                                host: 'localhost',
                                global: true,
                            },
                        },
                    },
                    {
                        resolve: `gatsby-plugin-google-analytics`,
                        options: {
                            trackingId: process.env.GA_TRACKING_ID,
                        },
                    },
                ],
            },
        },

        // ===================================================================================
        // Search
        // ===================================================================================

        {
            resolve: 'gatsby-plugin-local-search',
            options: {
                name: 'pages',
                engine: 'flexsearch',
                engineOptions: 'speed',
                query: `
          {
            allMarkdownRemark(filter: { frontmatter: { template: { eq: "post" } } }) {
              nodes {
                id
                frontmatter {
                  title
                  tags
                  slug
                  date(formatString: "MMMM DD, YYYY")
                }
                rawMarkdownBody
              }
            }
          }
        `,
                ref: 'id',
                index: ['title', 'tags'],
                store: ['id', 'slug', 'title', 'tags', 'date'],
                normalizer: ({ data }) =>
                    data.allMarkdownRemark.nodes.map((node) => ({
                        id: node.id,
                        slug: `/${node.frontmatter.slug}`,
                        title: node.frontmatter.title,
                        body: node.rawMarkdownBody,
                        tags: node.frontmatter.tags,
                        categories: node.frontmatter.categories,
                        date: node.frontmatter.date,
                    })),
            },
        },
    ],
};
