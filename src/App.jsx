import HomeSlide from "./slides/homeSlide";
import LoginSlide from "./slides/loginSlide";

function App() {
  return (
    <>
      <div className="carousel w-full h-screen">
        <HomeSlide />
        <LoginSlide />
      </div>
    </>
  );
}

export default App;
