import {Alert, Button, Card, Form, Input, Space} from "antd";
import {useNavigate} from "react-router-dom";
import AuthManager from "../helpers/auth-manager.js";
import {useState} from "react";

export default function LoginForm() {
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("Something went wrong, try again later.")

    const onFinish = async ({email, password}) => {
        try {
            await AuthManager.login(email, password)
            navigate("/dashboard")
        } catch (e) {
            if (e.response.status === 401) {
                setErrorMessage("Your email or login is wrong.")
            }
            setShowError(true);
        }
    };

    return (
        <Card title="Login" className={"drop-shadow-lg m-auto w-2/3"}>
            { showError &&
                <Space
                    direction="vertical"
                    className={"w-full mb-5"}
                >
                    <Alert message={errorMessage} type="error" showIcon/>
                </Space>
            }
            <Form
                name="basic"
                className={"w-full"}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
