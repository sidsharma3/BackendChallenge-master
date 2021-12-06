import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBlog } from '../../actions/submission';
import moment from 'moment';

const BlogRead = ({ username }) => {
    const [submissions, setBlogs] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = () => {
        list(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setBlogs(data);
            }
        });
    };

    const deleteBlog = slug => {
        removeBlog(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadBlogs();
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete this?');
        if (answer) {
            deleteBlog(slug);
        }
    };

    const showUpdateButton = submission => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/${submission.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning">Update</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                <Link href={`/admin/crud/${submission.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning">Update</a>
                </Link>
            );
        }
    };

    const showAllBlogs = () => {
        return submissions.map((submission, i) => {
            return (
                <div key={i} className="pb-5">
                    <h3>{submission.title}</h3>
                    <p className="mark">
                        Written by {submission.postedBy.name} | Published on {moment(submission.updatedAt).fromNow()}
                    </p>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(submission.slug)}>
                        Delete
                    </button>
                    {showUpdateButton(submission)}
                </div>
            );
        });
    };

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12">
                    {message && <div className="alert alert-warning">{message}</div>}
                    {showAllBlogs()}
                </div>
            </div>
        </React.Fragment>
    );
};

export default BlogRead;