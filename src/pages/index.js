import React, { useMemo } from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/Layout';
import Posts from '../components/Posts';
// import Guides from '../components/Guides';
import Tools from '../components/Tools';
import SEO from '../components/SEO';
import Blurb from '../components/Blurb';

import { getSimplifiedPosts } from '../utils/helpers';
import config from '../utils/config';

import tools from '../data/tools';
// import interviews from '../data/interviews';
// import speaking from '../data/speaking';

export default function BlogIndex({ data }) {
  const latest = data.latest.edges;
  const popular = data.popular.edges;
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest]);
  const simplifiedPopular = useMemo(() => getSimplifiedPosts(popular), [
    popular,
  ]);

  const Section = ({ title, children, button, ...props }) => (
    <section {...props}>
      <h2 className="section-title">
        {title}
        {button && (
          <Link className="section-button" to="/blog">
            View all
          </Link>
        )}
      </h2>
      {children}
    </section>
  );

  return (
    <Layout>
      <Helmet title={config.siteTitle} />
      <SEO />
      <Blurb title="👋 Hi, I'm Sanket!">
        {/* <p>
          Team Lead @24/7 Software.
        </p> */}
      </Blurb>
      <div className="container index">
        <Section title="Latest Articles." button>
          <Posts data={simplifiedLatest} />
        </Section>
        <Section title="Popular Articles." button>
          <Posts data={simplifiedPopular} />
        </Section>
        <Section title="Useful Tools">
          <Tools data={tools} />
        </Section>
        {/* <Section title="Interviews.">
          <Guides data={interviews} frontPage />
        </Section>
        <Section title="Speaking.">
          <Guides data={speaking} frontPage />
        </Section> */}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
    popular: allMarkdownRemark(
      limit: 20
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`;
