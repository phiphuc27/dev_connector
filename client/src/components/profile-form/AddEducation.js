import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducationDispatch, history }) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: '',
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <>
            <h1 className="large text-primary">Add Your Education</h1>
            <p className="lead">
                <i className="fas fa-code-branch" /> Add any school or bootcamp
                that you have attended
            </p>
            <small>* = required field</small>
            <form
                className="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    addEducationDispatch(formData, history);
                }}
            >
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        value={school}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        value={degree}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Field of Study"
                        name="fieldofstudy"
                        value={fieldofstudy}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input
                        type="date"
                        name="from"
                        value={from}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <p>
                        <input
                            type="checkbox"
                            name="current"
                            checked={current}
                            value={current}
                            onChange={() => {
                                setFormData({ ...formData, current: !current });
                                toggleDisabled(!toDateDisabled);
                            }}
                        />{' '}
                        Current School
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input
                        type="date"
                        name="to"
                        value={to}
                        onChange={(e) => onChange(e)}
                        disabled={toDateDisabled ? 'disable' : ''}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                        value={description}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </>
    );
};

AddEducation.propTypes = {
    addEducationDispatch: PropTypes.func.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, { addExperienceDispatch: addEducation })(
    withRouter(AddEducation)
);