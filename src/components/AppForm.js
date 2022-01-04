import React, { useState } from "react"
import { Form, Input, Button, message } from "antd"
import { verifyUser } from "../Apis"
import { useNavigate } from "react-router-dom"

function AppForm() {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const validateMessages = {
    required: "${label} is required!",
  }

  const onFinish = async (values) => {
    const { data } = await verifyUser()

    const found = data.filter((i) => i.last_name === values.l_name)

    if (found) {
      message.success("Done")
      navigate("/clock")
    }
  }

  return (
    <section className="form-container">
      <article className="form">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <h1 align="center">Let's Get Started!</h1>
          <Form.Item
            label="First Name"
            name="f_name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="l_name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Job Title"
            name="job_title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </article>
    </section>
  )
}

export default AppForm
