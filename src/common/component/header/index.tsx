"use client";
import React from "react";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";

const { Header, Content, Footer } = Layout;
export default function HeaderRoot() {
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
            <Button>Xem trước</Button>
            <Button>Lưu lại </Button>
            <Button>Tải xuống</Button>
        </Header>
    );
}
