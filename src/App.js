import * as React from "react";
import { Routes, Route } from "react-router-dom";

import View from "./components/ListView";
import Edit from "./components/ItemForm";
import { Container } from "react-bootstrap";

function Error() {
  return "I am error page";
}

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<View />} />
        <Route path="/item/:itemId" element={<Edit />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Container>
  );
}
export default App;
