import Hero from "../components/Hero"; 
import Header from '../components/Header';
import Footer from "../components/Footer";

import ScoreList from "../components/ScoreList";
export default function Home() { 
  return (
    <div>
      <Header />
      <Hero />
      <ScoreList />
      <Footer />
    </div>
  );
}