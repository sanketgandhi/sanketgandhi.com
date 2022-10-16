import React, { useMemo } from 'react';
import { Link, graphql, navigate } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/Layout';
import Posts from '../components/Posts';
// import Guides from '../components/Guides';
import SEO from '../components/SEO';
import Blurb from '../components/Blurb';

import { getSimplifiedPosts } from '../utils/helpers';
import config from '../utils/config';

// import interviews from '../data/interviews';
// import speaking from '../data/speaking';

export default function PostIndex({ data }) {
	const latest = data.latest.edges;
	const popular = data.popular.edges;
	const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest]);
	const simplifiedPopular = useMemo(() => getSimplifiedPosts(popular), [popular]);

	const Section = ({ title, children, button, ...props }) => (
		<section {...props}>
			<h2 className="section-title">
				{title}
				{button && (
					<Link className="section-button" to="/posts">
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
				<Section title="Latest Posts" button>
					<div className="post-preview">
						{console.log(simplifiedLatest)}
						{simplifiedLatest.map((post) => {
							return (
								<div
									className="anchored card"
									key={post.slug}
									onClick={() => {
										navigate(post.slug);
									}}
								>
									<time>{post.date}</time>
									<Link className="card-header" to={post.slug}>
										{post.title}
									</Link>
									<div className="anchored categories">{}</div>
								</div>
							);
						})}
					</div>
				</Section>

				<Section title="Popular Posts" button>
					<Posts data={simplifiedPopular} />
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
