const express = require('express');
const router = express.Router();
const visitService = require('../services/visitService'); // Adjust the path as per your project structure
const { authenticateToken } = require('../middleware/auth');

// Route to create a new visit
router.post('/create', authenticateToken, async (req, res) => {
    try {
        const visitData = req.body;
        const newVisit = await visitService.createVisit(visitData);
        res.status(201).json({
            message: 'Visit created successfully',
            data: newVisit,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating visit',
            error: error.message,
        });
    }
});

// Route to get all visits
router.get('/getall', authenticateToken, async (req, res) => {
    try {
        const visits = await visitService.getAllVisits();
        res.status(200).json({
            message: 'Visits retrieved successfully',
            data: visits,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving visits',
            error: error.message,
        });
    }
});

// Route to fetch a visit by ID
router.get('/get/:id', authenticateToken, async (req, res) => {
    try {
        const visitId = req.params.id;
        const visit = await visitService.getVisitById(visitId);
        if (!visit) {
            return res.status(404).json({ message: 'Visit not found' });
        }
        res.status(200).json({
            message: 'Visit retrieved successfully',
            data: visit,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving visit',
            error: error.message,
        });
    }
});

// Route to fetch visits by client ID
router.get('/client/:clientId', authenticateToken, async (req, res) => {
    try {
        const clientId = req.params.clientId;
        const visits = await visitService.getVisitsByClientId(clientId);
        res.status(200).json({
            message: 'Visits for client retrieved successfully',
            data: visits,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving visits for client',
            error: error.message,
        });
    }
});




// Route to fetch visits by client ID
router.get('/emplyeeid/:employeeid', authenticateToken, async (req, res) => {
    try {
        const employeeid = req.params.employeeid;
        const visits = await visitService.getVisitsByEmployeeid(employeeid);
        res.status(200).json({
            message: 'Visits for employee retrieved successfully',
            data: visits,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving visits for client',
            error: error.message,
        });
    }
});


// Route to fetch visits by client ID and Date of Visit
router.get('/client/:clientId/date', authenticateToken, async (req, res) => {
    try {
        const { clientId } = req.params;
        const { DateOfVisit } = req.query; // DateOfVisit is expected as a query parameter
        const visits = await visitService.getVisitsByClientIdAndDate(clientId, DateOfVisit);
        res.status(200).json({
            message: 'Visits for client on specified date retrieved successfully',
            data: visits,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving visits for client on specified date',
            error: error.message,
        });
    }
});

// Route to fetch visits by employee ID and Date of Visit
router.get('/employee/:employeeId/date', authenticateToken, async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { DateOfVisit } = req.query; // DateOfVisit is expected as a query parameter
        const visits = await visitService.getVisitsByEmployeeIdAndDate(employeeId, DateOfVisit);
        res.status(200).json({
            message: 'Visits for employee on specified date retrieved successfully',
            data: visits,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving visits for employee on specified date',
            error: error.message,
        });
    }
});



// Route to update a visit
router.put('/update/:id', authenticateToken, async (req, res) => {
    try {
        const visitId = req.params.id;
        const updateData = req.body;
        const updatedVisit = await visitService.updateVisit(visitId, updateData);
        if (!updatedVisit) {
            return res.status(404).json({ message: 'Visit not found' });
        }
        res.status(200).json({
            message: 'Visit updated successfully',
            data: updatedVisit,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating visit',
            error: error.message,
        });
    }
});

// Route to delete a visit
router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        const visitId = req.params.id;
        const deletedVisit = await visitService.deleteVisit(visitId);
        if (!deletedVisit) {
            return res.status(404).json({ message: 'Visit not found' });
        }
        res.status(200).json({
            message: 'Visit deleted successfully',
            data: deletedVisit,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting visit',
            error: error.message,
        });
    }
});

module.exports = router;