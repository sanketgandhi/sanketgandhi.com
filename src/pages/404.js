import React from 'react';
import Helmet from 'react-helmet';
import SEO from '../components/SEO';
import ReactFlashlight from '../components/ReactFlashlight';

import config from '../utils/config';

export default function FourOhFour() {
	return (
		<div>
			<Helmet title={`404 | ${config.siteTitle}`} />
			<SEO />
			<ReactFlashlight>
				<div className="not-found-main-container">
					<div className="not-found-sub-container">
						<header>
							<h1 className="not-found">Not Found</h1>
							<p className="not-found-subtitle">Sorry, there is nothing at this URL.</p>
						</header>
					</div>
				</div>
			</ReactFlashlight>
		</div>
	);
}
