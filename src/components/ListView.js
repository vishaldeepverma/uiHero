import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
const { Button, Table, Row, Col } = require("react-bootstrap");
const { useState, useEffect } = require("react");

function View() {
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://3.214.3.182:3000/api/item")
      .then(function ({ data }) {
        console.log(data);
        setData(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [data, setData] = useState([]);

  return (
    <div>
      <Row>
        <Col>
          <h1>List of items</h1>
        </Col>
      </Row>
      <Row>
        <Button
          onClick={() => {
            navigate(`/item/${"add"}`);
          }}
          variant="primary"
          size="sm"
        >
          Add Item
        </Button>
      </Row>
      <Row style={{ marginTop: 30 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Warranty</th>
              <th>Date of Manfacturing</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{element.name}</td>
                <td>{element.type}</td>
                <td>{element.price}</td>
                <td>{element.warranty}</td>
                <td>
                  {moment(element.dateOfManufacture).format("MM/DD/YYYY")}
                </td>

                <td>
                  <div
                    onClick={() => {
                      navigate(`/item/${element.id}`);
                    }}
                  >
                    <i style={{ cursor: "pointer" }} className="fa fa-edit" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </div>
  );
}

export default View;
