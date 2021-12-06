import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import React, { useState, useEffect } from 'react';
import { singleBlog, listRelated } from '../../actions/submission';
import { API, DOMAIN, APP_NAME } from '../../config';
import moment from 'moment';
import renderHTML from 'react-render-html';
import SmallCard from '../../components/submission/SmallCard';
import DisqusThread from '../../components/DisqusThread';
import BlogUpdate from '../../components/crud/BlogUpdate';

const SingleBlog = ({ submission, query }) => {

    const [related, setRelated] = useState([]);

    const loadRelated = () => {
        listRelated({ submission }).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setRelated(data);
            }
        });
    };

    useEffect(() => {
        loadRelated();
    }, []);

    const head = () => (
        <Head>
            <title>
                {submission.title} | {APP_NAME}
            </title>
            <meta name="description" content={submission.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/submissions/${query.slug}`} />
            <meta property="og:title" content={`${submission.title}| ${APP_NAME}`} />
            <meta property="og:description" content={submission.mdesc} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/submissions/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${API}/submission/photo/${submission.slug}`} />
            <meta property="og:image:secure_url" ccontent={`${API}/submission/photo/${submission.slug}`} />
            <meta property="og:image:type" content="image/jpg" />
        </Head>
    );

    const showBlogCategories = submission =>
        submission.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ));

    const showBlogTags = submission =>
        submission.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ));

    const showRelatedBlog = () => {
        return related.map((submission, i) => (
            <div className="col-md-4" key={i}>
                <article>
                    <SmallCard submission={submission} />
                </article>
            </div>
        ));
    };

    const showComments = () => {
        return (
            <div>
                <DisqusThread id={submission._id} title={submission.title} path={`/submission/${submission.slug}`} />
            </div>
        )
    }

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <article>
                        <div className="container-fluid">
                            <section>
                                <div className="row" style={{ marginTop: '-30px' }}>
                                    <img
                                        src={`${API}/submission/photo/${submission.slug}`}
                                        alt={submission.title}
                                        className="img img-fluid featured-image"
                                    />
                                </div>
                            </section>

                            <section>
                                <div className="container">
                                    <h1 className="display-2 pb-3 pt-3 text-center font-weight-bold">{submission.title}</h1>
                                    <p className="lead mt-3 mark">
                                    Written by{' '}
                                        <Link href={`/profile/${submission.postedBy.username}`}>
                                            <a>{submission.postedBy.username}</a>
                                        </Link>{' '}
                                        | Published {moment(submission.updatedAt).fromNow()}
                                    </p>

                                    <div className="pb-3">
                                        {showBlogCategories(submission)}
                                        {showBlogTags(submission)}
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="container">
                            <section>
                                <div className="col-md-12 lead">{renderHTML(submission.body)}</div>
                            </section>
                        </div>

                        <div className="container">
                            <h4 className="text-center pt-5 pb-5 h2">Related submissions</h4>
                            <hr />
                            <div className="row">
                                {showRelatedBlog()}
                            </div>
                        </div>

                        <div className="container pt-5 pb-5">
                            {showComments()}
                        </div>
                    </article>
                </main>
            </Layout>
        </React.Fragment>
    );
};

SingleBlog.getInitialProps = ({ query }) => {
    return singleBlog(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            // console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
            return { submission: data, query };
        }
    });
};

export default SingleBlog;