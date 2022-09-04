import React from 'react';
import Helmet from 'react-helmet';

import Layout from '../components/Layout';
import Tools from '../components/Tools';
import SEO from '../components/SEO';

import config from '../utils/config';
import tools from '../data/tools';

export default function AllTools() {
	return (
		<Layout>
			<Helmet title={`Tools | ${config.siteTitle}`} />
			<SEO />
			<header>
				<div className="container">
					<h1>Tools</h1>
					<p className="subtitle">Quick links for some useful tools.</p>
				</div>
			</header>
			<section>
				<div className="container">
					<Tools data={tools} />
				</div>
			</section>
		</Layout>
	);
}
