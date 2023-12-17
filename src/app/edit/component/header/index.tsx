"use client";
import React from "react";
import { Button, Layout } from "antd";
import { useRouter } from "next/navigation";

const { Header } = Layout;
export default function HeaderEdit() {
    const router = useRouter();
    return (
        <Header
            style={{
                display: "flex",
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                zIndex: "9999",
                alignItems: "center",
                gap: "24px",
                justifyContent: "center",
            }}
        >
            <Button onClick={() => {}}>Xem trước</Button>
            <Button onClick={() => {}}>Lưu lại</Button>{" "}
            <Button onClick={() => {}}>Tải xuống</Button>
        </Header>
    );
}
