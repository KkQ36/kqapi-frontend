// YourKeyInputForm.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { history, request } from 'umi';
import styles from './index.less';
import {useModel} from "@@/exports";

const YourKeyInputForm: React.FC = () => {
    const [keyValues, setKeyValues] = useState<string[]>(new Array(6).fill(''));
    const inputRefs = useRef<Array<Input | null>>(new Array(6).fill(null));
    const { setInitialState } = useModel('@@initialState');
    useEffect(() => {
        // 在组件挂载后聚焦到第一个输入框
        inputRefs.current[0]?.focus();
    }, []);

    const handleInputChange = (index: number, value: string) => {
        const newKeyValues = [...keyValues];
        newKeyValues[index] = value;

        // 当用户输入一个字符后，自动聚焦到下一个输入框
        if (value && index < keyValues.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // 当用户删除一个字符后，自动聚焦到前一个输入框
        if (!value && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        setKeyValues(newKeyValues);
    };

    const handleVerifyKey = async () => {
        try {
            const key = keyValues.join('');
            const res = await request<API.BaseResponseUser>(`api/user/verifyToken?wxToken=${key}&`);

            if (res.code === 0 && res.data) {
                message.success('密钥验证通过！');

                const urlParams = new URL(window.location.href).searchParams;
                history.push(urlParams.get('redirect') || '/');
                setInitialState({
                    loginUser: res.data,
                });
                return;
            } else {
                message.error('密钥验证失败，请重试！');
            }
        } catch (error) {
            const defaultVerificationFailureMessage = '密钥验证失败，请重试！';
            console.error(error);
            message.error(defaultVerificationFailureMessage);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>微信密钥验证</div>
            <div className={styles.keyInputContainer}>
                {keyValues.map((value, index) => (
                    <Input
                        key={index}
                        className={styles.keyInput}
                        value={value}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        maxLength={1}
                        ref={(input) => (inputRefs.current[index] = input)}
                    />
                ))}
                <Button type="primary" onClick={handleVerifyKey} icon={<LockOutlined />} className={styles.submitButton}>
                    验证密钥
                </Button>
            </div>
        </div>
    );
};

export default YourKeyInputForm;
