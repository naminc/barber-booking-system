import React from "react";
import others2Img from "../imgs/02.jpg";
import others1Img from "../imgs/01.jpg";
import { useSettingsContext } from "../context/SettingsContext";
const About = () => {
  const { getSetting } = useSettingsContext();
  const shopOwner = getSetting("owner");
  return (
    <div id="about">
      <section className="flex items-center justify-center w-full my-20">
        <div className="flex items-center justify-center lg:flex-row flex-col gap-20">
          <div className="flex md:items-center items-start md:flex-row flex-col">
            <img src={others2Img} alt="" className="rounded m-3" />
            <img src={others1Img} alt="" className="rounded m-3 h-1/2" />
          </div>
          <div className="lg:w-2/5 w-4/6">
            <h3 className="text-4xl text-gold font-semibold font-RobotoCondensed">
              VỀ CHÚNG TÔI
            </h3>
            <p className="font-medium mt-3">
              Chúng tôi là tiệm Barber chuyên nghiệp với đội ngũ thợ lành nghề,
              mang đến cho khách hàng những kiểu tóc thời thượng và dịch vụ tốt
              nhất.
            </p>
            <p className="font-medium mt-3">
              Tại đây, bạn không chỉ được cắt tóc, mà còn được trải nghiệm không
              gian thư giãn, tận hưởng phong cách và sự chăm sóc tận tâm của đội
              ngũ Barber hàng đầu.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full hero2-image h-[400px] flex justify-center items-center flex-col text-white-200 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="7em"
          height="7em"
          viewBox="0 0 24 24"
          className="fill-current text-white"
        >
          <path
            fill="#fff"
            d="M16.372 11.621c1.57 0 2.628 1.092 2.628 2.71C19 15.787 17.784 17 16.137 17C14.333 17 13 15.544 13 13.32c0-5.055 3.686-7.077 6-7.32v2.224c-1.569.283-3.333 1.86-3.412 3.6c.079-.04.392-.203.784-.203Zm-7.999 0c1.568 0 2.627 1.092 2.627 2.71C11 15.787 9.784 17 8.137 17C6.333 17 5 15.544 5 13.32C5 8.265 8.686 6.243 11 6v2.224c-1.569.283-3.333 1.86-3.412 3.6c.079-.04.392-.203.785-.203Z"
          />
        </svg>
        <h3 className="md:text-2xl text-xl mt-2 font-bold">
          “ Một kiểu tóc đẹp có thể thay đổi cả phong thái của bạn. <br />
          Hãy để chúng tôi giúp bạn thể hiện phong cách riêng. ”
        </h3>
        <small className="mt-4 text-2xl font-RobotoCondensed">
          - {shopOwner} -
        </small>
      </section>
    </div>
  );
};

export default About;