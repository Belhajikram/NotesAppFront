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
      await axios.post("https://notesapp-production-b8aa.up.railway.app/users/register", values, { withCredentials: true });

      notification.success({
        message: "Registration Successful",
        description: "You can now log in with your credentials.",
      });

      router.push("/login");
    } catch (err) {
      console.error("Registration error:", err);
      notification.error({
        message: "Registration Failed",
        description: "There was an error during registration.",
      });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Left Side - Register Form */}
        <div className="w-full max-w-sm md:max-w-none md:w-1/2 p-6 md:p-12 flex flex-col justify-center min-h-[500px] mx-auto">
          <Typography.Title level={2} className="text-[#FF9800] text-center">
            Create an Account
          </Typography.Title>
          <Form onFinish={handleSubmit} layout="vertical" className="space-y-4">
            <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please enter your username" }]}>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter a valid email", type: "email" }]}>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
              <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block className="bg-[#FF9800] text-white hover:bg-[#e68900]">
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
  
        {/* Right Side - Welcome Section (Hidden on Mobile) */}
        <div className="hidden md:flex w-1/2 bg-[#FF9800] text-white flex-col justify-center items-center p-6 md:p-10 min-h-[500px]">
          <Typography.Title level={2} className="text-center">
            Welcome Back!
          </Typography.Title>
          <p className="text-center">Join us and start managing your notes effortlessly.</p>
          <Button ghost className="border-white mt-4" onClick={() => router.push("/login")}>
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );  
}
