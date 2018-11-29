import React, { Component } from 'react';
import { Form, Icon, Input, Button} from 'antd';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import config from './config';
import 'antd/lib/form/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
const FormItem = Form.Item;

firebase.initializeApp(config);

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            user: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    uiConfig = {
        signInFlow: "popup",
        SignInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: () => false
    }

    componentDidMount = () =>{
        firebase.auth().onAuthStateChanged(user => {
            this.setState({user: !!user});
            console.log(user);
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
    
      render() {
        const { getFieldDecorator } = this.props.form;
        return (
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
            <FormItem>
        
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              
            </FormItem>
            <FormItem>
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
            </FormItem>
          </Form>
        );
      }
}

export default Form.create()(Login);
