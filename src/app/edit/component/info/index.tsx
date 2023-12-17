"use client";

import Info_Template from "@/common/component/info";
import { Col, Row } from "antd";
import { useState } from "react";

export default function Info_Editor() {
    const [info, setInfo] = useState({
        info_name: "",
        info_description: "",
        info_p: "",
        info_sub_date: "",
        info_sub_name: "",
        info_sub_degree: "",
        info_sub_experience: "",
        info_sub_phone: "",
        info_sub_email: "",
        info_sub_address: "",
        info_sub_free: "",
    });
    return (
        <>
            <Row>
                <Col xs={24} sm={24} md={12} xl={12}></Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                    <Info_Template info={info} />
                </Col>
            </Row>
        </>
    );
}
