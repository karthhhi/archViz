import React, { Component } from "react";
import Select from "react-select";
import { jsonData as localJson } from "../data/data";
import {
  getAllParentCategories,
  getAllServices,
  getFilteredData,
  getServiceConnections,
  getSelectedCategory,
  getRenderedPositions,
  changeServiceName,
  changeParentService,
  changeServicePosition,
  deleteConnection,
  generateXYCordinates,
  deleteService,
  deleteServiceCategory
} from "./utils";
import {
  Form,
  Container,
  Row,
  Col,
  Button,
  ButtonToolbar,
  Alert
} from "react-bootstrap";
import { isEmpty } from "lodash";
import ServicesTable from "./ServicesTable";

export default class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceType: "newService",
      jsonData: [],
      selectedService: [],
      parentOptions: [],
      parentOptionsWithoutSubParent: [],
      serviceOptions: [],
      filteredOptions: [],
      slctdCategory: [],
      positionObj: {},
      serviceName: '',
      editServiceName: '',
      slctObj: {},
      slctdCategoryObj: {},
      isServiceCategory: false,
      showAlert: false
    };
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onConnectionChange = this.onConnectionChange.bind(this);
    this.changePositionX = this.changePositionX.bind(this);
    this.changePositionY = this.changePositionY.bind(this);
    this.onChangeElement = this.onChangeElement.bind(this);
    this.onChangeElementCategory = this.onChangeElementCategory.bind(this);
    this.onChangeTxt = this.onChangeTxt.bind(this);
    this.onServiveCategoryCheck = this.onServiveCategoryCheck.bind(this);
    this.saveData = this.saveData.bind(this);
    this.invokeDeltService = this.invokeDeltService.bind(this);
    this.setShowAlert = this.setShowAlert.bind(this);
    this.defltSlctdconct = [];
  }
  componentDidMount() {
    const jsonData = JSON.parse(localStorage.getItem("jsonData")) || localJson;
    const parentOptions = getAllParentCategories(jsonData);
    const parentOptionsWithoutSubParent = getAllParentCategories(jsonData, true);
    const serviceOptions = getAllServices(jsonData);
    this.setState({
      parentOptions,
      parentOptionsWithoutSubParent,
      serviceOptions,
      filteredOptions: serviceOptions,
      jsonData
    });
  }
  onChangeTxt(event) {
    const { value } = event.target
    if (this.state.serviceType === 'editService') {
      this.setState({
        editServiceName: value
      })
    } else {
      this.setState({
        serviceName: event.target.value
      })
    }
  }
  handleServiceChange(data, value, slctObj) {
    let jsonData = changeServiceName(data, value, slctObj)
    this.setState({
      jsonData
    })
  }
  onCategoryChange(selected) {
    this.setState({
      slctdCategory: [{ label: selected.label, value: selected.value }]
    });
    // Pre poppulate ideal positions based on parent
    const { x, y } = generateXYCordinates(selected.value, this.state.jsonData);
    this.setState({
      positionObj: {
        x, y
      }
    });
  }

  onChangeElementCategory(selected) {
    const { jsonData } = this.state;
    const getSlctdCategory = getSelectedCategory(jsonData, selected);
    const parentOptionsWithoutSubParent = getAllParentCategories(jsonData, true, selected.value);
    this.setState({
      editServiceName: selected.label,
      isServiceCategory: true,
      slctdCategory: getSlctdCategory,
      serviceType: 'editService',
      slctdCategoryObj: selected,
      parentOptionsWithoutSubParent
    });
  }

  onChangeElement(selected) {
    const { jsonData, serviceOptions } = this.state;
    const filteredData = getFilteredData(
      this.state.serviceOptions,
      selected.value
    );
    const getConnections = getServiceConnections(
      jsonData, serviceOptions,
      selected
    );
    const getSlctdCategory = getSelectedCategory(jsonData, selected);

    const getPosition = getRenderedPositions(jsonData, selected);
    this.defltSlctdconct = getConnections;
    this.setState({
      selectedService: getConnections,
      filteredOptions: filteredData,
      slctdCategory: getSlctdCategory,
      positionObj: getPosition,
      editServiceName: selected.label,
      serviceType: 'editService',
      slctObj: selected,
      isServiceCategory: false
    });
  }
  onConnectionChange(selected) {
    this.setState({
      selectedService: selected
    });
  }
  changePositionX(event) {
    this.setState({
      positionObj: {
        x: event.target.value,
        y: this.state.positionObj["y"]
      }
    });
  }

  changePositionY(event) {
    this.setState({
      positionObj: {
        x: this.state.positionObj["x"],
        y: event.target.value
      }
    });
  }
  comparer = (otherArray) => {
    return function (current) {
      return otherArray.filter(function (other) {
        return other.value === current.value
      }).length === 0;
    }
  }

  onServiveCategoryCheck(event) {
    const { checked } = event.target;
    this.setState({
      isServiceCategory: checked
    });
  }

  generateId(name) {
    return `${name.toLowerCase().replace(/\s/g, "")}-${Date.now()}`;
  }

  saveData(data) {
    const dataStringfied = JSON.stringify(data);
    localStorage.setItem("jsonData", dataStringfied);
    this.setState({
      jsonData: data
    }, () => window.location.href = "/");
  }

  setShowAlert(val){
    this.setState({
      showAlert: val
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // Service Category
    if (this.state.isServiceCategory) {
      // Add Service Category
      if (event.target.elements.serviceName && event.target.elements.serviceName.value) {
        const serviceCategoryId = this.generateId(event.target.elements.serviceName.value);
        const serviceCategoryData = {
          data: {
            id: serviceCategoryId,
            label: event.target.elements.serviceName.value,
            ...(this.state.slctdCategory[0] && { parent: this.state.slctdCategory[0].value })
          }
        };
        // Save final data
        this.saveData([
          ...this.state.jsonData,
          serviceCategoryData,
        ]);
      }
      // Edit Service Category
      if (event.target.elements.editServiceName && event.target.elements.editServiceName.value) {
        const { jsonData, slctdCategoryObj, editServiceName, slctdCategory } = this.state;
        let data = changeServiceName(jsonData, editServiceName, slctdCategoryObj);
        if(slctdCategory[0]){
          data = changeParentService(data, slctdCategory[0].value, slctdCategoryObj);
        }
        this.saveData(data);
      }
    } else {
      // Service section
      // Add Service
      if (event.target.elements.serviceName && event.target.elements.serviceName.value) {
        let connectionData = [];
        const serviceId = this.generateId(event.target.elements.serviceName.value);
        const serviceData = {
          data: {
            id: serviceId,
            label: event.target.elements.serviceName.value,
            parent: this.state.slctdCategory[0].value
          },
          renderedPosition: {
            x: event.target.elements.positionX.value,
            y: event.target.elements.positionY.value
          },
          classes: 'new'
        };
        if (!isEmpty(this.state.selectedService)) {
          this.state.selectedService.forEach(val => {
            connectionData.push({
              data: {
                id: `${serviceId}-${val.value}`,
                source: serviceId,
                target: val.value
              }
            });
          });
        }
        // Save final data
        const finalData = [
          ...this.state.jsonData,
          serviceData,
          ...connectionData
        ];
        this.saveData(finalData);
        localStorage.setItem("newlyAdded", 1);
      }
      // Edit Service
      if (event.target.elements.editServiceName && event.target.elements.editServiceName.value) {
        const { jsonData, slctObj, editServiceName, slctdCategory, selectedService } = this.state;
        const renderedPosition = {
          x: event.target.elements.positionX.value,
          y: event.target.elements.positionY.value
        };
        let data = changeServiceName(jsonData, editServiceName, slctObj)
        let changeParent = slctdCategory[0].value;
        if (changeParent !== slctObj.parent) {
          data = changeParentService(data, changeParent, slctObj)
        }
        data = changeServicePosition(data, renderedPosition, slctObj)
        let deleted = this.defltSlctdconct.filter(this.comparer(selectedService))
        let updated = selectedService.filter(this.comparer(this.defltSlctdconct))
        if (deleted.length > 0) {
          data = deleteConnection(data, deleted, slctObj.value)
        }
        if (updated.length > 0) {
          updated.forEach(val => {
            data.push({
              data: {
                id: `${slctObj.value}-${val.value}`,
                source: slctObj.value,
                target: val.value
              }
            });
          });
        }
        this.saveData(data);
      }
    }
    window.location.href = "/";
  }

  invokeDeltService(id, type) {
    const { jsonData } = this.state;
    let modifiedData = {};
    if(type === 'service') {
      // delete Service
      modifiedData = deleteService(jsonData,id);
    } else {
      // delete service category
      modifiedData = deleteServiceCategory(jsonData,id);
    }
    if(!modifiedData){
      this.setShowAlert(true);
    } else {
      this.saveData(modifiedData)
    }
  }

  render() {
    if (!this.state.parentOptions.length) {
      return <div>Please wait data is getting loaded</div>;
    }
    return (
      <Container>
        {
          this.state.showAlert && 
            <Alert variant="danger" onClose={() => this.setShowAlert(false)} dismissible>
              <p>
                Cannot delete service category which has child Service(s)/Categories. Please delete
                all the child Service(s)/Categories before deleting this category.           
              </p>
            </Alert>
        }
        <Row>
          <Col xs={4}>
            <ServicesTable
              title={'e-commerce Layers'}
              type={'category'}
              dataFormatter={getAllParentCategories}
              onChangeElement={this.onChangeElementCategory}
              data={this.state.jsonData}
              invokeDeltService={this.invokeDeltService}
            />
            <ServicesTable
              title={'Application/Services'}
              type={'service'}
              dataFormatter={getAllServices}
              onChangeElement={this.onChangeElement}
              data={this.state.jsonData}
              invokeDeltService={this.invokeDeltService}
            />
          </Col>
          <Col xs={8}>

            <h5>Service Details</h5>
            <hr />
            <Form onSubmit={e => this.handleSubmit(e)}>
              {this.state.serviceType === "newService" ? (
                <Form.Group>
                  <Form.Label>Service Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="serviceName"
                    value={this.state.serviceName}
                    onChange={this.onChangeTxt}
                  />
                </Form.Group>
              ) : (
                  <Form.Group>
                    <Form.Label>Edit The Service</Form.Label>
                    <Form.Control
                      type="text"
                      name="editServiceName"
                      value={this.state.editServiceName}
                      onChange={this.onChangeTxt}
                    />
                  </Form.Group>
                )}
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Add as a Layer/Container"
                  checked={this.state.isServiceCategory}
                  onChange={this.onServiveCategoryCheck}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Service Category</Form.Label>
                {this.state.isServiceCategory === true ? (
                  <Select
                    options={this.state.parentOptionsWithoutSubParent}
                    onChange={this.onCategoryChange}
                    value={this.state.slctdCategory}
                  />) : (
                    <Select
                      options={this.state.parentOptions}
                      onChange={this.onCategoryChange}
                      value={this.state.slctdCategory}
                    />
                  )}
              </Form.Group>
              {!this.state.isServiceCategory &&
                <div>
                  <Form.Group>
                    <Form.Label>Position</Form.Label>
                    <Row className="justify-content-md-center">
                      <Col>x</Col>
                      <Col>
                        <Form.Control
                          type="text"
                          name="positionX"
                          value={this.state.positionObj["x"] || ""}
                          onChange={this.changePositionX}
                        />
                      </Col>
                      <Col xs={3}>&nbsp;</Col>
                      <Col>Y</Col>
                      <Col>
                        <Form.Control
                          type="text"
                          name="positionY"
                          value={this.state.positionObj["y"] || ""}
                          onChange={this.changePositionY}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                  <br />
                  <h5>Service Connections</h5>
                  <hr />
                  <Select
                    options={this.state.filteredOptions}
                    value={this.state.selectedService}
                    isMulti
                    isClearable={true}
                    onChange={this.onConnectionChange}
                  />
                </div>
              }
              <Row className="bottom-section float-right">
                <ButtonToolbar>
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    variant="danger"
                    onClick={() => {
                      return window.location.reload();
                    }}
                  >
                    Reset
                  </Button>
                </ButtonToolbar>
              </Row>
            </Form>
          </Col>
        </Row>
        <br/>
      </Container>
    );
  }
}
