import Header from "../../components/Client/Header";
import Footer from "../../components/Client/Footer";
import Content from "./Animations/Content";
import Category from "./Product/Category";
import Animation from "./Animations/Animation";
import BestSellingPhone from "./Product/BestSellingPhone";
import AdvertisingImage from "./Animations/AdvertisingImage";

const Home = () => {
  return (
    <div className="">
      <Header />
      <Content />
      <Category />
      <Animation />
      <AdvertisingImage />
      <BestSellingPhone />
      <BestSellingPhone />
      <BestSellingPhone />
      <BestSellingPhone />
      <Footer />
    </div>
  );
};

export default Home;
