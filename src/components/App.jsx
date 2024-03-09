import styles from "../styles/app.module.css";
import ListOfProducts from "./ListOfProducts";
import Header from "./Header";

// Во всех основных компонентах всё должно быть зелёным, нужно меньше вёрстки!

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <ListOfProducts />
    </div>
  );
}

export default App;
