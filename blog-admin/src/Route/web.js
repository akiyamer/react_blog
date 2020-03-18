import loadable from '../utils/loadable'
import {
  HomeOutlined,
  EditOutlined,
  StarOutlined,
  TeamOutlined,
  MoreOutlined
} from '@ant-design/icons'

const List = loadable(()=>import('../pages/web/list/list'))
const ArticleDetail = loadable(()=>import('../pages/web/list/detail'))
const Archive = loadable(()=>import('../pages/web/archive'))
const About = loadable(()=>import('../pages/web/about'))
const Star = loadable(()=>import('../pages/web/star'))

const webRoutes = [
  {
    menu: true,
    icon: HomeOutlined,
    title: '首页',
    path: '/web/index',
    component: List
  },
  {
    menu: true,
    icon: EditOutlined,
    title: '归档',
    path: '/web/archive',
    component: Archive
  },
  {
    menu: true,
    icon: StarOutlined,
    title: '收藏',
    path: '/web/star',
    component: Star
  },
  {
    menu: true,
    icon: TeamOutlined,
    title: '关于',
    path: '/web/about',
    component: About
  },
  {
    icon: MoreOutlined,
    title: '文章详情',
    path: '/web/detail/:id',
    component: ArticleDetail
  }
]

export default webRoutes
