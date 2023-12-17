"use client";
import { Image } from "antd";
import { gsap } from "gsap";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import imagesLoaded from "imagesloaded";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
export default function Slide() {
  const router = useRouter();
  const buttons = {
    prev: useRef(null),
    next: useRef(null),
  };
  const cardsContainerEl = useRef<HTMLDivElement | null>(null);
  const appBgContainerEl = useRef<HTMLDivElement | null>(null);
  const cardInfosContainerEl = useRef<HTMLDivElement | null>(null);

  const initCardEvents = () => {
    if (cardsContainerEl.current) {
      const currentCardEl =
        cardsContainerEl.current.querySelector(".current--card");
      if (currentCardEl) {
        currentCardEl.addEventListener("pointermove", updateCard);
        currentCardEl.addEventListener("pointerout", resetCardTransforms);
      }
    }
  };

  function swapCards(direction: string) {
    if (cardsContainerEl.current && appBgContainerEl.current) {
      const currentCardEl: any =
        cardsContainerEl.current.querySelector(".current--card");
      const previousCardEl: any =
        cardsContainerEl.current.querySelector(".previous--card");
      const nextCardEl: any =
        cardsContainerEl.current.querySelector(".next--card");

      const currentBgImageEl: any =
        appBgContainerEl.current.querySelector(".current--image");
      const previousBgImageEl: any =
        appBgContainerEl.current.querySelector(".previous--image");
      const nextBgImageEl: any =
        appBgContainerEl.current.querySelector(".next--image");
      const swapCardsClass = () => {
        currentCardEl?.classList.remove("current--card");
        previousCardEl?.classList.remove("previous--card");
        nextCardEl?.classList.remove("next--card");

        currentBgImageEl?.classList.remove("current--image");
        previousBgImageEl?.classList.remove("previous--image");
        nextBgImageEl?.classList.remove("next--image");

        currentCardEl.style.zIndex = "50";
        currentBgImageEl.style.zIndex = "-2";

        if (direction === "right") {
          previousCardEl.style.zIndex = "20";
          nextCardEl.style.zIndex = "30";

          nextBgImageEl.style.zIndex = "-1";

          currentCardEl?.classList.add("previous--card");
          previousCardEl?.classList.add("next--card");
          nextCardEl?.classList.add("current--card");

          currentBgImageEl?.classList.add("previous--image");
          previousBgImageEl?.classList.add("next--image");
          nextBgImageEl?.classList.add("current--image");
        } else if (direction === "left") {
          previousCardEl.style.zIndex = "30";
          nextCardEl.style.zIndex = "20";

          previousBgImageEl.style.zIndex = "-1";

          currentCardEl?.classList.add("next--card");
          previousCardEl?.classList.add("current--card");
          nextCardEl?.classList.add("previous--card");

          currentBgImageEl?.classList.add("next--image");
          previousBgImageEl?.classList.add("current--image");
          nextBgImageEl?.classList.add("previous--image");
        }
      };
      changeInfo(direction);
      swapCardsClass();

      removeCardEvents(currentCardEl);
    }
  }
  function changeInfo(direction: string) {
    if (cardInfosContainerEl.current) {
      let currentInfoEl =
        cardInfosContainerEl.current.querySelector(".current--info");
      let previousInfoEl =
        cardInfosContainerEl.current.querySelector(".previous--info");
      let nextInfoEl =
        cardInfosContainerEl.current.querySelector(".next--info");
      if (currentInfoEl && previousInfoEl && nextInfoEl) {
        gsap
          .timeline()
          .to([buttons.prev, buttons.next], {
            duration: 0.2,
            opacity: 0.5,
            pointerEvents: "none",
          })
          .to(
            currentInfoEl.querySelectorAll(".text"),
            {
              duration: 0.4,
              stagger: 0.1,
              translateY: "-120px",
              opacity: 0,
            },
            "-="
          )
          .call(() => {
            swapInfosClass();
          })
          .call(() => initCardEvents())
          .fromTo(
            direction === "right"
              ? nextInfoEl.querySelectorAll(".text")
              : previousInfoEl.querySelectorAll(".text"),
            {
              opacity: 0,
              translateY: "40px",
            },
            {
              duration: 0.4,
              stagger: 0.1,
              translateY: "0px",
              opacity: 1,
            }
          )
          .to([buttons.prev, buttons.next], {
            duration: 0.2,
            opacity: 1,
            pointerEvents: "all",
          });

        const swapInfosClass = () => {
          currentInfoEl?.classList.remove("current--info");
          previousInfoEl?.classList.remove("previous--info");
          nextInfoEl?.classList.remove("next--info");

          if (direction === "right") {
            currentInfoEl?.classList.add("previous--info");
            nextInfoEl?.classList.add("current--info");
            previousInfoEl?.classList.add("next--info");
          } else if (direction === "left") {
            currentInfoEl?.classList.add("next--info");
            nextInfoEl?.classList.add("previous--info");
            previousInfoEl?.classList.add("current--info");
          }
        };
      }
    }
  }
  const updateCard = (e: any) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const centerPosition = {
      x: box.left + box.width / 2,
      y: box.top + box.height / 2,
    };
    let angle = (Math.atan2(e.pageX - centerPosition.x, 0) * 35) / Math.PI;
    gsap.set(card, {
      "--current-card-rotation-offset": `${angle}deg`,
    });
    if (cardInfosContainerEl.current) {
      const currentInfoEl =
        cardInfosContainerEl.current.querySelector(".current--info");
      gsap.set(currentInfoEl, {
        rotateY: `${angle}deg`,
      });
    }
  };

  const resetCardTransforms = (e: any) => {
    const card = e.currentTarget;
    if (cardInfosContainerEl.current) {
      const currentInfoEl =
        cardInfosContainerEl.current.querySelector(".current--info");
      gsap.set(card, {
        "--current-card-rotation-offset": 0,
      });
      gsap.set(currentInfoEl, {
        rotateY: 0,
      });
    }
  };
  function removeCardEvents(card: any) {
    card.removeEventListener("pointermove", updateCard);
  }

  function init() {
    let tl = gsap.timeline();
    if (cardsContainerEl.current && cardInfosContainerEl.current) {
      let newX = cardInfosContainerEl?.current
        ?.querySelector(".current--info")
        ?.querySelectorAll(".text");
      if (newX)
        tl.to(cardsContainerEl.current.children, {
          delay: 0.15,
          duration: 0.5,
          stagger: {
            ease: "power4.inOut",
            from: "end",
            amount: 0.1,
          },
          "--card-translateY-offset": "0%",
        })
          .to(newX, {
            delay: 0.5,
            duration: 0.4,
            stagger: 0.1,
            opacity: 1,
            translateY: 0,
          })
          .to(
            [buttons.prev, buttons.next],
            {
              duration: 0.4,
              opacity: 1,
              pointerEvents: "all",
            },
            "-=0.4"
          );
    }
  }
  const waitForImages = () => {
    const images = Array.from(
      document.querySelectorAll("img")
    ) as HTMLImageElement[];
    const totalImages = images.length;
    let loadedImages = 0;
    const loaderEl = document.querySelector(".loader span");

    if (cardsContainerEl.current && cardInfosContainerEl.current) {
      let newEl = cardInfosContainerEl?.current
        ?.querySelector(".current--info")
        ?.querySelectorAll(".text");
      gsap.set(cardsContainerEl.current.children, {
        "--card-translateY-offset": "100vh",
      });
      if (newEl)
        gsap.set(newEl, {
          translateY: "40px",
          opacity: 0,
        });
      gsap.set([buttons.prev, buttons.next], {
        pointerEvents: "none",
        opacity: "0",
      });

      images.forEach((image) => {
        imagesLoaded(image, (instance: any) => {
          if (instance.isComplete) {
            loadedImages++;
            let loadProgress = loadedImages / totalImages;

            gsap.to(loaderEl, {
              duration: 1,
              scaleX: loadProgress,
              backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
            });

            if (totalImages == loadedImages) {
              gsap
                .timeline()
                .to(".loading__wrapper", {
                  duration: 0.8,
                  opacity: 0,
                  pointerEvents: "none",
                })
                .call(() => init());
            }
          }
        });
      });
    }
  };
  useEffect(() => {
    initCardEvents();
    waitForImages();
  }, []);
  return (
    <div className="slider">
      <div className="app">
        <div className="cardList">
          <button
            className="cardList__btn btn btn--left"
            ref={buttons.prev}
            onClick={() => swapCards("left")}
          >
            <div className="icon">
              <svg>
                <use xlinkHref="#arrow-left"></use>
              </svg>
            </div>
          </button>

          <div className="cards__wrapper" ref={cardsContainerEl}>
            <div className="card current--card">
              <div className="card__image">
                <img src="https://source.unsplash.com/Z8dtTatMVMw" alt="" />
              </div>
            </div>

            <div className="card next--card">
              <div className="card__image">
                <img src="https://source.unsplash.com/9dmycbFE7mQ" alt="" />
              </div>
            </div>

            <div className="card previous--card">
              <div className="card__image">
                <img src="https://source.unsplash.com/m7K4KzL5aQ8" alt="" />
              </div>
            </div>
          </div>

          <button
            className="cardList__btn btn btn--right"
            ref={buttons.next}
            onClick={() => swapCards("right")}
          >
            <div className="icon">
              <svg>
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </div>
          </button>
        </div>

        <div className="infoList">
          <div className="info__wrapper" ref={cardInfosContainerEl}>
            <div className="info current--info">
              <h1 className="text name">Tinh tế</h1>
              <h4 className="text location">Mẫu 1</h4>
              <p className="text description">Adventure is never far away</p>
            </div>

            <div className="info next--info">
              <h1 className="text name">Machu Pichu</h1>
              <h4 className="text location">Peru</h4>
              <p className="text description">Adventure is never far away</p>
            </div>

            <div className="info previous--info">
              <h1 className="text name">Chamonix</h1>
              <h4 className="text location">France</h4>
              <p className="text description">Let your dreams come true</p>
            </div>
          </div>
        </div>

        <div className="app__bg" ref={appBgContainerEl}>
          <div className="app__bg__image current--image">
            <img src="https://source.unsplash.com/Z8dtTatMVMw" alt="" />
          </div>
          <div className="app__bg__image next--image">
            <img src="https://source.unsplash.com/9dmycbFE7mQ" alt="" />
          </div>
          <div className="app__bg__image previous--image">
            <img src="https://source.unsplash.com/m7K4KzL5aQ8" alt="" />
          </div>
        </div>
      </div>
      <div className="loading__wrapper">
        <div className="loader--text">Loading...</div>
        <div className="loader">
          <span></span>
        </div>
      </div>
      <svg
        className="icons"
        style={{
          display: "none",
        }}
      >
        <symbol
          id="arrow-left"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <polyline
            points="328 112 184 256 328 400"
            style={{
              fill: "none",
              stroke: "#fff",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "48px",
            }}
          />
        </symbol>
        <symbol
          id="arrow-right"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <polyline
            points="184 112 328 256 184 400"
            style={{
              fill: "none",
              stroke: "#fff",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "48px",
            }}
          />
        </symbol>
      </svg>
      <div className="banner">
        <span>Sử dụng mẫu này</span>
        <div
          onClick={() => {
            router.push("/preview");
          }}
          style={{
            cursor: "pointer",
          }}
        >
          Xem trước
        </div>
        <div
          onClick={() => {
            router.push("/edit");
          }}
          style={{
            cursor: "pointer",
          }}
        >
          Dùng thử
        </div>
        {/* <div className="dropping-texts">
          <div>Xem trước</div>
          <div>Dùng thử</div>
        </div> */}
      </div>
    </div>
  );
}
