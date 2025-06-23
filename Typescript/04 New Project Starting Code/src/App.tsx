//import Input from "./components/Input";
import Button from "./components/Button";
import Container from "./components/Container";

function App() {
  return (
    <main>
      <Container
        as={Button}
        onClick={() => {
          console.log("hola");
        }}
        type="button"
      >
        Click me
      </Container>
    </main>
  );
}

export default App;
