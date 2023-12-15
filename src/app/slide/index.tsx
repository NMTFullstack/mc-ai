"use client";
import { Image } from "antd";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Slide() {
    let slide = [1, 2];

    return (
        <div className="flex flex-center flex-align-center">
            <div className="w-400px h-600px">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    loop={true}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    slidesPerView={1}
                    autoplay={{
                        delay: 10000,
                        disableOnInteraction: false,
                    }}
                >
                    {slide.map((item: any, index: number) => (
                        <SwiperSlide
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            key={index}
                        >
                            <Link href={`/preview`}>
                                <Image
                                    src={`/img/cv${item}.png`}
                                    alt="img"
                                    width={400}
                                    height={600}
                                    preview={false}
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
