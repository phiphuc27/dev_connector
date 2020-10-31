import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProfiles } from '../../actions/profile';

import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = ({ getProfilesDispatch, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfilesDispatch();
    }, [getProfilesDispatch]);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop" /> Browse and
                        connect with developers
                    </p>
                    <div className="profiles">
                        {profiles.length > 0 ? (
                            profiles.map((profile) => (
                                <ProfileItem
                                    key={profile._id}
                                    profile={profile}
                                />
                            ))
                        ) : (
                            <h4>No profiles found...</h4>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

Profiles.propTypes = {
    getProfilesDispatch: PropTypes.func.isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { getProfilesDispatch: getProfiles })(
    Profiles
);
