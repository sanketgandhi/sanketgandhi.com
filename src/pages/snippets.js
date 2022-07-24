import React from 'react';
import Helmet from 'react-helmet';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

import config from '../utils/config';

export default function AllSnippets() {
    return (
        <Layout>
            <Helmet title={`Snippets | ${config.siteTitle}`} />
            <SEO />
            <header>
                <div className="container">
                    <h1>Snippets</h1>
                    <p className="subtitle">WIP...!</p>
                </div>
            </header>
        </Layout>
    );
}
