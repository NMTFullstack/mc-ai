"use client";

import { useEffect, useState } from "react";
import { useGetDataCv } from "./hooks/useGetDataCv";
import { Button, Steps } from "antd";
import Info_Edit from "./component/modal";
import { message, theme } from "antd";
import Info_Editor from "./component/info";

export default function Edit() {
    const steps = [
        {
            title: "Mô tả bản thân",
            content: <Info_Editor />,
        },
        {
            title: "Kỹ năng",
            content: "Second-content",
        },
        {
            title: "Kinh nghiệm",
            content: "Last-content",
        },
        {
            title: "Services",
            content: "Last-content",
        },
        {
            title: "Portfolio",
            content: "Last-content",
        },
        {
            title: "Người tham chiếu",
            content: "Last-content",
        },
        {
            title: "Liên hệ",
            content: "Last-content",
        },
    ];
    const description = "This is a description.";
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const contentStyle: React.CSSProperties = {
        lineHeight: "260px",
        textAlign: "center",
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };
    return (
        <div className="p-20">
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button
                        type="primary"
                        onClick={() => message.success("Processing complete!")}
                    >
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
}
