import React, { Fragment, useState } from "react";
import { Link, Redirect, withRouter} from "react-router-dom";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col, Container } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStudyGroup } from '../../actions/studygroup';
import './styles.css';

export const CreateStudyGroup = ({ createStudyGroup }) => {
    const [formData, setFormData] = useState({
        groupName: "",
        startDate: "",
        endDate: "",
        repeating: "",
        description: "",
        courseId: "",
        courseCode: "",
        result: false,
    }); // hook



    const { groupName, startDate, endDate, repeating, description, courseId, courseCode, result } = formData;
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value }); // [e.target.name] makes it so we can use this for every feild dynamically
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("SUCCESS");
        console.log()
        createStudyGroup({ groupName, startDate, endDate, repeating, description, courseId, courseCode }).then(result => {
            console.log(result);
            if (result){
                setFormData({ ...formData, ["result"]: result});
            }

        });
    };
    if(result){
        return <Redirect to="/dashboard" />; 
    } else {
        return (
            <Fragment>
                {/* <div className="csg-create-group-form"> */}
                <h1 style={{ color: 'black', textAlign: 'center', fontSize: '35px'}}>Create your study group!</h1>
                    <div className="csg-create-group-form">
                    <form onSubmit={(e) => onSubmit(e)}>
                        <h1></h1>
                        <h4>Group Name:</h4>
                        <input
                            type="text"
                            className="csg-input-box"
                            name="groupName"
                            placeholder="Group Name"
                            value={groupName}
                            onChange={(e) => onChange(e)}
                            required
                        />
                        <h1></h1>
                        <h4>Start and End Date:</h4>
                        <input
                            type="text"
                            className="csg-input-box"
                            name="startDate"
                            placeholder="Start Date"
                            value={startDate}
                            onChange={(e) => onChange(e)}
                            required
                        />
                        <input
                            type="text"
                            className="csg-input-box"
                            name="endDate"
                            placeholder="End Date"
                            value={endDate}
                            onChange={(e) => onChange(e)}
                            required
                        />
                        <input
                            type="text"
                            className="csg-input-box"
                            name="repeating"
                            placeholder="Repeating"
                            value={repeating}
                            onChange={(e) => onChange(e)}
                            required
                        />
                        <h1></h1>
                        <h4>Course ID and Course Code:</h4>
                        <input
                            type="text"
                            className="csg-input-box"
                            name="courseId"
                            placeholder="Course ID"
                            value={courseId}
                            onChange={(e) => onChange(e)}
                            required
                        />
                        <input
                            type="text"
                            className="csg-input-box"
                            name="courseCode"
                            placeholder="Course Code"
                            value={courseCode}
                            onChange={(e) => onChange(e)}
                            required
                        />
                        <h1></h1>
                        <h4>Description:</h4>
                        <input
                            type="text"
                            className="csg-input-description-box"
                            name="description"
                            value={description}
                            onChange={(e) => onChange(e)}
                            required
                        />
                        <p> </p>
    
                        {/* <button type="submit" className="signup-btn" value="RegisterUser">
                    Sign up
                  </button> */}
                        <input type="submit" className="btn btn-primary" value="Create Study Group" />
                    </form>
                {/* </div> */}
                </div>
            </Fragment>
        );
    };
}
    
export default connect(null, { createStudyGroup })(CreateStudyGroup);