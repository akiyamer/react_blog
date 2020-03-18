import React from 'react'
import {
    Form,
    Card,
    Input,
    Button,
    message
} from 'antd'
import './index.less'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import api from '../../../api'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    async onFinish(values) {
        const {code, data, desc} = await api.post('/login', values)
        if (code === 1000) {
            message.success('登录成功')
            sessionStorage.setItem('blogUser', data.name)
            this.props.history.push('/admin')
        } else {
            message.error('登录失败')
        }
    }

    render() {
        return (
            <div className="login">
                <Card className="login-form" style={{width: 300,borderRadius: 4}}>
                    <Form onFinish={(values) => this.onFinish(values)}>
                        <Form.Item 
                            name="username" 
                            rules={[{ required: true, message: 'Please input username!' }]} 
                        >
                            <Input 
                                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                placeholder="请输入用户名"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password" 
                            rules={[{ required: true, message: 'Please input password!' }]} 
                        >
                            <Input 
                                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                placeholder="请输入密码"
                                type="password"
                            />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" block>Log in</Button>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Login