import React from 'react'
import {
    Form,
    Input,
    Button,
    Tag,
    Popconfirm,
    message,
    Table
} from 'antd'
import {Link} from 'react-router-dom'
import api from '../../../api'
import {color} from '../../../utils'
import './index.less'

export default class AdminLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            title: '',
            data: [],
            pageNo: 1,
            pageSize: 10,
            columns: [
                {
                    title: '序号',
                    dataIndex: 'index',
                    key: 'index',
                    width: 70,
                    align: 'center'
                },
                {
                    title: '标题',
                    dataIndex: 'title',
                    key: 'title',
                    width: 80
                },
                {
                    title: '摘要',
                    dataIndex: 'summary',
                    key: 'summary',
                    width: 200
                },
                {
                    title: '分类',
                    dataIndex: 'category',
                    key: 'category',
                    wdith: 80,
                    render: category => (
                        category.map((v, index) => (
                        <Tag 
                            key={index} 
                            color={color[Math.floor(Math.random() * color.length)]}
                        >{v}</Tag>
                        ))
                    )
                },
                {
                    title: '访问次数',
                    dataIndex: 'readedCount',
                    key: 'readedCount',
                    width: 100
                },
                {
                    title: '创建时间',
                    dataIndex: 'createdAt',
                    key: 'createdAt',
                    width: 150
                }, 
                {
                    title: '更新时间',
                    dataIndex: 'updatedAt',
                    key: 'updatedAt',
                    width: 150
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 180,
                    render: record => (
                        <span>
                            <Button ghost type="primary" className="mr10" onClick={() => this.handleEdit(record.id)}>edit</Button>
                            <Popconfirm
                                placement="top"
                                title="are you sure?"
                                onConfirm={() => this.handleConfirm(record.id)}
                                okText="yes"
                                cancelText="no"
                            >
                                <Button ghost type="danger">delete</Button>
                            </Popconfirm>
                        </span>
                    )
                }
            ]
        }
    }
    
    componentDidMount() {
        this.getList()
    }

    async getList() {
        this.setState({loading: true})
        const params = {
            title: this.state.title,
            pageNo: this.state.pageNo,
            pageSize: this.state.pageSize
        }
        const {data} = await api.get('/article/list', params)
        data.forEach((item, index) => {
            item.index = this.state.pageSize * (this.state.pageNo - 1) + index + 1;
        })
        this.setState({
            data,
            loading: false
        })
    }

    handleEdit(id) {
        this.props.history.push(`/admin/article-edit/${id}`)
    }

    async handleConfirm(id) {
        const { code } = await api.post(`/article/destroy`, {id})
        if (code === 1000) {
            message.success('删除成功')
            this.getList()
        } else {
            message.error('删除失败')
        }
    }

    async handleCreate() {
        const { code } = await api.post('/article/create', {title: this.state.title})
        if (code === 1000) {
            message.success('创建成功')
            this.getList()
        } else {
            message.error('创建失败')
        }
    }

    async onFinish(values) {
        await this.setState({
            pageNo: 1,
            title: values.title
        })
        this.getList()
    }

    render() {
        return (
            <div>
                <Form layout="inline" onFinish={(values) => this.onFinish(values)}>
                    <Form.Item name="title">
                        <Input 
                            placeholder='请输入标题' 
                            allowClear={true}/>
                    </Form.Item>
                    <Form.Item>
                        <Button className="mr10" type="primary" htmlType="submit">
                            search
                        </Button>
                        <Link to='/admin/article-add'>
                            <Button type="primary">create</Button>
                        </Link>
                    </Form.Item>
                </Form>
                <Table 
                    bordered
                    className="table"
                    loading={this.state.loading}
                    columns={this.state.columns}
                    dataSource={this.state.data}
                    rowKey={record => record.id}
                />
            </div>
        )
    }
}