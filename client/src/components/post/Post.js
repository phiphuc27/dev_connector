import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { getPost } from '../../actions/post';

const Post = ({ getPostDispatch, post: { post, loading }, match }) => {
    useEffect(() => {
        getPostDispatch(match.params.id);
    }, [getPostDispatch, match.params.id]);

    return loading || post === null ? (
        <Spinner />
    ) : (
        <>
            <Link to="/posts" className="btn">
                Back to posts
            </Link>
            <PostItem post={post} showAction={false} />
            <CommentForm postId={post._id} />
            <div className="comments">
                {post.comments.map((comment) => (
                    <CommentItem
                        key={comment._id}
                        comment={comment}
                        postId={post._id}
                    />
                ))}
            </div>
        </>
    );
};

Post.propTypes = {
    getPostDispatch: PropTypes.func.isRequired,
    post: PropTypes.objectOf(PropTypes.any).isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post,
});

export default connect(mapStateToProps, { getPostDispatch: getPost })(Post);
