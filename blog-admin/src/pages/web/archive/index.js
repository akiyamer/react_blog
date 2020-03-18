import React from 'react';
import api from '../../../api'
import {Timeline, Card} from 'antd'
import {Link} from 'react-router-dom'
import {ClockCircleOutlined} from '@ant-design/icons'

class Archive extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.getList()
    }

    async getList() {
        const {data, code} = await api.get('/article/list/all')
        code === 1000 && this.setState({data})
    }

    render() {
        return (
            <Card 
                style={{padding: 20}}
                bordered={false}>
                <Timeline>
                    <Timeline.Item
                        dot={<ClockCircleOutlined style={{fontSize: 16}}/>}
                        color="red"
                    >
                        <span style={{fontSize: '20px'}}>2019</span>
                    </Timeline.Item>
                    {
                        this.state.data.map((v, i) => {
                            return (
                                <Timeline.Item key={i}>
                                    <Link to={`/web/detail/${v.id}`}>
                                        <span className="mr10">{v.createdAt.slice(0, 10)}</span>
                                        <span>{v.title}</span>
                                    </Link>
                                </Timeline.Item>
                            )
                        })
                    }
                </Timeline>
            </Card>
        )
    }
}

export default Archive