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
      await axios.post("https://notesapp-production-b8aa.up.railway.app/login", { email, password },{ withCredentials: true } );
      await login(); // Call login to update auth state
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl flex bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Left Side - Login Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center min-h-[500px]">
          <Typography.Title level={2} className="text-green-600 text-center">
            Sign in to Account
          </Typography.Title>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Email" rules={[{ required: true, type: "email" }]}>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
            </Form.Item>
            <Form.Item label="Password" rules={[{ required: true }]}>
              <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            </Form.Item>
            <div className="flex justify-between items-center mb-4">
              <Checkbox>Remember me</Checkbox>
              <a className="text-[#FF9800]">Forgot Password?</a>
            </div>
            <Button type="primary" htmlType="submit" block loading={loading} className="bg-[#FF9800] hover:bg-[#FF9800]">
              Sign In
            </Button>
          </Form>
        </div>

        {/* Right Side - Signup Section */}
        <div className="w-1/2 bg-[#FF9800] text-white flex flex-col justify-center items-center p-10 min-h-[500px]">
          <Typography.Title level={2} className="text-center">
            Hello, Friend!
          </Typography.Title>
          <p className="text-center">Fill up personal information and start your journey with us.</p>
          <Button ghost className="border-white mt-4"
            onClick={() => router.push("/register")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}
