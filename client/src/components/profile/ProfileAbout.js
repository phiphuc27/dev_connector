/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
    profile: {
        bio,
        skills,
        user: { name },
    },
}) => (
    <div className="profile-about bg-light p-2">
        {bio && (
            <>
                <h2 className="text-primary">
                    {name.trim().split(' ')[0]}&rsquo;s Bio
                </h2>
                <p>{bio}</p>
                <div className="line" />
            </>
        )}

        <h2 className="text-primary">Skill Set</h2>
        <div className="skills">
            {skills.map((skill, index) => (
                <div key={index} className="p-1">
                    <i className="fas fa-check" />
                    {skill}
                </div>
            ))}
        </div>
    </div>
);

ProfileAbout.propTypes = {
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProfileAbout;
