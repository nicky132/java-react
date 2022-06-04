import { BrowserRouter as Router, Switch , useHistory, useLocation, Route  } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import Routes from './router/index';
import 'antd/dist/antd.min.css'
import logo from "@/assets/images/logo.svg";
import { Layout, Menu, Dropdown ,message } from 'antd';
import "./App.css";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
import axios from 'axios';
import login from '@/views/login';
const { Header, Footer, Sider, Content } = Layout;

function App () {
  const [username, setUsername] = useState('')
  const history = useHistory();
  const location = useLocation();
  let token = localStorage.getItem('__config_center_token');

  function getUserInfo(){
    axios({
        url:'http://47.114.150.30:3001/api/admin/info',
        method:'get',
        headers:{
            'Content-Type': 'application/json; charset=UTF-8', //将表单数据传递转化为form-data类型
            'Authorization':token
        }
    }).then(res=>{
        let data = res.data;
        if(data.code === 200){
          setUsername(data.obj.name);
        }else{
            message.error(data.message);
        }
    }).catch((error)=>{
        message.error('网络异常!');
    })
  }

  const loginOut = ()=>{
      axios({
          url:'http://47.114.150.30:3001/api/logout',
          method:'post',
          headers:{
              'Content-Type': 'application/json; charset=UTF-8', //将表单数据传递转化为form-data类型
              'Authorization':token
          }
      }).then(res=>{
          let data = res.data;
          if(data.code === 200){
            message.success(data.message,1,()=>{
                history.push("/login");
            });
          }else{
              message.error(data.message);
          }
      }).catch((error)=>{
          message.error('网络异常!');
      })
  }

  const menu = (
    <Menu>
      <Menu.Item key="1">
      <Icon type="setting" />&nbsp;偏好设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={()=>loginOut()}>
      <Icon type="poweroff" />&nbsp;退出登录
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
      getUserInfo();
      return () => {
      }
  })

  return (
    <Layout className="app" style={{ minHeight: document.documentElement.clientHeight }}>
      {
        location.pathname === '/login'?
        <Route exact path={ location.pathname } component={ login }/>
        :
        <React.Fragment>
          <Header className="header">
            <img className="logo" src={logo} />
            <Dropdown overlay={menu} placement="bottomRight">
              <span className='header-dropdown-link' style={{cursor:'pointer'}}>
                <Icon type="user" /> { username } <Icon type="down" />
              </span>
            </Dropdown>
          </Header>
          <Content style={{display:'contents'}}>
            <Layout>
              <Sider
                  breakpoint="lg"
                  collapsedWidth="0"
                  onBreakpoint={broken => {
                    // console.log(broken);
                  }}
                  onCollapse={(collapsed, type) => {
                    // console.log(collapsed, type);
                  }}
                  className="sider"
                >
                <div className="logo" />
                <Menu
                  theme="dark"
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
                    (icon, index) => ({
                      key: String(index + 1),
                      icon: React.createElement(icon),
                      label: `nav ${index + 1}`,
                    }),
                  )}
                />
              </Sider>
              <Layout>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 ,marginTop:64,height:'100%'}}>
                  <Switch>
                    <Routes></Routes>
                  </Switch>
                </div>
                {/* <Footer style={{ textAlign: 'center' }}>HENRRY ©2022</Footer> */}
              </Layout>
            </Layout>
          </Content>
        </React.Fragment>
      }
    </Layout>
  );
}
export default App;
