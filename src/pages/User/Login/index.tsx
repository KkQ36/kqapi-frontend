// WeChatLogin.tsx
import React, { useState } from 'react';
import { Button, message } from 'antd';
import { userLoginUsingWeChat } from '@/services/yuapi-backend/userController';
import styles from './index.less';

const WeChatLogin: React.FC = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null | undefined>(undefined);
    const [loginVisible, setLoginVisible] = useState(true);

    const fetchQRCode = async () => {
        try {
            const res = await userLoginUsingWeChat();
            console.log('Response:', res);
            setQrCodeUrl(res.data);
            // 隐藏登录表单和按钮
            setLoginVisible(false);
        } catch (error) {
            console.error('Error fetching QR code:', error);
            message.error('操作失败');
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            {loginVisible && (
                <div>
                    <Button type="link" onClick={fetchQRCode}>
                        获取登录二维码
                    </Button>
                    <br/>
                </div>
            )}
            {!loginVisible ? (
                <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    style={{ maxWidth: '100%', maxHeight: '30vh', margin: '0 auto' }}
                />
            ) : null}
        </div>
    );
};

// Login.tsx
import { Tabs } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { history, useModel, request } from 'umi';
import Footer from '@/components/Footer';

const Login: React.FC = () => {
    const [type, setType] = useState<string>('account');
    const { setInitialState } = useModel('@@initialState');

    const handleWeChatLogin = async () => {
        // 导航到指定页面，例如 /user/login/wechat
        history.push('/user/login/wechat');
    };

    const handleSubmit = async (values: API.UserLoginRequest) => {
        try {
            if (type === 'wechat') {
                // 如果是微信登录，执行导航逻辑
                handleWeChatLogin();
                return;
            }

            // 如果是其他登录类型，执行正常登录逻辑
            const res = await request<API.BaseResponseUser>('/api/user/login', {
                method: 'POST',
                data: {
                    ...values,
                },
            });

            if (res.code === 0 && res.data) {
                const urlParams = new URL(window.location.href).searchParams;
                history.push(urlParams.get('redirect') || '/');
                setInitialState({
                    loginUser: res.data,
                });
                return;
            }
        } catch (error) {
            const defaultLoginFailureMessage = '登录失败，请重试！';
            console.log(error);
            message.error(defaultLoginFailureMessage);
        }
    };

    return (
        <div className={styles.container}>
            <title>KQ 接口</title>
            <div className={styles.content}>
                <LoginForm
                    logo={<img alt="logo" src="/logo.svg" />}
                    title="KQ接口"
                    subTitle={'API 开放平台'}
                    initialValues={{
                        autoLogin: true,
                    }}
                    onFinish={async (values) => {
                        await handleSubmit(values as API.UserLoginRequest);
                    }}
                >
                    <Tabs
                        activeKey={type}
                        onChange={setType}
                        centered
                        items={[
                            {
                                key: 'account',
                                label: '用户登录',
                            },
                            {
                                key: 'wechat',
                                label: '微信登录',
                            },
                        ]}
                    />

                    {type === 'account' && (
                        <>
                            <ProFormText
                                name="userAccount"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined className={styles.prefixIcon} />,
                                }}
                                placeholder={'用户名'}
                                rules={[
                                    {
                                        required: true,
                                        message: '用户名是必填项！',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="userPassword"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={styles.prefixIcon} />,
                                }}
                                placeholder={'密码'}
                                rules={[
                                    {
                                        required: true,
                                        message: '密码是必填项！',
                                    },
                                ]}
                            />
                        </>
                    )}

                    {type === 'wechat' && <WeChatLogin />}

                    {type !== 'wechat' && (
                        // 在 type 不为 'wechat' 时渲染自动登录复选框
                        <div style={{ marginBottom: 24 }}>
                            <ProFormCheckbox noStyle name="autoLogin">
                                自动登录
                            </ProFormCheckbox>
                        </div>
                    )}
                </LoginForm>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
