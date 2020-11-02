import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';

const Posts = ({ post: { posts, loading }, getPostsDispatch }) => {
    useEffect(() => {
        getPostsDispatch();
    }, [getPostsDispatch]);

    return loading ? (
        <Spinner />
    ) : (
        <>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome to the community
            </p>
            <PostForm />
            <div className="posts">
                {posts.map((post) => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </>
    );
};

Posts.propTypes = {
    getPostsDispatch: PropTypes.func.isRequired,
    post: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post,
});

export default connect(mapStateToProps, { getPostsDispatch: getPosts })(Posts);
