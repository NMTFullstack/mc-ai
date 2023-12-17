"use client";

import { useEffect, useState } from "react";
import { useGetDataCv } from "./hooks/useGetDataCv";
import { Button, Form, Input, Upload, message } from "antd";
import Info_Edit from "./component/modal";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import $ from "jquery";
export default function Edit() {
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

    const [state_p, setState_p] = useState(true);
    const [info_p, setInfo_p] = useState("");
    const handleInfoP = (e: any) => {
        setInfo_p(e.target.value);
        setState_p(false);
    };
    const [state_sub_name, setState_sub_name] = useState(true);
    const [info_sub_name, setInfo_sub_name] = useState("");
    const handleInfoSub_name = (e: any) => {
        setInfo_sub_name(e.target.value);
        setState_sub_name(false);
    };
    const handleFinish = (values: any) => {
        console.log("Success:", values);
    };
    useEffect(() => {
        $(".counter").each(function () {
            var $this = $(this),
                countTo = Number($this.attr("data-count"));

            $({ countNum: Number($this.text()) }).animate(
                {
                    countNum: countTo,
                },
                {
                    duration: 2000,
                    easing: "linear",
                    step: function () {
                        $this.text(Math.floor(this.countNum).toString());
                    },
                    complete: function () {
                        $this.text(this.countNum.toString());
                    },
                }
            );
        });
    }, []);
    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener("load", () =>
            callback(reader.result as string)
        );
        reader.readAsDataURL(img);
    };
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Image must smaller than 2MB!");
        }
        return isJpgOrPng && isLt2M;
    };
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const handleChange: UploadProps["onChange"] = (
        info: UploadChangeParam<UploadFile>
    ) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <div>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={handleFinish}
                autoComplete="off"
            >
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-4 sticky-lg-top vh-100">
                            <div className="d-flex flex-column h-100 text-center overflow-auto shadow">
                                {/* <video
                                    className="w-100 img-fluid mb-4"
                                    controls
                                    autoPlay
                                    src="/video/lam.mp4"
                                >
                                    <source
                                        src="/video/lam.mp4"
                                        type="video/mp4"
                                    />
                                </video> */}
                                <div className="min-h-200 flex flex-center flex-align-center">
                                    <Upload
                                        name="avatar"
                                        listType="picture-circle"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                    >
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt="avatar"
                                                style={{ width: "100%" }}
                                            />
                                        ) : (
                                            uploadButton
                                        )}
                                    </Upload>
                                </div>

                                <h1
                                    className="text-primary mt-2"
                                    id="info_name"
                                >
                                    <div className="p-6">
                                        <Form.Item name="info_name">
                                            <Input size="large" />
                                        </Form.Item>
                                    </div>

                                    {/* {info.info_name} */}
                                </h1>
                                <div
                                    className="mb-4"
                                    style={{
                                        height: "22px",
                                    }}
                                >
                                    <h4
                                        className="typed-text-output d-inline-block text-light"
                                        id="info_description"
                                    >
                                        {/* {info.info_description} */}
                                        <Form.Item name="info_description">
                                            <Input size="large" />
                                        </Form.Item>
                                    </h4>
                                    <div className="typed-text d-none"></div>
                                </div>
                                <div className="d-flex justify-content-center mt-auto mb-3">
                                    <a
                                        className="btn btn-secondary btn-square mx-1"
                                        href="#"
                                    >
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a
                                        className="btn btn-secondary btn-square mx-1"
                                        href="#"
                                    >
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a
                                        className="btn btn-secondary btn-square mx-1"
                                        href="#"
                                    >
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                    <a
                                        className="btn btn-secondary btn-square mx-1"
                                        href="#"
                                    >
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </div>
                                <div className="d-flex align-items-end justify-content-between border-top">
                                    <a href="" className="btn w-50 border-end">
                                        Video
                                    </a>
                                    <a
                                        href="#contact"
                                        className="btn w-50 btn-scroll"
                                    >
                                        Liên hệ
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <section
                                className="py-5 border-bottom wow fadeInUp"
                                data-wow-delay="0.1s"
                            >
                                <h1
                                    className="title pb-3 mb-5"
                                    style={{
                                        color: "#fff",
                                    }}
                                >
                                    MÔ TẢ BẢN THÂN
                                </h1>
                                <Form.Item name="info_p">
                                    <Input.TextArea size="large" />
                                </Form.Item>

                                <div className="row mb-4">
                                    <div className="col-sm-6 py-1">
                                        <span className="fw-medium text-primary">
                                            Tên:
                                        </span>
                                        {/* {state_sub_name ? (
                                            <Input
                                                onPressEnter={
                                                    handleInfoSub_name
                                                }
                                                size="large"
                                            />
                                        ) : (
                                            <span id="info_sub_name">
                                                {info_sub_name}
                                            </span>
                                        )} */}
                                        <Form.Item name="info_sub_name">
                                            <Input size="large" />
                                        </Form.Item>
                                    </div>
                                    <div className="col-sm-6 py-1">
                                        <span className="fw-medium text-primary">
                                            Ngày sinh:
                                        </span>
                                        <Form.Item name="info_sub_date">
                                            <Input size="large" />
                                        </Form.Item>
                                    </div>
                                    <div className="col-sm-6 py-1">
                                        <span className="fw-medium text-primary">
                                            Bằng cấp:
                                        </span>
                                        <Form.Item name="info_sub_degree">
                                            <Input size="large" />
                                        </Form.Item>
                                        {/* <span id="info_sub_degree">
                                            {info.info_sub_degree}
                                        </span> */}
                                    </div>
                                    <div className="col-sm-6 py-1">
                                        <span className="fw-medium text-primary">
                                            Kinh nghiệm:
                                        </span>
                                        {/* <span id="info_sub_experience">
                                            {info.info_sub_experience}
                                        </span> */}
                                        <Form.Item name="info_sub_experience">
                                            <Input size="large" />
                                        </Form.Item>
                                    </div>
                                    <div className="col-sm-6 py-1">
                                        <span className="fw-medium text-primary">
                                            Số điện thoại:
                                        </span>
                                        {/* <span id="info_sub_phone">
                                            {info.info_sub_phone}
                                        </span> */}
                                        <Form.Item name="info_sub_phone">
                                            <Input size="large" />
                                        </Form.Item>
                                    </div>
                                    <div className="col-sm-6 py-1">
                                        <span className="fw-medium text-primary">
                                            Email:
                                        </span>
                                        {/* <span id="info_sub_email">
                                            {info.info_sub_email}
                                        </span> */}
                                        <Form.Item name="info_sub_email">
                                            <Input size="large" />
                                        </Form.Item>
                                    </div>
                                    <div className="col-sm-6 py-1">
                                        <span className="fw-medium text-primary">
                                            Địa chỉ:
                                        </span>
                                        {/* <span id="info_sub_address">
                                            {info.info_sub_address}
                                        </span> */}
                                        <Form.Item name="info_sub_address">
                                            <Input size="large" />
                                        </Form.Item>
                                    </div>
                                    <div className="col-sm-6 py-1">
                                        <span className="fw-medium text-primary">
                                            Freelance:
                                        </span>
                                        {/* <span id="info_sub_free">
                                            {info.info_sub_free}
                                        </span> */}
                                        <Form.Item name="info_sub_free">
                                            <Input size="large" />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="row g-4">
                                    <div className="col-md-4 col-lg-6 col-xl-4">
                                        <div className="d-flex bg-secondary p-4">
                                            {/* <h1
                                                className="flex-shrink-0 display-5 text-primary mb-0 counter"
                                                data-toggle="counter-up"
                                                data-count="20"
                                                id="1_1_1"
                                            ></h1> */}
                                            <Form.Item name="info_sub_free">
                                                <Input
                                                    size="large"
                                                    style={{
                                                        width: "50px",
                                                    }}
                                                />
                                            </Form.Item>
                                            <div className="ps-3">
                                                <p className="mb-0" id="1_1_2">
                                                    Năm
                                                </p>
                                                <h5 className="mb-0" id="1_1_3">
                                                    Kinh nghiệm
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-lg-6 col-xl-4">
                                        <div className="d-flex bg-secondary p-4">
                                            {/* <h1
                                                className="flex-shrink-0 display-5 text-primary mb-0 counter"
                                                data-toggle="counter-up"
                                                id="1_1_4"
                                                data-count="20"
                                            ></h1> */}
                                            <Form.Item name="info_sub_free">
                                                <Input
                                                    size="large"
                                                    style={{
                                                        width: "50px",
                                                    }}
                                                />
                                            </Form.Item>
                                            <div className="ps-3">
                                                <p className="mb-0" id="1_1_5">
                                                    Khách hàng
                                                </p>
                                                <h5 className="mb-0" id="1_1_6">
                                                    {" "}
                                                    Hạnh phúc
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-lg-6 col-xl-4">
                                        <div className="d-flex bg-secondary p-4">
                                            {/* <h1
                                                className="flex-shrink-0 display-5 text-primary mb-0 counter"
                                                data-toggle="counter-up"
                                                data-count="20"
                                                id="1_1_7"
                                            ></h1> */}
                                            <Form.Item name="info_sub_free">
                                                <Input
                                                    size="large"
                                                    style={{
                                                        width: "50px",
                                                    }}
                                                />
                                            </Form.Item>
                                            <div className="ps-3">
                                                <p className="mb-0" id="1_1_8">
                                                    Dự án
                                                </p>
                                                <h5 className="mb-0" id="1_1_9">
                                                    Nổi bật
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section
                                className="py-5 border-bottom wow fadeInUp"
                                data-wow-delay="0.1s"
                            >
                                <h1 className="title pb-3 mb-5">Kỹ năng</h1>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="skill mb-4">
                                            <div className="d-flex justify-content-between">
                                                <p className="mb-2">
                                                    <Form.Item name="skill_1">
                                                        <Input size="large" />
                                                    </Form.Item>
                                                </p>

                                                <p className="mb-2">
                                                    <Form.Item name="skill_1_progress">
                                                        <Input
                                                            size="large"
                                                            style={{
                                                                width: "50px",
                                                            }}
                                                        />
                                                    </Form.Item>
                                                </p>
                                            </div>
                                            <div className="progress">
                                                <div
                                                    className="progress-bar bg-primary"
                                                    role="progressbar"
                                                    aria-valuenow={95}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                ></div>
                                            </div>
                                        </div>

                                        <Form.List name="skill_1">
                                            {(
                                                fields,
                                                { add, remove },
                                                { errors }
                                            ) => (
                                                <>
                                                    {fields.map(
                                                        (field, index) => (
                                                            <>
                                                                <div className="skill mb-4">
                                                                    <div className="d-flex justify-content-between">
                                                                        <p className="mb-2">
                                                                            <Form.Item
                                                                                name={`skill_1_${index}`}
                                                                            >
                                                                                <Input size="large" />
                                                                            </Form.Item>
                                                                        </p>

                                                                        <p className="mb-2">
                                                                            <Form.Item
                                                                                name={`skill_1_progress_${index}`}
                                                                            >
                                                                                <Input
                                                                                    size="large"
                                                                                    style={{
                                                                                        width: "50px",
                                                                                    }}
                                                                                />
                                                                            </Form.Item>
                                                                        </p>
                                                                    </div>
                                                                    <div className="progress">
                                                                        <div
                                                                            className="progress-bar bg-primary"
                                                                            role="progressbar"
                                                                            aria-valuenow={
                                                                                95
                                                                            }
                                                                            aria-valuemin={
                                                                                0
                                                                            }
                                                                            aria-valuemax={
                                                                                100
                                                                            }
                                                                        ></div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    )}
                                                    <Form.Item>
                                                        <Button
                                                            type="dashed"
                                                            onClick={() =>
                                                                add()
                                                            }
                                                            style={{
                                                                width: "60%",
                                                            }}
                                                            icon={
                                                                <PlusOutlined />
                                                            }
                                                        >
                                                            Add field
                                                        </Button>
                                                    </Form.Item>
                                                </>
                                            )}
                                        </Form.List>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="skill mb-4">
                                            <div className="d-flex justify-content-between">
                                                <p className="mb-2">
                                                    <Form.Item name="skill_1">
                                                        <Input size="large" />
                                                    </Form.Item>
                                                </p>

                                                <p className="mb-2">
                                                    <Form.Item name="skill_1_progress">
                                                        <Input
                                                            size="large"
                                                            style={{
                                                                width: "50px",
                                                            }}
                                                        />
                                                    </Form.Item>
                                                </p>
                                            </div>
                                            <div className="progress">
                                                <div
                                                    className="progress-bar bg-primary"
                                                    role="progressbar"
                                                    aria-valuenow={95}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                ></div>
                                            </div>
                                        </div>

                                        <Form.List name="skill_2">
                                            {(
                                                fields,
                                                { add, remove },
                                                { errors }
                                            ) => (
                                                <>
                                                    {fields.map(
                                                        (field, index) => (
                                                            <>
                                                                <div className="skill mb-4">
                                                                    <div className="d-flex justify-content-between">
                                                                        <p className="mb-2">
                                                                            <Form.Item
                                                                                name={`skill_2_${index}`}
                                                                            >
                                                                                <Input size="large" />
                                                                            </Form.Item>
                                                                        </p>

                                                                        <p className="mb-2">
                                                                            <Form.Item
                                                                                name={`skill_2_progress_${index}`}
                                                                            >
                                                                                <Input
                                                                                    size="large"
                                                                                    style={{
                                                                                        width: "50px",
                                                                                    }}
                                                                                />
                                                                            </Form.Item>
                                                                        </p>
                                                                    </div>
                                                                    <div className="progress">
                                                                        <div
                                                                            className="progress-bar bg-primary"
                                                                            role="progressbar"
                                                                            aria-valuenow={
                                                                                95
                                                                            }
                                                                            aria-valuemin={
                                                                                0
                                                                            }
                                                                            aria-valuemax={
                                                                                100
                                                                            }
                                                                        ></div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    )}
                                                    <Form.Item>
                                                        <Button
                                                            type="dashed"
                                                            onClick={() =>
                                                                add()
                                                            }
                                                            style={{
                                                                width: "60%",
                                                            }}
                                                            icon={
                                                                <PlusOutlined />
                                                            }
                                                        >
                                                            Add field
                                                        </Button>
                                                    </Form.Item>
                                                </>
                                            )}
                                        </Form.List>
                                    </div>
                                </div>
                            </section>

                            <section
                                className="py-5 wow fadeInUp"
                                data-wow-delay="0.1s"
                            >
                                <h1 className="title pb-3 mb-5">Kinh nghiệm</h1>
                                <div className="border-start border-2 border-light pt-2 ps-5">
                                    {/* <div className="position-relative mb-4">
                                        <span
                                            className="bi bi-arrow-right fs-4 text-light position-absolute"
                                            style={{
                                                top: "-5px",
                                                left: "-50px",
                                            }}
                                        ></span>
                                        <h5 className="mb-1">
                                            <Form.Item name="info_p">
                                                <Input size="large" />
                                            </Form.Item>
                                        </h5>
                                        <p className="mb-2">
                                            <Form.Item name="info_p">
                                                <Input />
                                            </Form.Item>
                                            <small>
                                                {" "}
                                                <Form.Item name="info_p">
                                                    <Input />
                                                </Form.Item>
                                            </small>
                                        </p>
                                        <p>
                                            <Form.Item name="info_p">
                                                <Input.TextArea size="large" />
                                            </Form.Item>
                                        </p>
                                    </div> */}
                                    <div className="position-relative mb-4">
                                        <span
                                            className="bi bi-arrow-right fs-4 text-light position-absolute"
                                            style={{
                                                top: "-5px",
                                                left: "-50px",
                                            }}
                                        ></span>
                                        <h5 className="mb-1">
                                            Lập trình viên AI
                                        </h5>
                                        <p className="mb-2">
                                            Top CV | <small>2020 - 2022</small>
                                        </p>
                                        <p>
                                            Tempor eos dolore amet tempor dolor
                                            tempor. Dolore ea magna sit amet
                                            dolor eirmod. Eos ipsum est tempor
                                            dolor. Clita lorem kasd sed ea lorem
                                            diam ea lorem eirmod duo sit ipsum
                                            stet lorem diam
                                        </p>
                                    </div>
                                    <div className="position-relative mb-4">
                                        <span
                                            className="bi bi-arrow-right fs-4 text-light position-absolute"
                                            style={{
                                                top: "-5px",
                                                left: "-50px",
                                            }}
                                        ></span>
                                        <h5 className="mb-1">
                                            Trưởng phòng AI
                                        </h5>
                                        <p className="mb-2">
                                            Canvas | <small>2022 - nay</small>
                                        </p>
                                        <p>
                                            Tempor eos dolore amet tempor dolor
                                            tempor. Dolore ea magna sit amet
                                            dolor eirmod. Eos ipsum est tempor
                                            dolor. Clita lorem kasd sed ea lorem
                                            diam ea lorem eirmod duo sit ipsum
                                            stet lorem diam
                                        </p>
                                    </div>
                                </div>
                            </section>
                            <section
                                className="py-5 border-bottom wow fadeInUp"
                                data-wow-delay="0.1s"
                            >
                                <h1 className="title pb-3 mb-5">Services</h1>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <div className="service-item">
                                            <i className="fa fa-2x fa-laptop-code mx-auto mb-4"></i>
                                            <h5 className="mb-2">Web Design</h5>
                                            <p className="mb-0">
                                                Justo sit justo eos amet tempor
                                                amet clita amet ipsum eos elitr.
                                                Amet lorem lorem lorem est amet
                                                labore
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="service-item">
                                            <i className="fab fa-2x fa-android mx-auto mb-4"></i>
                                            <h5 className="mb-2">
                                                Apps Development
                                            </h5>
                                            <p className="mb-0">
                                                Justo sit justo eos amet tempor
                                                amet clita amet ipsum eos elitr.
                                                Amet lorem lorem lorem est amet
                                                labore
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="service-item">
                                            <i className="fa fa-2x fa-search mx-auto mb-4"></i>
                                            <h5 className="mb-2">SEO</h5>
                                            <p className="mb-0">
                                                Justo sit justo eos amet tempor
                                                amet clita amet ipsum eos elitr.
                                                Amet lorem lorem lorem est amet
                                                labore
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="service-item">
                                            <i className="fa fa-2x fa-edit mx-auto mb-4"></i>
                                            <h5 className="mb-2">
                                                Content Creating
                                            </h5>
                                            <p className="mb-0">
                                                Justo sit justo eos amet tempor
                                                amet clita amet ipsum eos elitr.
                                                Amet lorem lorem lorem est amet
                                                labore
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section
                                className="py-5 border-bottom wow fadeInUp"
                                data-wow-delay="0.1s"
                            >
                                <h1 className="title pb-3 mb-5">Portfolio</h1>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-12 text-center mb-2">
                                                <ul
                                                    className="list-inline mb-4"
                                                    id="portfolio-flters"
                                                >
                                                    <li
                                                        className="btn btn-secondary active"
                                                        data-filter="*"
                                                    >
                                                        <i className="fa fa-star me-2"></i>
                                                        All
                                                    </li>
                                                    <li
                                                        className="btn btn-secondary"
                                                        data-filter=".first"
                                                    >
                                                        <i className="fa fa-laptop-code me-2"></i>
                                                        Design
                                                    </li>
                                                    <li
                                                        className="btn btn-secondary"
                                                        data-filter=".second"
                                                    >
                                                        <i className="fa fa-mobile-alt me-2"></i>
                                                        Development
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="row portfolio-container">
                                            <div className="col-md-6 mb-4 portfolio-item first">
                                                <div className="position-relative overflow-hidden mb-2">
                                                    <img
                                                        className="img-fluid w-100"
                                                        src="img/portfolio-1.jpg"
                                                        alt=""
                                                    />
                                                    <div className="portfolio-btn d-flex align-items-center justify-content-center">
                                                        <a
                                                            href="img/portfolio-1.jpg"
                                                            data-lightbox="portfolio"
                                                        >
                                                            <i className="bi bi-plus text-light"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4 portfolio-item second">
                                                <div className="position-relative overflow-hidden mb-2">
                                                    <img
                                                        className="img-fluid w-100"
                                                        src="img/portfolio-2.jpg"
                                                        alt=""
                                                    />
                                                    <div className="portfolio-btn d-flex align-items-center justify-content-center">
                                                        <a
                                                            href="img/portfolio-2.jpg"
                                                            data-lightbox="portfolio"
                                                        >
                                                            <i className="bi bi-plus text-light"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4 portfolio-item first">
                                                <div className="position-relative overflow-hidden mb-2">
                                                    <img
                                                        className="img-fluid w-100"
                                                        src="img/portfolio-3.jpg"
                                                        alt=""
                                                    />
                                                    <div className="portfolio-btn d-flex align-items-center justify-content-center">
                                                        <a
                                                            href="img/portfolio-3.jpg"
                                                            data-lightbox="portfolio"
                                                        >
                                                            <i className="bi bi-plus text-light"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4 portfolio-item second">
                                                <div className="position-relative overflow-hidden mb-2">
                                                    <img
                                                        className="img-fluid w-100"
                                                        src="img/portfolio-4.jpg"
                                                        alt=""
                                                    />
                                                    <div className="portfolio-btn d-flex align-items-center justify-content-center">
                                                        <a
                                                            href="img/portfolio-4.jpg"
                                                            data-lightbox="portfolio"
                                                        >
                                                            <i className="bi bi-plus text-light"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section
                                className="py-5 border-bottom wow fadeInUp"
                                data-wow-delay="0.1s"
                            >
                                <h1 className="title pb-3 mb-5">
                                    Người tham chiếu
                                </h1>
                                <div className="owl-carousel testimonial-carousel">
                                    <div className="text-left">
                                        <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>
                                        <p className="fs-4 mb-4">
                                            Dolor eirmod diam stet kasd sed.
                                            Aliqu rebum est eos. Rebum elitr
                                            dolore et eos labore, stet justo sed
                                            est sed. Diam sed sed dolor stet
                                            accusam amet eirmod eos, labore diam
                                            clita
                                        </p>
                                        <div className="d-flex align-items-center">
                                            <img
                                                className="img-fluid"
                                                src="img/testimonial-1.jpg"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                }}
                                            />
                                            <div className="ps-3">
                                                <p className="text-primary fs-5 mb-1">
                                                    Client Name
                                                </p>
                                                <i>Profession</i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>
                                        <p className="fs-4 mb-4">
                                            Dolor eirmod diam stet kasd sed.
                                            Aliqu rebum est eos. Rebum elitr
                                            dolore et eos labore, stet justo sed
                                            est sed. Diam sed sed dolor stet
                                            accusam amet eirmod eos, labore diam
                                            clita
                                        </p>
                                        <div className="d-flex align-items-center">
                                            <img
                                                className="img-fluid"
                                                src="img/testimonial-2.jpg"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                }}
                                            />
                                            <div className="ps-3">
                                                <p className="text-primary fs-5 mb-1">
                                                    Client Name
                                                </p>
                                                <i>Profession</i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>
                                        <p className="fs-4 mb-4">
                                            Dolor eirmod diam stet kasd sed.
                                            Aliqu rebum est eos. Rebum elitr
                                            dolore et eos labore, stet justo sed
                                            est sed. Diam sed sed dolor stet
                                            accusam amet eirmod eos, labore diam
                                            clita
                                        </p>
                                        <div className="d-flex align-items-center">
                                            <img
                                                className="img-fluid"
                                                src="img/testimonial-3.jpg"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                }}
                                            />
                                            <div className="ps-3">
                                                <p className="text-primary fs-5 mb-1">
                                                    Client Name
                                                </p>
                                                <i>Profession</i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section
                                className="py-5 wow fadeInUp"
                                data-wow-delay="0.1s"
                                id="contact"
                            >
                                <h1 className="title pb-3 mb-5">Liên hệ</h1>
                                <p className="mb-4">
                                    The contact form is currently inactive. Get
                                    a functional and working contact form with
                                    Ajax & PHP in a few minutes. Just copy and
                                    paste the files, add a little code and
                                    you're done.
                                    <a href="https://htmlcodex.com/contact-form">
                                        Download Now
                                    </a>
                                </p>
                                <form>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control border-0 bg-secondary"
                                                    id="name"
                                                    placeholder="Your Name"
                                                />
                                                <label htmlFor="name">
                                                    Your Name
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="email"
                                                    className="form-control border-0 bg-secondary"
                                                    id="email"
                                                    placeholder="Your Email"
                                                />
                                                <label htmlFor="email">
                                                    Your Email
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control border-0 bg-secondary"
                                                    id="subject"
                                                    placeholder="Subject"
                                                />
                                                <label htmlFor="subject">
                                                    Subject
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea
                                                    className="form-control border-0 bg-secondary"
                                                    placeholder="Leave a message here"
                                                    id="message"
                                                    style={{
                                                        height: "200px",
                                                    }}
                                                ></textarea>
                                                <label htmlFor="message">
                                                    Message
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button
                                                className="btn btn-primary w-100 py-3"
                                                type="submit"
                                            >
                                                Send Message
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </section>

                            <section
                                className="wow fadeIn"
                                data-wow-delay="0.1s"
                            >
                                <div className="bg-secondary text-light text-center p-5">
                                    <div className="d-flex justify-content-center mb-4">
                                        <a
                                            className="btn btn-dark btn-square mx-1"
                                            href="#"
                                        >
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a
                                            className="btn btn-dark btn-square mx-1"
                                            href="#"
                                        >
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a
                                            className="btn btn-dark btn-square mx-1"
                                            href="#"
                                        >
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                        <a
                                            className="btn btn-dark btn-square mx-1"
                                            href="#"
                                        >
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    </div>
                                    <div className="d-flex justify-content-center mb-3">
                                        <a
                                            className="text-light px-3 border-end"
                                            href="#"
                                        >
                                            Privacy
                                        </a>
                                        <a
                                            className="text-light px-3 border-end"
                                            href="#"
                                        >
                                            Terms
                                        </a>
                                        <a
                                            className="text-light px-3 border-end"
                                            href="#"
                                        >
                                            FAQs
                                        </a>
                                        <a className="text-light px-3" href="#">
                                            Help
                                        </a>
                                    </div>

                                    <p className="m-0">
                                        &copy; All Rights Reserved. Designed by
                                        <a href="https://htmlcodex.com">
                                            HTML Codex
                                        </a>
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
