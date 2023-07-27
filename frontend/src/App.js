import { useRoutes } from "react-router-dom";
import Routes from "./router/indexRouter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ResponsiveLayout from './components/ResponsiveLayout';

function App() {
  return (
    <div>
      <Header></Header>
      <ResponsiveLayout />
      {useRoutes(Routes)}
      <Footer></Footer>
    </div>
  );
}
export default App;
