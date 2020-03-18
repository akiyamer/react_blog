import React from 'react'
import {EditorState, convertToRaw, ContentState} from 'draft-js'
import {
    Form,
    Select,
    Input,
    Button,
    message
} from 'antd'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import api from '../../../api'
import './item.less'

const { Option } = Select

class EditArticle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            tag: [],
            category: [],
            form: {
                author: '',
                title: ''
            },
            editorState: EditorState.createEmpty()
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        this.setState({id})
        this.getTagList()
        this.getCategoryList()
        id && this.getDetail(id)
    }

    formRef = React.createRef()

    async getDetail(id) {
        const {code, data} = await api.get('/article/item', {id})
        if (code !== 1000) return false
        const { title, author, summary, category, tag, content } = data
        this.formRef.current.setFieldsValue({title, author, summary, category, tag})
        const contentBlock = htmlToDraft(content)
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
        const editorState = EditorState.createWithContent(contentState)
        this.setState({editorState})
    }

    async getTagList() {
        const {code, data} = await api.get('/tag/listAll')
        if (code === 1000) this.setState({tag: data})
    }

    async getCategoryList() {
        const {code, data} = await api.get('/category/listAll')
        if (code === 1000) this.setState({category: data})
    }

    handleCategoryChange(values) {
        const s = new Set([...this.state.category, values])
        this.setState({category: [...s]})
    }

    handleTagChange(values) {
        const s = new Set([...this.state.tag, ...values])
        this.setState({tag: [...s]})
    }

    handleEditorChange(editorState) {
        this.setState({
            editorState
        })
    }

    async onFinish(values) {
        const content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        let params = {
            ...values,
            category: String(values.category),
            tag: String(values.tag),
            content
        }
        if (this.state.id) {
            params.id = this.state.id
            const {code} = await api.post('/article/update', params)
            if (code === 1000) {
                message.success('修改成功')
                this.props.history.push('/admin/article')
            }
        } else {
            const {code} = await api.post('/article/create', params)
            if (code === 1000) {
                message.success('新建成功')
                this.props.history.push('/admin/article')
            }
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 2 },
                sm: { span: 2 },
                xxl: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
                md: { span: 12 }
            }
        }

        let tagOptions = this.state.tag.map(item => {
            return <Option value={item.name} key={item.name}>{item.name}</Option>
        })

        let categoryOptions = this.state.category.map(item => {
            return <Option value={item.name} key={item.name}>{item.name}</Option>
        })

        return (
            <div className="editor-wrapper"> 
                <Form {...formItemLayout} ref={this.formRef} onFinish={(values) => this.onFinish(values)}>
                    <Form.Item label="标题" name="title" required={true}>
                        <Input placeholder="请输入标题"/>
                    </Form.Item>
                    <Form.Item label="作者" required={true} name="author">
                        <Input placeholder="请输入作者"/>
                    </Form.Item>
                    <Form.Item label="摘要" name="summary" required={true}>
                        <Input placeholder="请输入摘要"/>   
                    </Form.Item>
                    <Form.Item label="分类" name="category">
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="请选择分类"
                            onChange={(e) => this.handleCategoryChange(e)}>
                            { categoryOptions }
                        </Select>
                    </Form.Item>
                    <Form.Item label="标签" name="tag">
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="请选择标签"
                            onChange={(values) => this.handleTagChange(values)}>
                            { tagOptions }
                        </Select>
                    </Form.Item>
                    <Form.Item label="内容" wrapperCol={{span: 19}}>
                        <Editor 
                            editorState={this.state.editorState}
                            editorClassName="editor"
                            onEditorStateChange={(editorState) => this.handleEditorChange(editorState)}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{span: 24}}>
                        <div className="article-button">
                            <Button type="primary" htmlType="submit">
                                {this.state.id ? 'update' : 'create'}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default EditArticle