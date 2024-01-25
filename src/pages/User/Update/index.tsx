import {Button, message, Typography} from 'antd';
import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import styles from './index.less';
import { ProFormText } from '@ant-design/pro-form';
import { getUserUsingGET, updateUserUsingPOST } from "@/services/yuapi-backend/userController";
import {ProForm, ProFormTextArea} from "@ant-design/pro-components";
import {history} from 'umi';

const EditProfile: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const [userData, setUserData] = useState<any>({});
  const [form] = ProForm.useForm();  // 声明 form

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserUsingGET();
        const userData = response.data;

        // 将获取到的用户数据设置到表单中
        form.setFieldsValue(userData);
      } catch (error) {
        console.error('获取用户数据时出错：', error);
        message.error('获取用户信息失败');
      }
    };

    fetchUserData();
  }, [form]);  // 将 form 添加为依赖

  // 表单提交处理函数
  const handleSubmit = async (values: any) => {
    try {
      const response = await updateUserUsingPOST({
        id: userData.id,
        ...values,
      });

      if (response.data) {
        message.success('用户信息修改成功');
        // 提交成功后的操作
      } else {
        message.error('用户信息修改失败');
      }
    } catch (error) {
      console.error('更新用户时出错：', error);
      message.error('操作失败');
    }
  };

  return (
      <div className={styles.container}>

        <div className={styles.content}>
          <Button type="primary" style={{ marginBottom: 16 , float: "left"}} onClick={() => history.push('/user/center')}>
            返回
          </Button>
          <br/><br/>
          <Typography.Title level={2} style={{ marginBottom: 24}}>信息修改</Typography.Title>

          <ProForm
              form={form}  // 将 form 传递给 ProForm
              submitter={{
                searchConfig: {
                  submitText: '提交',
                },
              }}
              initialValues={userData}
              onFinish={async (values) => {
                await handleSubmit(values);
              }}
          >

            {/* 这里添加您的表单字段 */}
            <ProFormText
                name="userName"
                label="用户名"
                placeholder="请输入用户名"
                rules={[{ required: true, message: '请输入用户名' }]}
            />
            <ProFormText
                name="userAccount"
                label="用户账号"
                placeholder="请输入用户账号"
                rules={[{ required: true, message: '请输入用户账号' }]}
            />
            <ProFormTextArea
                name="userProfile"
                label="个人简介"
                placeholder="个人简介"
            />

          </ProForm>

        </div>
        <Footer />
      </div>
  );
};

export default EditProfile;
