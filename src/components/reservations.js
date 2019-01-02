import React, { Component } from 'react';
import firebase from 'firebase';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
import config from './config';
import 'antd/lib/form/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import ButtonGroup from 'antd/lib/button/button-group';
const FormItem = Form.Item;



class Reservations extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      lastName: "",
      airport: "",
      destination: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }


  updateInput = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
      console.log(this.state);
  }

  handleSubmit = (e) =>{
    e.preventDefault();

    const db = firebase.firestore();

    db.settings({
      timestampsInSnapshots: true
    });
    const dataRef = db.collection("submit").add({
      name: this.state.name,
      lastName: this.state.lastName,
      airport: this.state.airport,
      destination: this.state.airport

    })

    this.setState({
      name: "",
      lastName: "",
      airport: "",
      destination: ""
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
     <Row type="flex" justify="center" align="middle">
      <Col span={4}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your name!' }]
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="Name" onChange={this.updateInput} type="text" name="name" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('lastName', {
              rules: [{ required: true, message: 'Please input your Last Naem!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" onChange={this.updateInput} name="lastName"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('airport', {
              rules: [{ required: true, message: 'Please input your airport!' }],
              })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Airport" onChange={this.updateInput} name="airport"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('destination', {
              rules: [{ required: true, message: 'Please input your destination!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Destination" onChange={this.updateInput} name="destination"/>
            )}
          </FormItem>

          <ButtonGroup>
            <FormItem>
        
              <Button type="primary" htmlType="submit" className="login-form-button">
                Submit Reservation!
              </Button>
        
            </FormItem>
            </ButtonGroup>
          

        </Form>
      </Col>
     </Row>
    );
  }
}

export default Form.create()(Reservations);
