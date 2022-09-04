import React, { useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';

import Layout from '../components/Layout';
import Suggested from '../components/Suggested';
import SEO from '../components/SEO';
import Comment from '../components/Comment';
import Blurb from '../components/Blurb';

import config from '../utils/config';
import { slugify } from '../utils/helpers';

export default function PostTemplate({ data, pageContext }) {
	const post = data.markdownRemark;
	const { previous, next } = pageContext;
	const { tags, thumbnail, title, description, date } = post.frontmatter;
	const commentBox = React.createRef();

	useEffect(() => {
		const commentScript = document.createElement('script');
		const theme =
			typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark' ? 'github-dark' : 'github-light';
		commentScript.async = true;
		commentScript.src = 'https://utteranc.es/client.js';
		commentScript.setAttribute('repo', 'sanketgandhi/sanketgandhi.com');
		commentScript.setAttribute('issue-term', 'pathname');
		commentScript.setAttribute('id', 'utterances');
		commentScript.setAttribute('theme', theme);
		commentScript.setAttribute('crossorigin', 'anonymous');
		if (commentBox && commentBox.current) {
			commentBox.current.appendChild(commentScript);
		} else {
			console.log(`Error adding utterances comments on: ${commentBox}`);
		}
	}, []); // eslint-disable-line

	return (
		<Layout>
			<Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
			<SEO postPath={post.fields.slug} postNode={post} postSEO />
			<div className="container">
				<article>
					<header className="post-header">
						<div className="container">
							<div className="thumb">
								<div>
									<h1>{title}</h1>
									<div className="post-meta">
										<div>
											By <Link to="/me">Sanket Gandhi</Link> on <time>{date}</time>
										</div>
										{tags && (
											<div className="tags">
												{tags.map((tag) => (
													<Link
														key={tag}
														to={`/tags/${slugify(tag)}`}
														className={`tag-${tag}`}
													>
														{tag}
													</Link>
												))}
											</div>
										)}
									</div>
								</div>
								{thumbnail && (
									<Img fixed={thumbnail.childImageSharp.fixed} className="post-thumbnail" />
								)}
							</div>
						</div>
						{description && <p className="description">{description}</p>}
					</header>
					<div className="post-post" dangerouslySetInnerHTML={{ __html: post.html }} />
				</article>
			</div>
			<div className="container">
				<div id="comments">
					<h2>Comments</h2>
					<Comment commentBox={commentBox} />
				</div>

				<Suggested previous={previous} next={next} />
			</div>
		</Layout>
	);
}

export const pageQuery = graphql`
	query PostPostBySlug($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			excerpt
			fields {
				slug
			}
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				tags
				description
				thumbnail {
					childImageSharp {
						fixed(width: 150, height: 150) {
							...GatsbyImageSharpFixed
						}
					}
				}
			}
		}
	}
`;
