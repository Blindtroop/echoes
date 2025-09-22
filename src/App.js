import Background from "./Components/background";
import EchoForm from "./Components/EchoForm";
import EchoFeed from "./Components/EchoFeed";

function App() {
  return (
    <div className="relative min-h-screen text-white">
      <Background />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl font-bold">Echoes</h1>
        <p className="mt-4 text-gray-300">Anonymous voices in the dark</p>
        <EchoForm/>
        <EchoFeed/>
      </div>
      
    </div>
  );
}

export default App;
