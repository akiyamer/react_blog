import React from 'react'
import avatar from '../../../assets/lf.jpg'
import {
    Card,
    Divider,
    Tag
} from 'antd'
import api from '../../../api'
import { color } from '../../../utils/index'
import './index.less'

class SiderCustom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            articleData: []
        }
    }

    componentDidMount() {
        this.getArticleList()
        this.getTags()
    }

    async getArticleList() {
        const {data, code} = await api.get('/article/list', {pageNo: 1, pageSize: 5})
        code === 1000 && this.setState({articleData: data})
    }

    async getTags() {
        const {data, code} =await api.get('/tag/listAll')
        code === 1000 && this.setState({tags: data})
    }

    handleDetail(id) {
        this.props.history.push(`/web/detail/${id}`)
    }

    render() {
        const articleList = this.state.articleData.map(item => (
            <li 
                key = {item.id}
                onClick = {this.handleDetail.bind(this, item.id)}
            >
                {item.title}
            </li>
        ))
        return (
            <div className='sider-container'>
                <div className='admin-info'>
                    <header>
                        <img src={avatar} alt="avatar" title="翻译翻译什么叫惊喜"/>
                    </header>
                    <p className="admin-name">
                        Miles
                    </p>
                    <p className="admin-desc">
                        胡万就是麻匪
                        <br />
                        麻匪就是胡万
                    </p>
                </div>
                <div className="recent-article">
                    <Card bordered={false}>
                        <Divider orientation="left">最近文章</Divider>
                        <ul className="recent-list">
                            {articleList}
                        </ul>
                    </Card>
                </div>

                <div className="tags-wrapper">
                    <Card bordered={false}>
                        <Divider orientation="left">标签</Divider>
                        <div className="tags-content">
                            {
                                this.state.tags.map(item => {
                                    return (
                                        <Tag
                                            key={item.id}
                                            color={color[Math.floor(Math.random() * color.length)]}
                                        >{item.name}</Tag>
                                    )
                                })
                            }
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}

export default SiderCustom