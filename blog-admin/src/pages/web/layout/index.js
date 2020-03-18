import React from 'react'
import {
    Layout,
    Col,
    Row,
    BackTop
} from 'antd'
import {Route} from 'react-router-dom'
import HeaderCustom from '../header'
import SiderCustom from '../sider'
import routes from '../../../Route/web'
import './index.less'

const { Content, Footer, Sider } = Layout

export default class WebLayout extends React.Component {
    render() {
        const contentHeight = document.body.clientHeight - 64 - 62;
        return (
            <div>
                <Layout>
                    <HeaderCustom {...this.props}></HeaderCustom>
                    <Layout className="wrapper-content">
                        <Content style={{ paddingTop: 24, margin: 0, minHeight: contentHeight, height: '100%', overflow: 'initial'}}>
                            <Row>
                                <Col
                                    lg={{ span: 5, offset: 1 }}
                                    md={{ span: 6, offset: 1 }}
                                    xs={{ span: 0 }}
                                >
                                    <SiderCustom {...this.props}/>
                                </Col>
                                <Col
                                    lg={{ span: 16, offset: 1 }}
                                    md={{ span: 16, offset: 1 }}
                                    xs={{ span: 24 }}
                                    className="about-wrapper"
                                >
                                    {
                                        routes.map(({path, component, ...props}, index) => {
                                            return (
                                                <Route 
                                                    key={index}
                                                    path={path}
                                                    component={component}
                                                    exact
                                                    {...props}
                                                />
                                            )
                                        })
                                    }
                                </Col>
                            </Row>
                        </Content>
                    </Layout>
                    <Footer style={{textAlign: 'center'}}>
                        Copyright @ Miles 2020
                    </Footer>
                </Layout>
                <BackTop visibilityHeight='100'/>
            </div>
        )
    }
}