import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Col, Card} from 'antd';
import {withRouter} from 'react-router-dom';
import firebase from 'firebase';
import config from './config';
import 'antd/lib/form/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/card/style/css';
import ButtonGroup from 'antd/lib/button/button-group';
const FormItem = Form.Item;

firebase.initializeApp(config);

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            user: null,
            userState: false,
            newUserState: null,
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
        this.routeChange = this.routeChange.bind(this);

    }

    googleSignIn = () => {
      var baseProvider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(baseProvider).then((result) => {
        this.setState({user: result.user,
        userState: result.user.I,
        newUserState: result.user.I})
        console.log(this.state.user);
        console.log(this.state.userState)
      }).catch((error) => {
        console.log(error);
      })

      
      
    }


    handleChange = (e) => {
        
        this.props.form.validateFields((err, values) => {
            if(!err){
                this.setState({
                    ...this.state
                })        
            }
            console.log(this.state);
            
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.setState({
                ...this.state
            }) 
            console.log(this.state);
          }
        });
      }

      handleClick = () => {
        this.googleSignIn();
        
      }

      routeChange = () => {
        let path = '/reservations'
        this.props.history.push(path);
      }
    
      render() {
        const { getFieldDecorator } = this.props.form;
        const userState = this.state.userState;
        const {Meta} = Card;
        return (
          <div>
            {userState ? (
              <Row type="flex" justify="center" align="middle">
                <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                  <Card style={{ width: 240 }} cover={<img alt="profile pic" src={this.state.user.photoURL} />}>
                    <Meta title={this.state.user.displayName}/>
                  </Card>
                  <Button onClick={this.routeChange}>Reserve Flight</Button>
                </Col>
              </Row>
            ) : (
              <Row type="flex" justify="center" align="middle">
              <Col xs={20} sm={16} md={12} lg={8} xl={4}>
              <Form onSubmit={this.handleSubmit} className="login-form" layout="inline">
              <FormItem>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onChange={this.handleChange} />
                )}
              </FormItem>
              <ButtonGroup>
                <FormItem>
          
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
          
                </FormItem>
                <FormItem>
                  <Button type="danger"  icon="google" htmlType="button"  className="login-form-button" onClick={this.handleClick.bind(this)} >
                    Log in With Google
                  </Button>
                </FormItem>
              </ButtonGroup>
            </Form>
              </Col>
            </Row>
            )}
          </div>
          
        );
      }
}

export default Form.create()(Login);
