import React from 'react';
import {
    List,
    Tag
} from 'antd'
import api from '../../../api'
import {
    TagsOutlined,
    FolderOutlined,
    CalendarOutlined,
    EyeOutlined
} from '@ant-design/icons'
import {color} from '../../../utils'
import './list.less'

class BlogList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            pageNo: 1,
            pageSize: 5,
            articleList: []
        }
    }

    componentDidMount() {
        this.getList()
    }

    async getList() {
        this.setState({loading: true})
        const params = {
            pageNo: this.state.pageNo,
            pageSize: this.state.pageSize
        }
        const {code, data} = await api.get('/article/list', params)
        code === 1000 && this.setState({articleList: data})
    }

    render() {
        const pagination = {
            current: this.state.pageNo,
            pageSize: this.state.pageSize,
            size: 'small',
            onChange: (async page => {
                await this.setState({pageNo: page})
                this.getList()
            })
        }

        return (
            <div className="list-wrapper">
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={this.state.articleList.length ? pagination : null}
                    dataSource={this.state.articleList}
                    renderItem={
                        (item, index) => (
                            <List.Item
                                key={index}
                                actions={
                                    [
                                        <span>
                                            <TagsOutlined style={{marginRight: 8}} />
                                            {
                                                item.tag.map((v, index) => {
                                                    return (
                                                        <Tag
                                                            key={index}
                                                            color={color[Math.floor(Math.random() * color.length)]}
                                                        >{v}</Tag>
                                                    )
                                                })
                                            }
                                        </span>,
                                        item.category ? 
                                        <span>
                                            <FolderOutlined style={{marginRight: 8}} />
                                            {
                                                item.tag.map((v, index) => {
                                                    return (
                                                        <Tag
                                                            key={index}
                                                            color={color[Math.floor(Math.random() * color.length)]}
                                                        >{v}</Tag>
                                                    )
                                                })
                                            }
                                        </span> : null,
                                        <span>
                                            <CalendarOutlined style={{marginRight: 8}}/>
                                            {item.createdAt}
                                        </span>,
                                        <span>
                                            <EyeOutlined style={{marginRight: 8}}/>
                                            {item.readedCount}
                                        </span>
                                    ]
                                }
                            >
                                <List.Item.Meta 
                                    title={item.title}
                                    description={item.summary}
                                    onClick={() => this.props.history.push(`/web/detail/${item.id}`)}
                                />
                            </List.Item>
                        )
                    }
                />
            </div>
        )
    }
}

export default BlogList