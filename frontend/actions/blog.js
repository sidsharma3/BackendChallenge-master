import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import {isAuth, handleResponse} from './auth'

export const createBlog = (submission, token) => {

    let createBlogEndpoint;

    if(isAuth() && isAuth().role == 1){
        createBlogEndpoint = `${API}/submission`
    } else if (isAuth() && isAuth().role == 0){
        createBlogEndpoint = `${API}/user/submission`
    }

    return fetch(`${createBlogEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: submission
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listBlogsWithCategoriesAndTags = (skip, limit) => {
    const data = {
        limit,
        skip
    };
    return fetch(`${API}/submissions-categories-tags`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleBlog = slug => {
    return fetch(`${API}/submission/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listRelated = submission => {
    return fetch(`${API}/submissions/related`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(submission)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = username => {
    let listBlogsEndpoint;

    if (username) {
        listBlogsEndpoint = `${API}/${username}/submissions`;
    } else {
        listBlogsEndpoint = `${API}/submissions`;
    }

    return fetch(`${listBlogsEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeBlog = (slug, token) => {
    let deleteBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deleteBlogEndpoint = `${API}/submission/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deleteBlogEndpoint = `${API}/user/submission/${slug}`;
    }

    return fetch(`${deleteBlogEndpoint}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateBlog = (submission, token, slug) => {
    let updateBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updateBlogEndpoint = `${API}/submission/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updateBlogEndpoint = `${API}/user/submission/${slug}`;
    }

    return fetch(`${updateBlogEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: submission
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listSearch = params => {
    console.log('search params', params);
    let query = queryString.stringify(params);
    console.log('query params', query);
    return fetch(`${API}/submissions/search?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};