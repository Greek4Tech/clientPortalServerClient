export function updatePatient(patientId, updatedPatient) {
    return {
        type: 'UPDATE_PATIENT',
        patientId: patientId,
        updatedPatient: updatedPatient
    }
}
