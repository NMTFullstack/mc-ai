import { Info_Template_Type } from "./interface_info";

export default function Info_Template({ info }: { info: Info_Template_Type }) {
    return (
        <div>
            <section
                className="py-5 border-bottom wow fadeInUp"
                data-wow-delay="0.1s"
            >
                <h1 className="title pb-3 mb-5">MÔ TẢ BẢN THÂN</h1>
                <p id="info_p">{info.info_p}</p>
                <div className="row mb-4">
                    <div className="col-sm-6 py-1">
                        <span className="fw-medium text-primary">Tên:</span>
                        <span id="info_sub_name">{info.info_sub_name}</span>
                    </div>
                    <div className="col-sm-6 py-1">
                        <span className="fw-medium text-primary">
                            Ngày sinh:
                        </span>
                        <span id="info_sub_date">{info.info_sub_date}</span>
                    </div>
                    <div className="col-sm-6 py-1">
                        <span className="fw-medium text-primary">
                            Bằng cấp:
                        </span>
                        <span id="info_sub_degree">{info.info_sub_degree}</span>
                    </div>
                    <div className="col-sm-6 py-1">
                        <span className="fw-medium text-primary">
                            Kinh nghiệm:
                        </span>
                        <span id="info_sub_experience">
                            {info.info_sub_experience}
                        </span>
                    </div>
                    <div className="col-sm-6 py-1">
                        <span className="fw-medium text-primary">
                            Số điện thoại:
                        </span>
                        <span id="info_sub_phone">{info.info_sub_phone}</span>
                    </div>
                    <div className="col-sm-6 py-1">
                        <span className="fw-medium text-primary">Email:</span>
                        <span id="info_sub_email">{info.info_sub_email}</span>
                    </div>
                    <div className="col-sm-6 py-1">
                        <span className="fw-medium text-primary">Địa chỉ:</span>
                        <span id="info_sub_address">
                            {info.info_sub_address}
                        </span>
                    </div>
                    <div className="col-sm-6 py-1">
                        <span className="fw-medium text-primary">
                            Freelance:
                        </span>
                        <span id="info_sub_free">{info.info_sub_free}</span>
                    </div>
                </div>
                <div className="row g-4">
                    <div className="col-md-4 col-lg-6 col-xl-4">
                        <div className="d-flex bg-secondary p-4">
                            <h1
                                className="flex-shrink-0 display-5 text-primary mb-0"
                                data-toggle="counter-up"
                                id="1_1_1"
                            ></h1>
                            <div className="ps-3">
                                <p className="mb-0" id="1_1_2"></p>
                                <h5 className="mb-0" id="1_1_3"></h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-6 col-xl-4">
                        <div className="d-flex bg-secondary p-4">
                            <h1
                                className="flex-shrink-0 display-5 text-primary mb-0"
                                data-toggle="counter-up"
                                id="1_1_4"
                            ></h1>
                            <div className="ps-3">
                                <p className="mb-0" id="1_1_5"></p>
                                <h5 className="mb-0" id="1_1_6"></h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-6 col-xl-4">
                        <div className="d-flex bg-secondary p-4">
                            <h1
                                className="flex-shrink-0 display-5 text-primary mb-0"
                                data-toggle="counter-up"
                                id="1_1_7"
                            ></h1>
                            <div className="ps-3">
                                <p className="mb-0" id="1_1_8"></p>
                                <h5 className="mb-0" id="1_1_9"></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
