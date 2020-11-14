import React, { Component,Fragment } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import { courseFilter } from "../../actions/courseFilter";
import PropTypes from "prop-types";
import "./courseStyles.css";

class CourseSearch extends Component {

    state = {
        courseId: '',
        courseCode: ''
    };

    onChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        console.log("SUCCESSSSSSSSSS");
        let courseId = this.state.courseId;
        let courseCode = this.state.courseCode;
        console.log(courseId);
        console.log(courseCode);
        this.props.courseFilter({ courseId, courseCode });
    };

  render() {
    let courses = this.props.courses;
    if(courses == undefined)
    {
        courses = [];
    }
    else{
        courses = courses.docs;
    }
    return (
        <Fragment>
                <h1 style={{ color: 'black', textAlign: 'center', fontSize: '35px'}}>Find your study group!</h1>
                <div className="search-form">       
                <div className="filter-form">
                <h3>Course Filter</h3>
                <h4>Filter this list of courses using course prefix, course code or any combination:</h4>
                </div>
                <h1></h1>
                <h4>Prefix:</h4>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        className="search-input-box"
                        name="courseId"
                        placeholder="Prefix"
                        value={this.state.courseId}
                        onChange={this.onChange}
                        required
                    />
                    <h4>Course Code:</h4>
                    <input
                        type="text"
                        className="search-input-box"
                        name="courseCode"
                        placeholder="Course Code (optional)"
                        value={this.state.courseCode}
                        onChange={this.onChange}
                        
                    />
                    <h4></h4>

                    <input type="submit" className="btn btn-primary" value="Filter" />
                </form>
                <ListGroup>
                <div className="search-form-2">
                <TransitionGroup className="mylist">
                    {courses.map(({ id, courseId,courseCode }) => (
                    <ListGroupItem>
                        <Link
                        to={{
                          pathname: "/viewstudygroup/",
                          query: { courseId: courseId, courseCode: courseCode}
                        }}
                        className="nav-link"
                        >
                        {courseId} {courseCode}
                        </Link>
                    </ListGroupItem>
                    ))}
                </TransitionGroup>
                </div>
                </ListGroup>
                </div>
        </Fragment>
    );
  }
}

function mapStateToProps(state) {
  console.log("State");
  console.log(state);
  console.log("courses?");
  console.log(state.courseReducer.courses[0]);
  return {
        courses: state.courseReducer.courses[0]
  }

}
export default connect(mapStateToProps, { courseFilter })(CourseSearch);