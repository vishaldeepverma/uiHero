import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Row } from "react-bootstrap";
import axios from "axios";

export default function ItemForm() {
  const navigate = useNavigate();
  const [item, setItem] = useState({});
  let { itemId } = useParams();
  useEffect(() => {
    if (itemId !== "add") {
      fetch(`http://3.214.3.182:4000/api/item/${itemId}`)
        .then((res) => res.json())
        .then((result) => {
          setItem(result);
        });
    }
  }, []);
  function submitFormHandler(e) {
    // prevent refresh
    e.preventDefault();
    console.log("itemId", itemId);
    if (itemId.trim() === "add") {
      axios
        .post("http://localhost:4000/api/item", item)
        .then(function (response) {
          alert("Added successfully");
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .put("http://3.214.3.182:4000/api/item", item)
        .then(function (response) {
          alert("Updated successfully");
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  function onChangeHandler(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  return item ? (
    <Row>
      <Form onSubmit={submitFormHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            value={item.name}
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Control
            name="type"
            type="text"
            value={item.type}
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="text"
            value={item.price}
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Warranty</Form.Label>
          <Form.Control
            name="warranty"
            type="text"
            value={item.warranty}
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date of Manufacture</Form.Label>
          <Form.Control
            name="dateOfManufacture"
            type="date"
            value={item.dateOfManufacture}
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Row>
  ) : (
    "loading ..."
  );
}
