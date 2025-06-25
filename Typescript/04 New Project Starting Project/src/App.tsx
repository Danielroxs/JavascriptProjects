import { get } from "./util/http";

function App() {
  get("https://jsonplaceholder.typicode.com/posts");
}

export default App;
