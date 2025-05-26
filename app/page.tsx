import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import CookieCard from "@/components/CookieCards";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div>
        <Navbar showOrderButton={false} />
        <Main />
        <CookieCard />
        <Footer />
    </div>
  );
};

export default Home;
