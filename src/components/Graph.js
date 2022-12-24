import React from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { isEmpty } from "lodash";
import {
  Modal,
  Row,
  Col,
  Image
} from "react-bootstrap";
import { jsonData as localJson } from "../data/data";

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      showModal: false,
      modalContent: ''
    };
    this.setShowModal = this.setShowModal.bind(this);
  }

  setShowModal(showModal, modalContent) {
    this.setState({
      showModal,
      modalContent
    });
  }

  componentDidMount() {
    const jsonData = JSON.parse(localStorage.getItem("jsonData")) || localJson;
    this.setState({
      elements: jsonData
    }, function () {
      this.cy.resize();
      this.cy.fit();

      this.cy.on('click', (e) => {
        // Remove all previously set highlight classes
        this.cy.elements().removeClass('highlight');
        // Below logic will execute only on the graph drawn area
        if(e.target !== this.cy){
          const sel = this.cy.$(`#${e.target.id()}`);
          if(sel.neighborhood('node').length > 0){
            sel.addClass('highlight').neighborhood('edge').addClass('highlight');
            sel.neighborhood('node').addClass('highlight');
          }
          e.target.id() === 'home' ? this.setShowModal(true, 'Text to show') : this.setShowModal(false, '');
        }
      });
    });
    // Highlight newly added node
    if(parseInt(localStorage.getItem("newlyAdded")) === 0){
      jsonData.forEach(data => {
          if(data.classes === 'new'){
            delete data.classes;
          }
        }
      );
      const dataStringfied = JSON.stringify(jsonData);
      localStorage.setItem("jsonData", dataStringfied);
    }
    localStorage.setItem("newlyAdded", 0);
  }

  render() {
    const style = [
      {
        selector: "node",
        style: {
          "background-color": "rgb(64, 169, 243)",
          "label": "data(label)",
          "text-valign": "center",
          "text-halign": "center",
          "shape": "rectangle",
          "width": 150,
          "z-index": 1
        }
      },
      {
        selector: "node[label]",
        style: {
          label: "data(label)"
        }
      },
      {
        selector: "#dataSvc node",
        style: {
          shape: "round-rectangle",
          width: 150
        }
      },
      {
        selector: "#extSvc node",
        style: {
          shape: "round-rectangle",
          width: 150
        }
      },
      {
        selector: ":parent",
        style: {
          "background-color": "#eee",
          "text-valign": "top",
          "text-halign": "left",
          "text-margin-x": "200px",
          color: "green",
          "z-index": 2
        }
      },
      {
        selector: "#extSvc",
        style: {
          "background-color": "#eafeea",
          "text-margin-x": "130px"
        }
      },
      {
        selector: "#pages",
        style: {
          "text-halign": "left",
          "text-margin-x": "60px"
        }
      },
      {
        selector: "#dataSvc",
        style: {
          "text-halign": "left",
          "text-margin-x": "120px"
        }
      },
      {
        selector: "#eCommerce",
        style: {
          "text-halign": "left",
          "text-margin-x": "100px",
          "background-color": "#e5f0ff"
        }
      },
      {
        selector: "edge",
        style: {
          width: 2,
          "line-color": "#bbb",
          "curve-style": "taxi",
          "taxi-direction": "vertical"
        }
      },
      {
        selector: "edge[type='DB']",
        style: {
          width: 2,
          "line-color": "#bbb",
          "target-arrow-color": "#bbb",
          "target-arrow-shape": "triangle",
          "curve-style": "taxi",
          "taxi-direction": "vertical"
        }
      },
      {
        selector: "edge[type='DB2']",
        style: {
          width: 2,
          "line-color": "#bbb",
          "target-arrow-color": "#bbb",
          "target-arrow-shape": "triangle",
          "source-arrow-color": "#bbb",
          "source-arrow-shape": "triangle",
          "curve-style": "taxi"
        }
      },
      {
        selector: "edge[label]",
        style: {
          label: "data(label)",
          width: 2,
          color: "blue",
          "z-index": 1
        }
      },
      {
        selector: ".top-left",
        style: {
          "text-valign": "top",
          "text-halign": "left"
        }
      },

      {
        selector: ".top-center",
        style: {
          "text-valign": "top",
          "text-halign": "center"
        }
      },

      {
        selector: ".top-right",
        style: {
          "text-valign": "top",
          "text-halign": "right"
        }
      },

      {
        selector: ".center-left",
        style: {
          "text-valign": "center",
          "text-halign": "left"
        }
      },

      {
        selector: ".center-center",
        style: {
          "text-valign": "center",
          "text-halign": "center"
        }
      },

      {
        selector: ".center-right",
        style: {
          "text-valign": "center",
          "text-halign": "right"
        }
      },

      {
        selector: ".bottom-left",
        style: {
          "text-valign": "bottom",
          "text-halign": "left"
        }
      },

      {
        selector: ".bottom-center",
        style: {
          "text-valign": "bottom",
          "text-halign": "center"
        }
      },

      {
        selector: ".bottom-right",
        style: {
          "text-valign": "bottom",
          "text-halign": "right"
        }
      },
      {
        selector: "node.highlight",
        style: {
          "background-color": "rgb(0, 117, 186)",
          "color": "#fff",
          "border-color": "rgb(101, 196, 255)",
          "border-width": "1px",
          "font-weight": "bold"
        }
      },
      {
        selector: "edge.highlight",
        style: {
          "line-color": "rgb(134, 134, 134)",
          "width": "4px"
        }
      },
      {
        selector: "node.new",
        style: {
          "background-color": "green",
          "color": "#fff",
          "font-weight": "bold"
        }
      },
      {
        selector: "node.db",
        style: {
          "background-image": "/img/database.png",
          "background-width": "100%",
          "background-height": "100%",
          "background-opacity": "0",
          "width": "100px",
          "height": "80px"
        }
      },
    ];

    return isEmpty(this.state.elements) ? (
      <h4>No Data Found</h4>
    ) : (
        <div className="graph">
          <Modal
            className="right"
            show={this.state.showModal}
            onHide={() => this.setShowModal(false, '')}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              Service Details
            </Modal.Header>
            <Modal.Body style={{'overflow-y': 'auto'}}>
              <Row>
                <Col>
                  <Image src="img/thumbnail_image001.png" thumbnail />
                </Col>
              </Row>
              <br/>
              <Row>
                <Col>
                  <Image src="img/thumbnail_image002.png" thumbnail />
                </Col>
              </Row>
              <br/>
              <Row>
                <Col>
                  <Image src="img/thumbnail_image003.png" thumbnail />
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
          <CytoscapeComponent
            elements={this.state.elements}
            style={{ width: "100%", height: "500px" }}
            stylesheet={style}
            cy={cy => {
              this.cy = cy;
            }}
            layout={{
              name: "preset"
            }}
            zoom={0.8}
            pan={{ x: 0, y: 0 }}
            zoomingEnabled={false}
            userZoomingEnabled={false}
            panningEnabled={false}
            userPanningEnabled={false}
            boxSelectionEnabled={false}
            autoungrabify={true}
          />
        </div>
      );
  }
}
