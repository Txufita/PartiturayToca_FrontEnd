import Hero from "../components/Hero";   // Importa o componente Hero do diretório components

import ScoreList from "../components/ScoreList";
export default function Home() { // Define e exporta o componente funcional Home
  return (
    <div>
      <Hero />
      <ScoreList />
      <h1>Página de inicio</h1>  
    </div>
  );
}   
