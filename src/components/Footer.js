import React from 'react';
import { Link } from 'gatsby';

import netlify from '../../content/images/netlify.png';
import gatsby from '../../content/thumbnails/gatsby.png';
import github from '../../content/images/github.png';

export default function Footer() {
return (
	<footer className="footer flex">
		<section className="container">
			<nav className="footer-links">
				<Link to="/blog">Articles</Link>
				<Link to="/guides">Guides</Link>
				<Link to="/rss.xml">RSS</Link>
			</nav>
			<nav className="flex justify-center">
				<a
					href="https://www.gatsbyjs.org/"
					title="Built with Gatsby"
					target="_blank"
					rel="noopener noreferrer"
					className="img"
				>
					<img
						src={gatsby}
						className="footer-img"
						alt="Gatsby"
					/>
				</a>
				<a
					href="https://github.com/sanketgandhi"
					title="Open-source on GitHub"
					target="_blank"
					rel="noopener noreferrer"
					className="img"
				>
					<img
						src={github}
						className="footer-img"
						alt="GitHub"
					/>
				</a>
				<a
					href="https://www.netlify.com/"
					title="Hosted by Netlify"
					target="_blank"
					rel="noopener noreferrer"
					className="img"
				>
					<img
						src={netlify}
						className="footer-img"
						alt="Netlify"
					/>
				</a>
			</nav>
		</section>
	</footer>
);
}
