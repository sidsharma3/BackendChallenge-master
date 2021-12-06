import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { singleTag } from '../../actions/tag';
import { API, DOMAIN, APP_NAME} from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/submission/Card';

const Tag = ({ tag, submissions }) => {

    const head = () => (
        <Head>
            <title>
                {tag.name} | {APP_NAME}
            </title>
            <meta name="description" content={`Best programming tutorials on ${tag.name}`} />
            <meta property="og:title" content={`${tag.name}| ${APP_NAME}`} />
            <meta property="og:description" content={`Best programming tutorials on ${tag.name}`} />
            <meta property="og:type" content="webiste" />
            <meta property="og:site_name" content={`${APP_NAME}`} />
        </Head>
    );

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <div className="container-fluid text-center">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold">{tag.name}</h1>
                                {submissions.map((b, i) => (
                                    <div>
                                        <Card key={i} submission={b} />
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </header>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    );
};

Tag.getInitialProps = ({ query }) => {
    return singleTag(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { tag: data.tag, submissions: data.submissions };
        }
    });
};

export default Tag;