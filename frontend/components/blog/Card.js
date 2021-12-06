import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const Card = ({ submission }) => {
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

    return (
        <div className="lead pb-4">
            <header>
                <Link href={`/submissions/${submission.slug}`}>
                    <a>
                        <h2 className="pt-3 pb-3 font-weight-bold">{submission.title}</h2>
                    </a>
                </Link>
            </header>
            <section>
                <p className="mark ml-1 pt-2 pb-2">
                Written by{' '}
                    <Link href={`/profile/${submission.postedBy.username}`}>
                        <a>{submission.postedBy.username}</a>
                    </Link>{' '}
                    | Published {moment(submission.updatedAt).fromNow()}
                </p>
            </section>
            <section>
                {showBlogCategories(submission)}
                {showBlogTags(submission)}
                <br />
                <br />
            </section>

            <div className="row">
                <div className="col-md-4">
                    <section>
                        <img
                            className="img img-fluid"
                            style={{ maxHeight: 'auto', width: '100%' }}
                            src={`${API}/submission/photo/${submission.slug}`}
                            alt={submission.title}
                        />
                    </section>
                </div>
                <div className="col-md-8">
                    <section>
                        <div className="pb-3">{submission && submission.excerpt ? renderHTML(submission.excerpt) : 'No Excerpt'}</div>
                        <Link href={`/submissions/${submission.slug}`}>
                            <a className="btn btn-primary pt-2">Read more</a>
                        </Link>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Card;