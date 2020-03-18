import React from 'react'

export default function loginCheck(Component) {
    // 这样写是一个性能优化
    // 如果直接返回定义的loginCheck，相当于每次在
    // loginCheck函数内部都会新建一个对象
    if (Component.loginCheck) {
        return Component.loginCheck
    }

    class loginCheck extends Component {
        constructor(props) {
            super(props)
            this.state = {
                login: false
            }
        }

        componentWillMount() {
            this.checkAuth();
        }

        // 暂时不清楚为什么要加这个
        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }

        checkAuth() {
            const blogUser = sessionStorage.getItem('blogUser');

            if (blogUser) {
                console.log(`Get blogUser: ${blogUser}`)
            }

            const pathOutLogin = this.props.location.pathname !== '/login';

            if (!blogUser && pathOutLogin) {
                this.props.history.push('/login');
                return
            }
            this.setState({login: true})
        }

        render() {
            if (this.state.login) {
                return <Component {...this.props}/>
            }
            return null
        }
    }
    Component.loginCheck = loginCheck;
    return Component.loginCheck
}