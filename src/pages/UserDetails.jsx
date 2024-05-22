import React, { useEffect, useState } from "react";
import { Button, Form, Input, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetUserById, fetchData } from "../Redux/Slice/apiSlice";
import { useNavigate, useParams } from "react-router-dom";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

export const UserDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  // console.log("userid",id)

  //Params ile tıkladığım verileri aldım

  const dispatch = useDispatch();

  const { getById, isLoading } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(GetUserById(id));
  }, []);

  console.log("id", getById);

  return (
    <>
      {
        !isLoading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "100px",
            }}
          >
            <Form
              {...formItemLayout}
              variant="filled"
              style={{
                maxWidth: "1000px",
                width: "50%",
              }}
            >
              <Form.Item
                label="ID"
                name="ID"
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}
              >
                <Input defaultValue={getById.id} style={{ height: "40px" }} />
              </Form.Item>

              <Form.Item
                label="Name"
                name="Name"
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}
              >
                <Input defaultValue={getById.name} style={{ height: "40px" }} />
              </Form.Item>

              <Form.Item
                label="Surname"
                name="Surname"
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}
              >
                <Input
                  defaultValue={getById.surname}
                  style={{ height: "40px" }}
                />
              </Form.Item>

              <Form.Item
                label="Job"
                name="Job"
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}
              >
                <Input defaultValue={getById.job} style={{ height: "40px" }} />
              </Form.Item>

              <Form.Item
                label="Address"
                name="Address"
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}
              >
                <Input
                  defaultValue={getById.address}
                  style={{ height: "40px" }}
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}
              >
                <Input
                  defaultValue={getById.email}
                  style={{ height: "40px" }}
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 6,
                  span: 16,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => navigate("/")}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        ) : (
          <Spin className="d-flex justify-content-center" />
        ) //loading durumu için spin ile kontrol ettik.
      }
    </>
  );
};
