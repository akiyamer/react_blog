import loadable from '../utils/loadable'

const webLayout = loadable(() => import('../pages/web/layout'))
const adminLayout = loadable(() => import('../pages/admin/layout'))

const routes = [
    {
        path: '/admin',
        component: adminLayout
    },
    {
        path: '/web',
        component: webLayout
    }
]

export default routes