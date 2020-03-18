import loadable from '../utils/loadable'
import {
    HomeOutlined,
    EditOutlined,
    TagsOutlined,
    FolderOutlined,
    StarOutlined,
} from '@ant-design/icons'

const Tags = loadable(() => import('../pages/admin/tags'))
const Star = loadable(() => import('../pages/admin/star'))
const Home = loadable(() => import('../pages/admin/home'))
const Category = loadable(() => import('../pages/admin/category'))
const Article = loadable(() => import('../pages/admin/article'))
const ArticleItem = loadable(() => import('../pages/admin/article/item'))

const routes = [
    {
        menu: true,
        icon: HomeOutlined,
        title: '首页',
        path: '/admin/page',
        component: Home
    },
    {
        menu: true,
        icon: EditOutlined,
        title: '文章',
        path: '/admin/article',
        component: Article
    },
    {
        menu: true,
        icon: TagsOutlined,
        title: '标签',
        path: '/admin/tags',
        component: Tags
    },
    {
        menu: true,
        icon: FolderOutlined,
        title: '分类',
        path: '/admin/category',
        component: Category
    },
    {
        menu: true,
        icon: StarOutlined,
        title: '收藏',
        path: '/admin/star',
        component: Star
    },
    {
        icon: EditOutlined,
        title: '新增文章',
        path: '/admin/article-add',
        component: ArticleItem
    },
    {
        icon: EditOutlined,
        title: '文章详情',
        path: '/admin/article-edit/:id',
        component: ArticleItem
    }
]
  
export default routes