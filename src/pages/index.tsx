import React from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { theme, Space, Input, Button, Form, Select, Tag } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { type RouterOutputs, api } from "~/utils/api";
//import { Gender } from "@prisma/client";

import styles from "./index.module.css";
type Person = RouterOutputs['person']['getById'];


const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function Home() {
  const formRef = React.useRef<FormInstance>(null);
  const { data: sessionData } = useSession();
  // tRPC

  const hello = api.person.hello.useQuery({ text: "from tRPC" });
  const { mutate, error } = api.person.create.useMutation();
  const { data: personData } = api.person.getAll.useQuery();


  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const onFinish = (values: { name: string, email: string }) => {
    const { name, email } = values;
    mutate({ name, email });
  };
  const onReset = () => {
    formRef.current?.resetFields();
  };

  return (
    <>
      <Head>
        <title>T3 Stack Demo</title>
        <meta name="description" content="T3 Stack Antd Postgress Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>

          <Tag style={{
            marginBottom: 20,
          }}>{hello.data?.greeting}</Tag>
          {
            sessionData && (
              <Form
                {...layout}
                ref={formRef}
                name="control-ref"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
              >
                <Form.Item name="fName" label="First Name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>

                <Form.Item name="lName" label="Last Name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>

                <Form.Item name="aNumber" label="A Number" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>

                {/* <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
              <Select
                placeholder="Select a option and change input text above"
                onChange={onGenderChange}
                allowClear
              >
                <Option value="MALE">Male</Option>
                <Option value="FEMALE">Female</Option>
              </Select>
            </Form.Item> */}

                <Form.Item {...tailLayout}>
                  <Space wrap>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                      Reset
                    </Button>
                  </Space>
                </Form.Item>
              </Form>

            )
          }
          <Button onClick={sessionData ? () => void signOut() : () => void signIn()}>
            {sessionData ? "Sign out" : "Sign in"}
          </Button>
        </div>
      </main>
    </>
  );
}