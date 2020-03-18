import React from 'react'
import routes from '../../../Route/admin'
import { Link, Route } from 'react-router-dom'
import { 
    Layout,
    Avatar,
    Menu,
    Dropdown
} from 'antd'
import {
    MenuFoldOutlined, 
    MenuUnfoldOutlined, 
    DownOutlined
} from '@ant-design/icons'
import './index.less'

const { Header, Sider, Content } = Layout

export default class AdminLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            userName: sessionStorage.getItem('blogUser') || 'nobody'
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    handleClickMenuItem(item) {
        sessionStorage.setItem('menuItemKey', String(item.key))
    }

    menuItem = () => {
        return routes.filter(item => item.menu).map((item, idx) => {
            return (
                <Menu.Item 
                    key={idx}
                    onClick={item => this.handleClickMenuItem(item)}
                >
                    <Link to={item.path}>
                        <item.icon />
                        <span>{ item.title }</span>
                    </Link>
                </Menu.Item>
            )
        })
    }

    handleClickDrop() {
        this.props.history.push('/login')
    }

    render() {
        const menu = (
            <Menu onClick={() => this.handleClickDrop()}>
                <Menu.Item key="1">login out</Menu.Item>
            </Menu>
        )

        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <Menu
                        theme='dark'
                        mode='inline'
                        defaultSelectedKeys={sessionStorage.getItem('menuItemKey') || '0'}
                    >
                        { this.menuItem() }
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{backgroundColor: '#fff', padding: 0}}>
                        {
                            this.state.collapsed ? 
                                <MenuUnfoldOutlined className="trigger" onClick={this.toggle}/>
                                : <MenuFoldOutlined className="trigger" onClick={this.toggle}/>
                        }
                        <span className="user">
                            <Avatar style={{backgroundColor: '#f56a00'}}>
                                {this.state.userName}
                            </Avatar>
                            <Dropdown overlay={menu}>
                                <DownOutlined style={{paddingLeft: 10}}/>
                            </Dropdown>
                        </span>
                    </Header>
                    <Content className="content">
                        {
                            routes.map((item, idx) => {
                                return (
                                    <Route 
                                        key={idx}
                                        path={item.path}
                                        component={item.component}
                                    />
                                )
                            })
                        }
                    </Content>
                </Layout>
            </Layout>
        )
    }
}