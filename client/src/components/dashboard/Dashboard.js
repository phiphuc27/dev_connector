import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../common/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({
    auth: { user },
    profile: { profile, loading },
    getCurrentProfileDispatch,
    deleteAccountDispatch,
}) => {
    useEffect(() => {
        getCurrentProfileDispatch();
    }, [getCurrentProfileDispatch]);

    return loading && profile === null ? (
        <Spinner />
    ) : (
        <>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome {user && user.name}
            </p>
            {profile !== null ? (
                <>
                    <DashboardActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />

                    <div className="my-2">
                        <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => deleteAccountDispatch()}
                        >
                            <i className="fas fa-user-minus" />
                            Delete My Account
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <p>
                        You have not yet setup a profile, please add some info
                    </p>
                    <Link to="/create-profile" className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </>
            )}
        </>
    );
};

Dashboard.propTypes = {
    getCurrentProfileDispatch: PropTypes.func.isRequired,
    deleteAccountDispatch: PropTypes.func.isRequired,
    auth: PropTypes.objectOf(PropTypes.any).isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, {
    getCurrentProfileDispatch: getCurrentProfile,
    deleteAccountDispatch: deleteAccount,
})(Dashboard);
