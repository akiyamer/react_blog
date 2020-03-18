import React from 'react';
import {
    Layout,
    Row,
    Col,
    Menu
} from 'antd'
import { SmileTwoTone } from '@ant-design/icons'
import "./index.less"
import { Link } from 'react-router-dom'
import menus from '../../../Route/web'

const { Header } = Layout

class HeaderCustom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: '0'
        }
    }

    handleClick = e => {
        this.setState({
            current: e.key
        })
    }

    render() {
        const menuList = menus.filter(v => v.menu)
        return (
            <Header className="header-container">
                <Row>
                    <Col lg={{span: 4}} md={{span: 4}} xs={{span: 0}}>
                        <div className="logo">
                            <SmileTwoTone style={{ marginRight: 5 }}/>Miles的博客
                        </div>
                    </Col>
                    <Col lg={{span: 14}} md={{span: 14}} xs={{span: 24}} className='mobile'>
                        <Menu mode="horizontal" onClick={this.handleClick} selectedKeys={[this.state.current]}>
                            {
                                menuList.map((item, idx) => {
                                    return <Menu.Item key={idx}>
                                        <Link to={item.path}>
                                            <item.icon />
                                            <span className="nav-text">{item.title}</span>
                                        </Link>
                                    </Menu.Item>
                                })
                            }
                        </Menu>
                    </Col>
                </Row>
            </Header>
        )
    }
}

export default HeaderCustom