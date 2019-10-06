import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import GitHubButton from 'react-github-btn';
import Layout from '../layout';
import PostListing from '../components/PostListing';
// import ProjectListing from '../components/ProjectListing';
import SimpleListing from '../components/SimpleListing';
import SEO from '../components/SEO';
import config from '../../data/SiteConfig';
// import projects from '../../data/projects';
// import speaking from '../../data/speaking';
import tools from '../../data/tools';
import quotes from '../../data/quotes';
import sanket from '../../content/images/sanket-avatar.png';

export default class Index extends Component {
  render() {
    const { data } = this.props;

    const latestPostEdges = data.latest.edges;
    const popularPostEdges = data.popular.edges;

    return (
      <Layout>
        <Helmet title={`${config.siteTitle} – Software Developer`} />
        <SEO />
        <div className="container">
          <div className="lead">
            <div className="elevator">
              <h1>👋 I'm Sanket</h1>
              <p>
                Team lead at{' '}
                <a href="https://www.247software.com" target="blank">
                  24/7 Software
                </a>
                . I created this blog to share my learnings and experience.
              </p>
              <div className="social-buttons">
                <div>
                  <a
                    className="twitter-follow-button"
                    href="https://twitter.com/sanketgandhi876"
                    data-size="large"
                    data-show-screen-name="false"
                  >
                    Follow @sanketgandhi876
                  </a>
                </div>
                <div>
                  <GitHubButton
                    href="https://github.com/sanketgandhi"
                    data-size="large"
                    data-show-count="true"
                    aria-label="Follow @sanketgandhi on GitHub"
                  >
                    Follow
                  </GitHubButton>
                </div>
              </div>
            </div>
            <div className="newsletter-section">
              <form
                action="https://buttondown.email/api/emails/embed-subscribe/sanketgandhi876"
                method="post"
                target="popupwindow"
                onSubmit="window.open('https://buttondown.email/sanketgandhi876', 'popupwindow')"
                className="embeddable-buttondown-form"
              >
                <label htmlFor="bd-email">Join the Newsletter</label>
                <input type="email" name="email" id="bd-email" />
                <input type="hidden" value="1" name="embed" />
                <input type="submit" value="Subscribe" />
                <p>
                  <a href="https://buttondown.email" target="_blank" rel="noopener noreferrer">
                    🎉📩
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>

        <div className="container front-page">
          <section className="section">
            <h2>
              Latest Articles
              <Link to="/blog" className="view-all">
                View all
              </Link>
            </h2>
            <PostListing simple postEdges={latestPostEdges} />
          </section>

          <section className="section">
            <h2>
              Most Popular
              <Link to="/categories/popular" className="view-all">
                View all
              </Link>
            </h2>
            <PostListing simple postEdges={popularPostEdges} />
          </section>

          {/* <section className="section">
            <h2>Open Source Projects</h2>
            <ProjectListing projects={projects} />
          </section> */}

          <section className="section">
            <h2>Tools</h2>
            <SimpleListing simple data={tools} />
          </section>

          {/* <section className="section">
            <h2>Speaking</h2>
            <SimpleListing simple data={speaking} />
          </section> */}

          {/* <section className="section">
            <h2>{`Other People's Opinions`}</h2>
            <div className="quotations">
              {quotes.map(quote => (
                <blockquote className="quotation" key={quote.name}>
                  <p>{quote.quote}</p>
                  <cite>— {quote.name}</cite>
                </blockquote>
              ))}
            </div>
          </section> */}
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 6
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
    popular: allMarkdownRemark(
      limit: 7
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
  }
`;
