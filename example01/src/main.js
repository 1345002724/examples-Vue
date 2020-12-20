import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import {Button,Form,FormItem,Input,Message,
  Container,Header,Aside,Main,Footer,Menu,
  Submenu,MenuItemGroup,MenuItem,Breadcrumb,
  BreadcrumbItem,Card,Row,Col,Table,TableColumn,Switch,Tooltip,Pagination,Dialog,
Select,Option,Dropdown,DropdownMenu,DropdownItem,Tabs,TabPane,Popconfirm} from "element-ui";

import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

//引入自定义的全局常量和公共方法js文件
import config from './CommonUtils/global.js'

//验证请求数据保证一致性
axios.interceptors.request.use(config=>{
  //console.log(config)
  config.headers.Authorization=window.sessionStorage.getItem("token")
  return config
})

//配置axios请求头中的content-type为指定类型
axios.defaults.headers.post['Content-Type'] = 'application/json';

//配置请求根路径(这里跨域让后端来做)
axios.defaults.baseURL='http://127.0.0.1:8075/jsg'

//Vue函数添加一个原型属性$http 指向Axios(使用方法为this.$http)
Vue.prototype.$http=axios
Vue.prototype.$message=Message



Vue.use(config);
//全局注册
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Popconfirm)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


