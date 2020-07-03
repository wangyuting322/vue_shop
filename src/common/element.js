import Vue from 'vue'
import {
  Form,
  FormItem,
  Input,
  Button,
  Select,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  MenuItemGroup,
  MenuItem,
  Submenu,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Table,
  TableColumn,
  Row,
  Col,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox
} from 'element-ui'
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.use(Button)
Vue.use(Select)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)

Vue.use(Menu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Submenu)

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

Vue.use(Card)

Vue.use(Table)
Vue.use(TableColumn)

Vue.use(Row)
Vue.use(Col)

Vue.use(Switch)

Vue.use(Tooltip)

Vue.use(Pagination)

Vue.use(Dialog)
