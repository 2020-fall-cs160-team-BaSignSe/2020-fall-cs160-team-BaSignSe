import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { courseFilter } from '../../actions/courseFilter';
//import './styles.css';

export const Course = ({ courseFilter } ) => {
    const [formData, setFormData] = useState({
        courseId: "",
        courseCode: "",
    }); // hook

    const { courseId, courseCode } = formData;

    const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); // [e.target.name] makes it so we can use this for every feild dynamically
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("SUCCESSSSSSSSSS");
        console.log()
        courseFilter({ courseId, courseCode });

        //console.log("HEHEHEHEHEHE");
        //console.log(this.props.co);
    };

    // componentDidMount() {
    //     //this.props.courseFilter();
    //     console.log(this.props);
    //   }


    return (
        <Fragment>
                <h1>Find your course</h1>
                <form onSubmit={(e) => onSubmit(e)}>
                    <input
                        type="text"
                        className="csg-input-box"
                        name="courseId"
                        placeholder="courseId"
                        value={courseId}
                        onChange={(e) => onChange(e)}
                        required
                    />

                    <input
                        type="text"
                        className="csg-input-box"
                        name="courseCode"
                        placeholder="courseCode"
                        value={courseCode}
                        onChange={(e) => onChange(e)}
                        
                    />
                   
                    <p> </p>

                    <input type="submit" className="btn btn-primary" value="Find course" />
                </form>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    courses: state.courseReducer.courses
  });
  //console.log("HEHEHEHEHEHE");
  //console.log(mapStateToProps);

export default connect(mapStateToProps, { courseFilter })(Course);
