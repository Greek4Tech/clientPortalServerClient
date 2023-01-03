const Patient = require('../models/Patient');
const validator = require('validator')

module.exports = {
  getPatients: async (req, res) => {
    // console.log(req.user)
    try {
      const Patients = await Patient.find({ userId: req.user.id });
      console.log(Patients, { userId: req.user.id })
      const PatientsLeft = await Patient.countDocuments({
        userId: req.user.id,
        completed: false,
      });
      // console.log(Patients)
      res.render('Patients.ejs', {
        Patients: Patients,
        // left: PatientsLeft,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getPatientPage: async (req, res) => {
    const PatientId = req.params.PatientId;
    try {
      const Patient = await Patient.find({ _id: PatientId });
      res.render('Patient.ejs', { Patient: Patient[0] });
    } catch (err) {
      console.log(err);
    }
  },
  createPatient: async (req, res) => {
    try {
      await Patient.create({
        name: req.body.PatientName,
        phone: req.body.phoneNumber,
        completed: false,
        userId: req.user.id,
      });
      console.log('Patient has been added');
      res.redirect('/Patients');
    } catch (err) {
      console.log(err);
    }
  },
  editPatient: async (req, res) => {
    try {
      await Patient.findOneAndUpdate(
        { _id: req.body.PatientIdFromJSFile },
        {
          name: req.body.PatientName,
          phone: req.body.phoneNumber,
        }
      );
      console.log('Updated');
      res.json('updated');
    } catch (err) {
      console.log(err);
    }
  },
  markComplete: async (req, res) => {
    try {
      await Patient.findOneAndUpdate(
        { _id: req.body.PatientIdFromJSFile },
        {
          completed: true,
        }
      );
      console.log('Marked Complete');
      res.json('Marked Complete');
    } catch (err) {
      console.log(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Patient.findOneAndUpdate(
        { _id: req.body.PatientIdFromJSFile },
        {
          completed: false,
        }
      );
      console.log('Marked Incomplete');
      res.json('Marked Incomplete');
    } catch (err) {
      console.log(err);
    }
  },
  deletePatient: async (req, res) => {
    console.log('Deleting Patient');
    console.log(req.body);
    console.log(req.body.PatientIdFromJSFile);
    try {
      await Patient.findOneAndDelete({ _id: req.body.PatientIdFromJSFile });
      console.log('Deleted Patient');
      res.json('Deleted It');
    } catch (err) {
      console.log(err);
    }
  },
};
