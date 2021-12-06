import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const SmallCard = ({ submission }) => {
    return (
        <div className="card">
            <section>
                <Link href={`/submissions/${submission.slug}`}>
                    <a>
                        <img
                            className="img img-fluid"
                            style={{ height: '250px', width: '100%' }}
                            src={`${API}/submission/photo/${submission.slug}`}
                            alt={submission.title}
                        />
                    </a>
                </Link>
            </section>

            <div className="card-body">
                <section>
                    <Link href={`/submissions/${submission.slug}`}>
                        <a>
                            <h5 className="card-title">{submission.title}</h5>
                        </a>
                    </Link>
                    <p className="card-text">{submission && submission.excerpt ? renderHTML(submission.excerpt) : 'No Excerpt'}</p>
                </section>
            </div>

            <div className="card-body">
                Posted {moment(submission.updatedAt).fromNow()} by{' '}
                <Link href={`/profile/${submission.postedBy.username}`}>
                    <a>{submission.postedBy.username}</a>
                </Link>
            </div>
        </div>
    );
};

export default SmallCard;