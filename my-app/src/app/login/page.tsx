"use client";
import { useState } from "react";
import { Typography, Form, Input, Button, Checkbox } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";
import "@ant-design/v5-patch-for-react-19";
import { useAuth } from "../context/authContext";


export default function SignIn() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post("https://notesapp-production-b8aa.up.railway.app/auth/login", { email, password },{ withCredentials: true } );
      await login(); // Call login to update auth state
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 p-6 md:p-12 bg-white rounded-xl shadow-lg max-w-md md:max-w-none">
        <Typography.Title level={2} className="text-center text-gray-800">
          Sign in to Account
        </Typography.Title>
        <Form onFinish={handleSubmit} layout="vertical" className="space-y-4">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter a valid email", type: "email" }]}
          >
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="rounded-lg border-gray-300 p-2 w-full"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="rounded-lg border-gray-300 p-2 w-full"
            />
          </Form.Item>
          <div className="flex items-center justify-between text-sm">
            <Checkbox>Remember me</Checkbox>
            <Button type="link" className="text-[#FF9800]">
              Forgot Password?
            </Button>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="bg-[#FF9800] text-white hover:bg-[#e68900] transition-colors duration-300 mt-4"
          >
            Sign In
          </Button>
        </Form>
      </div>
  
      {/* Right Side - Welcome Section (Hidden on Mobile) */}
      <div className="w-full md:w-1/2 bg-[#FF9800] flex flex-col justify-center items-center text-white p-8 md:p-10 rounded-xl mt-6 md:mt-0">
        <Typography.Title level={3} className="text-center">
          Hello, Friend!
        </Typography.Title>
        <p className="text-center text-base">
          Fill up personal information and start your journey with us.
        </p>
        <Button
          ghost
          className="border-white text-white hover:bg-white hover:text-[#FF9800] mt-4"
          onClick={() => router.push("/register")}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
  
}
