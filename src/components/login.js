import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Col} from 'antd';
import firebase from 'firebase';
import config from './config';
import 'antd/lib/form/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
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
            userState: null,
            newUserState: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);

    }

    googleSignIn = () => {
      var baseProvider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(baseProvider).then((result) => {
        this.setState({user: result,
        userState: result.user.I,
      newUserState: result.user.I})
        console.log(this.state.user);
        console.log(this.state.userState)
      }).catch((error) => {
        console.log(error);
      })

      const{history} = this.props;
      if(this.state.userState === true){
        history.push('/profile')
      }
      
    }

    onChangeBool = () => {
      debugger
      this.props.changeState(this.state.newUserState)
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
        this.onChangeBool();
      }
    
      render() {
        const { getFieldDecorator } = this.props.form;
        return (
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
        );
      }
}

export default Form.create()(Login);
