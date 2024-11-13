
import Header from "../../components/Client/Header";
import Footer from "../../components/Client/Footer";
import Content from "./Content";
import Category from "./Product/Category";
import Animation from './Animations/Animation';
import BestSellingPhone from "./Product/BestSellingPhone";
import AdvertisingImage from "./Animations/AdvertisingImage";

const Home = () => {
  return (
    <div className="">
      <Header />
      <Content  />
      <Category  />
      <Animation/>
      <BestSellingPhone/>
      <AdvertisingImage />
      <BestSellingPhone/>
      <BestSellingPhone/>
      <BestSellingPhone/>
      <AdvertisingImage/>
      <Footer />
    </div>
  );
};

export default Home;
