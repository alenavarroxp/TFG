import HomeSlide from "../slides/homeSlide";
import LoginSlide from "../slides/loginSlide";

export const Home = () => {
  return (
    <div className="carousel w-full h-screen">
      <HomeSlide/>
      <LoginSlide />
    </div>
  );
};
