require('dotenv').config();
const User = require('../models/user');
const Airport = require('../models/airport');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Controller logic
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

exports.createUser = async (req, res) => {
  try {

    const newUser = new User(req.body);
    const savedUser = await newUser.save();
   
    // Update airport arrays for controller or pilot roles
    if (savedUser.airportCode) {
      const updateField = savedUser.role === 'controller' ? 'controllers' : 'pilots';
     
      await Airport.findOneAndUpdate(
        { code: savedUser.airportCode },
        { $addToSet: { [updateField]: savedUser._id } }
      );
    }

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });


    const updateData = { ...req.body };

    // Handle nested fields for certification
    if (req.body.certificationLevel) {
      updateData['certification.level'] = req.body.certificationLevel;
      delete updateData.certificationLevel;
    }
    if (req.body.certificationDateIssued) {
      updateData['certification.dateIssued'] = req.body.certificationDateIssued;
      delete updateData.certificationDateIssued;
    }
    if (req.body.certificateUrl) {
      updateData['certification.certificateUrl'] = req.body.certificateUrl;
      delete updateData.certificateUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });

    // Update airport arrays for controllers or pilots
    if (updatedUser.airportCode) {
      const roleField = updatedUser.role === 'controller' ? 'controllers' : 'pilots';

      // Remove the user from the old airport array if airportCode changed
      if (user.airportCode && user.airportCode !== updatedUser.airportCode) {
        await Airport.findOneAndUpdate(
          { code: user.airportCode },
          { $pull: { [roleField]: user._id } }
        );
      }

      // Add the user to the new airport array
      await Airport.findOneAndUpdate(
        { code: updatedUser.airportCode },
        { $addToSet: { [roleField]: updatedUser._id } }
      );
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Remove the user from the airport's array (controllers or pilots)
    if (user.airportCode) {
      const roleField = user.role === 'controller' ? 'controllers' : 'pilots';
      await Airport.findOneAndUpdate(
        { code: user.airportCode },
        { $pull: { [roleField]: user._id } }
      );
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

// Manage ctests 
exports.addTestToSchedule = async (req, res) => {
  const { id: userId } = req.params;
  const { testDate, testName } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Validate testDate and testName
    if (!testDate || !testName) {
      return res.status(400).json({ error: 'testDate and testName are required' });
    }

    // Prevent adding past dates
    if (new Date(testDate) < new Date()) {
      return res.status(400).json({ error: 'Test date must be in the future' });
    }

    const newTest = { testDate, testName };
    user.testSchedule.push(newTest);
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error adding test to schedule', details: err.message });
  }
};

exports.cancelScheduledTest = async (req, res) => {
  const { id: userId, testId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Remove the test from testSchedule
    user.testSchedule = user.testSchedule.filter(test => test._id.toString() !== testId);
    await user.save();

    res.status(200).json({ message: 'Scheduled test canceled successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error canceling scheduled test', details: err.message });
  }
};

exports.markTestAsCompleted = async (req, res) => {
  const { id: userId } = req.params;
  const { testId, resultLevel } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const testIndex = user.testSchedule.findIndex(test => test._id.toString() === testId);
    if (testIndex === -1) return res.status(404).json({ error: 'Test not found in schedule' });

    const completedTest = {
      testDate: user.testSchedule[testIndex].testDate,
      resultLevel,
    };

    // Move the test from schedule to history
    user.testHistory.push(completedTest);
    user.testSchedule.splice(testIndex, 1);

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error marking test as completed', details: err.message });
  }
};

