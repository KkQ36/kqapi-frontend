
import React, {useState} from "react";
import {PageContainer} from "@ant-design/pro-components";
import {getTokenListByUserId} from "@/services/yuapi-backend/interfaceInfoController";
import {Button, Card, Divider, Form, Input, message} from "antd";
import {useParams} from "@@/exports";
import { CopyToClipboard } from 'react-copy-to-clipboard';


const TokenGet: React.FC = () => {
  const params = useParams();
  const [invokeLoading] = useState(false);
  const [invokeRes, setInvokeRes] = useState<any>();
  const onFinish = async (values: any) => {
    try {
      const res = await getTokenListByUserId({
        id: params.id,
        ...values,
      });
      setInvokeRes(res.data.token)
      message.success('请求成功');
    } catch (error: any) {
      message.error('操作失败，' + error.message);
    }
  };
// ...

  return (
    <PageContainer title="获取密钥">
      <Divider />
      <Card>
        <Form name="invoke" layout="vertical" onFinish={onFinish}>
          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type="primary" htmlType="submit">
              获取密钥
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title="返回结果" loading={invokeLoading}>
        {invokeRes}
        <br/><br/>
        {invokeRes && (
          <CopyToClipboard text={invokeRes} onCopy={() => message.success('内容已复制')}>
            <Button style={{ marginLeft: 8 }}>复制</Button>
          </CopyToClipboard>
        )}
      </Card>
      <Divider />
    </PageContainer>
  );

};
export default TokenGet;


