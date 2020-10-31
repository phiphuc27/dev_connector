import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../common/Spinner';
import DashboardActions from './DashboardActions';

import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
    auth: { user },
    profile: { profile, loading },
    getCurrentProfileDispatch,
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
    auth: PropTypes.objectOf(PropTypes.any).isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, {
    getCurrentProfileDispatch: getCurrentProfile,
})(Dashboard);
