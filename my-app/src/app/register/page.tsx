"use client";
import { useState } from "react";
import { Button, Input, Typography, Form, notification } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";
import "@ant-design/v5-patch-for-react-19";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (values: { username: string; email: string; password: string }) => {
    try {
      const response = await axios.post("http://localhost:3001/users/register", values);
  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store the token
      }
  
      notification.success({
        message: "Registration Successful",
        description: "You can now log in with your credentials.",
      });
  
      router.push("/login");
    } catch (err) {
      notification.error({
        message: "Registration Failed",
        description: "There was an error during registration.",
      });
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side - Register Form */}
      <div className="w-96 md:w-1/2 p-12 flex flex-col justify-center min-h-[500px] bg-white rounded-l-xl shadow-lg">
        <Typography.Title level={2} className="text-[#FF9800] text-center">
          Create an Account
        </Typography.Title>
        <Form onFinish={handleSubmit} layout="vertical" className="space-y-6">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
            className="m-0"
          >
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="rounded-lg border-gray-300 p-2"
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter a valid email", type: "email" }]}
            className="m-0"
          >
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="rounded-lg border-gray-300 p-2"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
            className="m-0"
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="rounded-lg border-gray-300 p-2"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="bg-[#FF9800] text-white hover:bg-[#e68900] transition-colors duration-300"
          >
            Register
          </Button>
        </Form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Button type="link" className="text-[#FF9800]" onClick={() => router.push("/login")}>
            Sign In
          </Button>
        </p>
      </div>

      {/* Right Side - Welcome Section */}
      <div className="w-1/2 bg-[#FF9800] flex flex-col justify-center items-center text-white p-10 rounded-l-3xl">
        <Typography.Title level={2}>Welcome Back!</Typography.Title>
        <p className="text-center text-lg">Join us and start managing your notes effortlessly.</p>
        <Button
          ghost
          className="border-white text-white hover:bg-white hover:text-[#FF9800] mt-4"
          onClick={() => router.push("/login")}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
