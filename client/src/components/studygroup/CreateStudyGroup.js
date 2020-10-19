import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col, Container} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth'; 
import "./styles.css";

export const CreateStudyGroup = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      }); // hook
    
    const { email, password } = formData;
    const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); // [e.target.name] makes it so we can use this for every feild dynamically

    const onSubmit = async (e) => {
        e.preventDefault();
        //console.log("SUCCESS");
        login(email, password);
    };    

    return (
      <Fragment>
          <div className="create-group-form">
            <h1>Create Study Group</h1>
            <Form onSubmit={(e) => onSubmit(e)}>
                <Form>
                    <Row>
                    <Col md="6">
                        <FormGroup>
                        <Label>Group Name </Label>
                        <Input
                            id="exampleFormControlInput1"
                            placeholder="Enter Group Name"
                            type="groupname"
                            className="input-box"
                            onChange={(e) => onChange(e)}
                        ></Input>
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col md="6">
                        <FormGroup>
                        <Label>Start Date </Label>
                        <Input
                            id="exampleFormControlInput2"
                            placeholder="StartDate"
                            type="startdate"
                            className="input-box"
                            onChange={(e) => onChange(e)}
                        ></Input>
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                        <Label>End Date </Label>
                        <Input
                            id="exampleFormControlInput3"
                            placeholder="EndDate"
                            type="enddate"
                            className="input-box"
                            onChange={(e) => onChange(e)}
                        ></Input>
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                        <Label>Repeating </Label>
                        <Input
                            id="exampleFormControlInput4"
                            placeholder="Repeating"
                            type="repeating"
                            className="input-box"
                            onChange={(e) => onChange(e)}
                        ></Input>
                        </FormGroup>
                    </Col>
                    </Row>
                    <Col md="6">
                        <FormGroup>
                        <Label>Start Time </Label>
                        <Input
                            id="exampleFormControlInput5"
                            placeholder="Start Time"
                            type="starttime"
                            className="input-box"
                            onChange={(e) => onChange(e)}
                        ></Input>
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                        <Label>End Time </Label>
                        <Input
                            id="exampleFormControlInput6"
                            placeholder="End Time"
                            type="enddate"
                            className="input-box"
                            onChange={(e) => onChange(e)}
                        ></Input>
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                        <Label>Time Zone </Label>
                        <Input
                            id="exampleFormControlInput8"
                            placeholder="Time Zone"
                            type="timezone"
                            className="input-box"
                            onChange={(e) => onChange(e)}
                        ></Input>
                        </FormGroup>
                    </Col>
                    <Row>
                    <Col md="6">
                        <FormGroup>
                        <Label>Meeting Link </Label>
                        <Input
                            id="exampleFormControlInput9"
                            placeholder="Meeting Link"
                            type="meetinglink"
                            className="input-box"
                            onChange={(e) => onChange(e)}
                        ></Input>
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col md="6">
                        <FormGroup>
                        <Label>Description </Label>
                        <Input
                            id="exampleFormControlInput10"
                            placeholder="Enter Description"
                            type="description"
                            className="input-box"
                            onChange={(e) => onChange(e)}
                        ></Input>
                        </FormGroup>
                    </Col>
                    </Row>
                </Form>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            
          </div>
      </Fragment>
    );
};
export default CreateStudyGroup;
  