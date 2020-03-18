import React from 'react'
import {
    Tag,
    Form,
    Button,
    Table,
    Input,
    Popconfirm,
    message
} from 'antd'
import api from '../../../api'
import {color} from '../../../utils/index'

class TagPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            loading: false,
            tagName: '',
            data: [],
            pageNo: 1,
            pageSize: 10,
            total: null,
            columns: [
                {
                    title: '序号',
                    dataIndex: 'index',
                    key: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '标签',
                    dataIndex: 'name',
                    render: name => (
                        <Tag color={color[Math.floor(Math.random() * color.length)]}>{name}</Tag>
                    )
                },
                {
                    title: '创建时间',
                    dataIndex: 'createdAt',
                    key: 'createdAt'
                },
                {
                    title: '操作',
                    dataIndex: 'id',
                    width: 120,
                    align: 'center',
                    render: id => (
                        <Popconfirm
                            title="are sure delete?"
                            placement="top"
                            onConfirm={_ => this.handleDelete(id)}
                        >
                            <Button ghost type="danger">Delete</Button>
                        </Popconfirm>
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
            name: this.state.tagName,
            pageNo: this.state.pageNo,
            pageSize: this.state.pageSize
        }
        const {data, total} = await api.get('/tag/list', params)
        data.forEach((item, index) => {
            item.index = this.state.pageSize * (this.state.pageNo-1) + index + 1;
        })
        this.setState({
            data,
            total,
            loading: false
        })
    }

    async handleDelete(id) {
        const {code} = await api.post('/tag/destroy', {id})
        if (code === 1000) {
            message.success('删除成功')
            this.getList()
        } else {
            message.error('删除失败')
        }
    }

    handleTagChange(e) {
        this.setState({
            tagName: e.target.value
        })
    }

    async handleConfirm() {
        const {code} = await api.post('/tag/create', {name: this.state.tagName})
        if (code === 1000) {
            message.success('新建成功')
            this.getList()
        } else {
            message.error('新建失败')
        }
    }

    async handlePageChange(page) {
        await this.setState({
            pageNo: page.current,
            pageSize: page.pageSize
        })
        this.getList()
    }

    render() {
        return (
            <div className="wrapper">
                <Form layout="inline">
                    <Form.Item name="tag">
                        <Input 
                            placeholder="请输出标签"
                            onChange={e => this.handleTagChange(e)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" className="mr10">Search</Button>
                        <Popconfirm
                            placement="top"
                            onConfirm={_ => this.handleConfirm()}
                            title="are you sure?"
                            okText="yes"
                            cancelText="no"
                        >
                            <Button type="primary">Create</Button>
                        </Popconfirm>
                    </Form.Item>
                </Form>
                <Table 
                    bordered
                    style={{marginTop: "10px"}}
                    pagination={{
                        current: this.state.pageNo,
                        showSizeChanger: true,
                        total: this.state.total,
                        pageSize: this.state.pageSize,
                        pageSizeOptions: ['10', '20', '30', '40'],
                        showTotal(total) {return `Total ${total}`}
                    }}
                    loading={this.state.loading}
                    columns={this.state.columns}
                    dataSource={this.state.data}
                    rowKey={record => record.id}
                    onChange={(page) => this.handlePageChange(page)}
                />
            </div>
        )
    }
}

export default TagPage