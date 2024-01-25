import React, { useEffect, useState } from 'react';
import {Button, Space, Table} from 'antd';
import { BaseResponseUserVO, UserVO } from '@/services';
import {getUserUsingGET, userLogoutUsingPOST} from "@/services/yuapi-backend/userController";
import {Link} from "umi";

const YourComponent: React.FC = () => {
  const [user, setUser] = useState<UserVO | null>(null);

  useEffect(() => {
    // 调用接口获取用户信息
    getUserUsingGET()
      .then((response: BaseResponseUserVO) => {
        setUser(response.data || null);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const columns = [
    {
      title: null,
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: null,
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const data = user
    ? [
      { key: 'id', value: user.id },
      { key: '用户名', value: user.userName },
      { key: '账号', value: user.userAccount },
      { key: '身份', value: user.gender === 'admin' ? '管理员' : '用户' },
      { key: '个人介绍', value: user.userProfile },
    ]
    : [];

  return (

    <Space direction="vertical" align="center" style={{ marginTop: 20 }}>

      {user && (
        <img
          src={user.userAvatar===null ? 'https://thirdwx.qlogo.cn/mmopen/vi_32/ibO6F2GNoPIxP9ibg7CQNymDUYZegTLFILic1KM6NmUYMXHKKNZBnFd7dpPrLnvxZTVUibicqBov4vib7e0mfGah0SGw/132': user.userAvatar}
          alt="User Avatar"
          style={{ width: 70, borderRadius: '50%' }}
        />
      )}

      {user ? (
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          style={{ width: 600 }}
        />
      ) : (
        <p>加载中</p>
      )}
        <br/>
        <Button  type="primary" >
            <Link to={'/user/update'}>修改用户信息</Link>
        </Button>
    <Button type={"danger"}>
        <a href={'/user/login'} onClick={userLogoutUsingPOST}>退出登录</a>
    </Button>
    </Space>
  );
};

export default YourComponent;
