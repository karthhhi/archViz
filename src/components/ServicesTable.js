import React from "react";
import { isEmpty } from "lodash";
import { Table, Button, Modal, ButtonToolbar } from "react-bootstrap";

export default class ServicesTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      selectedId: ''
    }
    this.openConfirmationBox = this.openConfirmationBox.bind(this);
    this.removeSelection = this.removeSelection.bind(this);
  }

  onClickElement = (slctObj) => (e) => {
    this.props.onChangeElement(slctObj)
  }
  removeSelection = (isProceed)  => {
    this.setState({
      showModal:false    
    }, () => {
      if(isProceed) {
        this.props.invokeDeltService(this.state.selectedId, this.props.type)
      }
    })
  }
  openConfirmationBox = (showModal, selectedId='') => (e) => {
    e.stopPropagation()    
    this.setState({
      showModal,
      selectedId
    });
  }

  render() {
    const { data, dataFormatter } = this.props;
    return (
      <React.Fragment>
        <Modal
          show={this.state.showModal}
          onHide={() => this.openConfirmationBox(false)}
          className="confirm-box"
        >
          <Modal.Header closeButton>
            Delete Confirmation
          </Modal.Header>
          <Modal.Body>Do you really want to delete the selected item?</Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button 
                variant="primary"
                onClick={() => this.removeSelection(true)}
              >
                Proceed
              </Button>
              &nbsp;&nbsp;
              <Button
                variant="danger"
                onClick={() => this.removeSelection(false)}
              >
                Cancel
              </Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
        <Table striped bordered hover className="service-table">
          <thead>
            <tr>
              <th>{this.props.title}</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(dataFormatter(data)) &&
              dataFormatter(data).map((obj) => {
                if (!obj.options) {
                  return (
                    <tr key={obj.value}>
                      <td onClick={this.onClickElement(obj)}>
                        {obj.label}
                        <Button
                          className="close-btn close"
                          onClick={this.openConfirmationBox(true, obj.value) }
                          >
                          X
                        </Button>              
                      </td>
                    </tr>
                  );
                } else {
                  return obj.options.map((childObj) => {
                    return (
                      <tr key={childObj.value}>
                        <td onClick={this.onClickElement(childObj)}>
                          {childObj.label}
                          <Button
                            className="close-btn close"
                            onClick={this.openConfirmationBox(true, childObj.value) }
                            >
                            X
                          </Button>    
                        </td>
                      </tr>
                    );
                  }
                  );
                }
              })}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}
