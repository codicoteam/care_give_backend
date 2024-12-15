const express = require('express');
const router = express.Router();
const adminService = require('../services/adminService'); // Adjust the path as per your project structure
const { authenticateToken } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Login route to authenticate admin and return JWT
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if admin exists
        const admin = await adminService.getAdminByEmail(email);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
console.log('Entered Password:', password);
console.log('Stored Hashed Password:', admin.email);
console.log('Password Validity:', isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            'codicoso2023', // Replace 'your_jwt_secret' with a secure key
            { expiresIn: '2h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});

// Route to handle admin signup
router.post('/signup', async (req, res) => {
    try {
        const adminData = req.body;

        // Hash the password before saving

        const newAdmin = await adminService.createAdmin(adminData);

        // Generate a token for the new admin
        const token = jwt.sign(
            { id: newAdmin._id, email: newAdmin.email },
            'codicoso2023', // Replace with a secure key
            { expiresIn: '2h' } // Token validity: 1 hour
        );

        res.status(201).json({
            message: 'Admin registered successfully',
            data: newAdmin,
            token,
        });
    } catch (error) {
        if (error.message === 'Email already exists') {
            return res.status(409).json({ message: 'Email already exists' });
        }
        res.status(400).json({ message: 'Error registering admin', error: error.message });
    }
});

// Route to fetch all admins (secured)
router.get('/getalladmins', authenticateToken, async (req, res) => {
    try {
        const admins = await adminService.getAllAdmins();
        res.status(200).json({ message: 'Admins retrieved successfully', data: admins });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving admins', error: error.message });
    }
});

// Route to fetch admin by email (secured)
router.get('/getadmin/:email', authenticateToken, async (req, res) => {
    try {
        const admin = await adminService.getAdminByEmail(req.params.email);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin retrieved successfully', data: admin });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving admin', error: error.message });
    }
});

// Route to update admin details (secured)
router.put('/updateadmin/:id', authenticateToken, async (req, res) => {
    try {
        const updatedAdmin = await adminService.updateAdmin(req.params.id, req.body);
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin updated successfully', data: updatedAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Error updating admin', error: error.message });
    }
});

// Route to delete an admin (secured)
router.delete('/deleteadmin/:id', authenticateToken, async (req, res) => {
    try {
        await adminService.deleteAdmin(req.params.id);
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admin', error: error.message });
    }
});

module.exports = router;
