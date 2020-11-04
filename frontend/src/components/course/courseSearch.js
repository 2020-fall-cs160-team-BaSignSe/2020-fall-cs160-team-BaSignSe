import React, { Component,Fragment } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import { courseFilter } from "../../actions/courseFilter";
import PropTypes from "prop-types";

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
                <h1>Find your course</h1>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        className="csg-input-box"
                        name="courseId"
                        placeholder="courseId"
                        value={this.state.courseId}
                        onChange={this.onChange}
                        required
                    />

                    <input
                        type="text"
                        className="csg-input-box"
                        name="courseCode"
                        placeholder="courseCode"
                        value={this.state.courseCode}
                        onChange={this.onChange}
                        
                    />
                   
                    <p> </p>

                    <input type="submit" className="btn btn-primary" value="Find course" />
                </form>
                <ListGroup>
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
                </ListGroup>
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