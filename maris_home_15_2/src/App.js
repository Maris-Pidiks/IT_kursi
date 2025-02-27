import "./index.css";
import Hello from "./Hello";
import Counter from "./Counter";
import Posts from "./Posts";

function App() {
  return (
    <div className="App">
      <div>
        <h1>Добро пожаловать в мой React-проект!</h1>
        <p>Это моё первое домашнее задание.</p>
      </div>
      <Hello name="Laura" />
      <Hello name="Petra" />
      <Hello name="Mike" />
      <Hello name="John" />
      <Counter />
      <Posts />
    </div>
  );
}

export default App;
