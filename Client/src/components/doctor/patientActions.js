import axios from 'axios';

export const UPDATE_PATIENT = 'UPDATE_PATIENT';

export const updatePatient = (patientId, updatedPatient) => async dispatch => {
    try {
      const res = await axios.patch(`/api/patient/${patientId}`, updatedPatient);
      dispatch({ type: UPDATE_PATIENT, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
  