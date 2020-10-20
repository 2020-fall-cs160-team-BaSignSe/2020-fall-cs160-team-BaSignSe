import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
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
    }); // hook

    const { groupName, startDate, endDate, repeating, description, courseId, courseCode } = formData;
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value }); // [e.target.name] makes it so we can use this for every feild dynamically
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("SUCCESS");
        console.log()
        createStudyGroup({ groupName, startDate, endDate, repeating, description, courseId, courseCode });
    };
    return (
        <Fragment>
            {/* <div className="csg-create-group-form"> */}
                <h1>Create Study Group!</h1>
                <form onSubmit={(e) => onSubmit(e)}>
                    <input
                        type="text"
                        className="csg-input-box"
                        name="groupName"
                        placeholder="Group Name"
                        value={groupName}
                        onChange={(e) => onChange(e)}
                        required
                    />

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
                    <input
                        type="text"
                        className="csg-input-box"
                        name="description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => onChange(e)}
                        minLength="6"
                    />
                    <input
                        type="text"
                        className="csg-input-box"
                        name="courseId"
                        placeholder="Course ID"
                        value={courseId}
                        onChange={(e) => onChange(e)}
                        minLength="6"
                    />
                    <input
                        type="text"
                        className="csg-input-box"
                        name="courseCode"
                        placeholder="Course Code"
                        value={courseCode}
                        onChange={(e) => onChange(e)}
                        minLength="6"
                    />
                    <p> </p>

                    {/* <button type="submit" className="signup-btn" value="RegisterUser">
                Sign up
              </button> */}
                    <input type="submit" className="btn btn-primary" value="Create Study Group!" />
                </form>
            {/* </div> */}
        </Fragment>
    );
};
export default connect(null, { createStudyGroup })(CreateStudyGroup);
//     return (
//       <Fragment>
//           <div className="csg-create-group-form">
//             <h1>Create Study Group</h1>
//             <Form onSubmit={(e) => onSubmit(e)}>
//                 <Form>
//                     <Row>
//                     <Col md="6">
//                         <FormGroup>
//                         <Label>Group Name </Label>
//                         <Input
//                             placeholder="Enter Group Name"
//                             className="csg-input-box"
//                             onChange={(e) => onChange(e)}
//                         ></Input>
//                         </FormGroup>
//                     </Col>
//                     </Row>
//                     <Row>
//                     <Col md="6">
//                         <FormGroup>
//                         <Label>Start Date </Label>
//                         <Input
//                             placeholder="StartDate"
//                             className="csg-input-box"
//                             onChange={(e) => onChange(e)}
//                         ></Input>
//                         </FormGroup>
//                     </Col>
//                     <Col md="6">
//                         <FormGroup>
//                         <Label>End Date </Label>
//                         <Input
//                             placeholder="EndDate"
//                             className="csg-input-box"
//                             onChange={(e) => onChange(e)}
//                         ></Input>
//                         </FormGroup>
//                     </Col>
//                     <Col md="6">
//                         <FormGroup>
//                         <Label>Repeating </Label>
//                         <Input
//                             placeholder="Repeating"
//                             className="csg-input-box"
//                             onChange={(e) => onChange(e)}
//                         ></Input>
//                         </FormGroup>
//                     </Col>
//                     </Row>
//                     <Col md="6">
//                         <FormGroup>
//                         <Label>Start Time </Label>
//                         <Input
//                             placeholder="Start Time"
//                             className="csg-input-box"
//                             onChange={(e) => onChange(e)}
//                         ></Input>
//                         </FormGroup>
//                     </Col>
//                     <Col md="6">
//                         <FormGroup>
//                         <Label>End Time </Label>
//                         <Input
//                             placeholder="End Time"
//                             className="csg-input-box"
//                             onChange={(e) => onChange(e)}
//                         ></Input>
//                         </FormGroup>
//                     </Col>
//                     <Col md="6">
//                         <FormGroup>
//                         <Label>Time Zone </Label>
//                         <Input
//                             placeholder="Time Zone"
//                             className="csg-input-box"
//                             onChange={(e) => onChange(e)}
//                         ></Input>
//                         </FormGroup>
//                     </Col>
//                     <Row>
//                     <Col md="6">
//                         <FormGroup>
//                         <Label>Meeting Link </Label>
//                         <Input
//                             placeholder="Meeting Link"
//                             className="csg-input-box"
//                             onChange={(e) => onChange(e)}
//                         ></Input>
//                         </FormGroup>
//                     </Col>
//                     </Row>
//                     <Row>
//                     <Col md="6">
//                         <FormGroup>
//                         <Label>Description </Label>
//                         <Input
//                             placeholder="Enter Description"
//                             className="csg-input-box"
//                             onChange={(e) => onChange(e)}
//                         ></Input>
//                         </FormGroup>
//                     </Col>
//                     </Row>
//                 </Form>
//                 <Button variant="primary" type="submit">
//                     Submit
//                 </Button>
//             </Form>

//           </div>
//       </Fragment>
//     );
// };
// export default connect(null, {createStudyGroup})(CreateStudyGroup);
