import "./App.css";
import PackageList from "./components/PackageList";

function App() {
  return (
    <>
      <section id="center">
        <div id="package-list-container">
          <h1>Packages 📦</h1>
          <PackageList />
        </div>
      </section>
    </>
  );
}

export default App;
