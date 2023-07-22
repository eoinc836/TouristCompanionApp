import { useRoutes } from "react-router-dom";
import Routes from "./router/indexRouter";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header></Header>
      {useRoutes(Routes)}
      <Footer></Footer>
    </div>
  );
}
export default App;
