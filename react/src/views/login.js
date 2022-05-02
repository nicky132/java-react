import { Form, Input, Button, Checkbox, message } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
function FormPage(props) {
    const history = useHistory();
    const onFinish = (values: any) => {
        axios({
            url:'http://47.114.150.30:3001/api/login',
            data:{
                username: values.username,
                password: values.password,
            },
            method:'post',
            headers:{
                'Content-Type': 'application/json; charset=UTF-8', //将表单数据传递转化为form-data类型
            }
        }).then(res=>{
            let data = res.data;
            if(data.code === 200){
                message.success(data.message);
                history.push("/record");
                window.location.reload();
            }else{
                message.error(data.message);
            }
        }).catch((error)=>{
            console.log("error",error);
        })
    };
    
    const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    };
    useEffect(() => {
        window.addEventListener('resize',()=>{
            console.log(document.fullscreenElement,document.webkitFullscreenElement)
        })
        return () => {
        }
    }, [])
    return (
        <div className="formDiv" >
            <Form
            className="form"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
                <Form.Item
                label="姓名"
                name="username"
                rules={[{ required: true, message: '请输入姓名!' }]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
                >
                <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>记住我</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
  
  export default FormPage;