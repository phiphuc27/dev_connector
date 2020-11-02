import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
    auth,
    post: { _id, text, name, avatar, user, likes, comments, date },
    removeLikeDispatch,
    addLikeDispatch,
    deletePostDispatch,
    showAction,
}) => (
    <div className="post bg-white p-1 my-1">
        <div>
            <Link to={`/profile/${user}`}>
                <img className="round-img" src={avatar} alt="" />
                <h4>{name}</h4>
            </Link>
        </div>
        <div>
            <p className="my-1">{text}</p>
            <p className="post-date">
                Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>
            {showAction && (
                <>
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => addLikeDispatch(_id)}
                    >
                        <i className="fas fa-thumbs-up" />{' '}
                        {likes.length > 0 && <span>{likes.length}</span>}
                    </button>
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => removeLikeDispatch(_id)}
                    >
                        <i className="fas fa-thumbs-down" />
                    </button>
                    <Link to={`/posts/${_id}`} className="btn btn-primary">
                        Discussion{' '}
                        {comments.length > 0 && (
                            <span className="comment-count">
                                {comments.length}
                            </span>
                        )}
                    </Link>
                    {!auth.loading && user === auth.user._id && (
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deletePostDispatch(_id)}
                        >
                            <i className="fas fa-times" />
                        </button>
                    )}
                </>
            )}
        </div>
    </div>
);

PostItem.defaultProps = {
    showAction: true,
};

PostItem.propTypes = {
    post: PropTypes.objectOf(PropTypes.any).isRequired,
    auth: PropTypes.objectOf(PropTypes.any).isRequired,
    addLikeDispatch: PropTypes.func.isRequired,
    removeLikeDispatch: PropTypes.func.isRequired,
    deletePostDispatch: PropTypes.func.isRequired,
    showAction: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {
    addLikeDispatch: addLike,
    removeLikeDispatch: removeLike,
    deletePostDispatch: deletePost,
})(PostItem);
