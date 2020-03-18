import React from 'react';
import {Card} from 'antd'
import {
    CalendarOutlined,
    EyeOutlined
} from '@ant-design/icons'
import {EditorState, ContentState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import api from '../../../api'
import './detail.less'


class ArticleDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            data: {title: ''},
            editorState: EditorState.createEmpty()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.match.params.id) {
            this.getDetail(nextProps.match.params.id)
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        this.getDetail(id)
    }

    async getDetail(id) {
        const {data} = await api.get('/article/detail', {id})
        this.setState({data})
        const {content} = data
        const contentBlock = htmlToDraft(content)
        const contentState = ContentState.createFromBlockArray(contentBlock)
        const editorState = EditorState.createWithContent(contentState)
        this.setState({editorState})
    }

    render() {
        return (
            <Card
                title={this.state.data.title}
                extra={
                    <div className="content-extra">
                        <CalendarOutlined style={{marginRight: 8, marginLeft: 8}}/>
                        {this.state.data.createdAt}
                        <EyeOutlined style={{marginRight: 8, marginLeft: 8}}/>
                        {this.state.data.readedCount}
                    </div>
                }
            >
                <Editor 
                    readOnly
                    toolbarHidden
                    editorState={this.state.editorState}
                    editorClassName="editor"
                />
            </Card>
        )
    }
}

export default ArticleDetail