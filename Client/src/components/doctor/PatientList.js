import React from "react";
import { connect } from "react-redux";
import { List, Avatar, Modal, Button } from "antd";

class PatientList extends React.Component {
  // This Component declares a `state` object with fields for storing patient information. This state will be used to populate the modal that appears when a patient is selected from the list. 
  state = {
    visible: false,
    name: "",
    email: "",
    age: "",
    gender: "",
    date_of_birth: "",
    date_of_last_visit: "",
    symptoms: "",
    medicines: ""
  };
  // the Component then defines several functions
  // `showModal` This function is passed as an event handler to the list items. When an item is clicked, it filters the list of patients stored in the component's props to find the patient whose email matches the `id` of the clicked element, and then updates the component's state with the selected patient's information displayed inside.
  
  showModal = event => {
    console.log(event.target.id)
    const modalData = this.props.patients.filter(
      patient => patient.email == event.target.id
    );
    this.setState({
      visible: true,
      name: modalData[0].name,
      email: modalData[0].email,
      age: modalData[0].age,
      gender: modalData[0].gender,
      date_of_birth: modalData[0].date_of_birth,
      date_of_last_visit: modalData[0].date_of_last_visit,
      symptoms: modalData[0].symptoms,
      medicines: modalData[0].medicines
    });
  };
  

  // This function is a lifecycle method that is called when the component is mounted (i.e. inserted into the DOM). It makes a GET request to the `api/patients` endpoint to fetch a list of patients. I then dispatches an `upsert` action for each patient, which updates the Redux store with the patient data. 
  componentDidMount = () => {
    fetch("/api/patients").then(response => {
      return response.json()
    }).then(data => {
      // dispatch 
      for (let i=0; i<data.patients.length; i++){
        this.props.upsert(data.patients[i]) 
      }
    })
  };
  // `handleOk` and `handleCancel`: These function as past as event handlers to the modal and are called when the modal's "OK" and "Cancel" buttons are clicked, respectively. They simply update the component's state to hide the modal. 
  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  // handleDelete: This function is passed as an event handler to the list items and is called when the "Delete" link is clicked. It dispatches a delete_patient action with the id of the clicked element, which removes the patient from the Redux store.
  handleDelete = event => {
    this.props.delete_patient(event.target.id);
  };
  // In order to store the changes made to the patient's chart, you will need to make a PUT or PATCH request to the MongoDB server to update the patient's information.
  handleEdit = event => {
    this.props.history.push("/edit/" + event.target.id);
  };
  render() {
    const symptoms = [...this.state.symptoms];
    const medicines = [...this.state.medicines];
    const { patients } = this.props;
    console.log(this.props)
    return (
      <div>
        {/* Ant Design's List component */}
        <List
          className="demo-loadmore-list custom-list"
          itemLayout="horizontal"
          dataSource={patients}
          renderItem={item => (
            <List.Item
              actions={[
                <a id={item.email} onClick={this.handleEdit}>
                  Edit
                </a>,
                <a id={item.email} onClick={this.handleDelete}>
                  Delete
                </a>,
                <a id={item.email} onClick={this.showModal}>
                  View
                </a>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src="" />}
                title={<a href="https://ant.design">{item.name}</a>}
                description={"Gender: " + item.gender}
              />
            </List.Item>
          )}
        />
        {/* modal is created using Ant Design's Modal component. */}
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>
            <strong>Name: </strong>
            {this.state.name}
          </p>
          <p>
            <strong>Age: </strong>
            {this.state.age}
          </p>
          <p>
            <strong>Email: </strong>
            {this.state.email}
          </p>
          <p>
            <strong>Gender: </strong>
            {this.state.gender}
          </p>
          <p>
            <strong>DOB: </strong> {this.state.date_of_birth}
          </p>
          <p>
            <strong>Last Visited: </strong>
            {this.state.date_of_last_visit}
          </p>
          <p>
            <strong>Symptoms : </strong>
            {symptoms.map(a => a.value).toString()}
          </p>
          <p>
            <strong>Medicines : </strong>
            {medicines.map(a => a.meds).toString()}
          </p>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    patients: state.patients.patients
  };
};

const mapPropsToState = dispatch => {
  return {
    delete_patient: data => {
      dispatch({ type: "DELETE_PATIENT", data: data });
    },
    upsert: data => {
      dispatch({ type: "UPSERT", data: data });
    }
  };
};



export default connect(mapStateToProps, mapPropsToState)(PatientList);
