const config = {
  siteTitle: 'Sanket Gandhi',
  siteTitleShort: 'Sanket Gandhi',
  siteTitleAlt: 'Sanket Gandhi',
  siteLogo: '/logos/sanket.jpg',
  siteUrl: 'https://www.sanketgandhi.com',
  repo: 'https://github.com/sanketgandhi/sanketgandhi.com',
  pathPrefix: '',
  dateFromFormat: 'YYYY-MM-DD',
  dateFormat: 'MMMM Do, YYYY',
  siteDescription: 'Sanket Gandhi is a web developer and writer specializing in modern JavaScript.',
  siteRss: '/rss.xml',
  googleAnalyticsID: 'UA-106405877-2',
  postDefaultCategoryID: 'Tech',
  commentsApi: 'https://sanketgandhi-comments-api.herokuapp.com/comments',
  newsletter: 'https://sanketgandhi.substack.com',
  newsletterEmbed: 'https://sanketgandhi.substack.com/embed',
  userName: 'Sanket',
  userEmail: 'sanketgandhi876@gmail.com',
  userTwitter: 'sanketgandhi',
  menuLinks: [
    {
      name: 'About Me',
      link: '/aboutme/',
    },
    {
      name: 'Articles',
      link: '/blog/',
    },
  ],
  themeColor: '#3F80FF', // Used for setting manifest and progress theme colors.
  backgroundColor: '#ffffff',
};

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
  config.pathPrefix = '';
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/') config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== '/') config.siteRss = `/${config.siteRss}`;

module.exports = config;
