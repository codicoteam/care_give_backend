const Visit = require('../models/visit/visit_schema'); // Adjust the path as per your project structure

// Service to create a new visit
const createVisit = async (visitData) => {
    try {
        const newVisit = new Visit(visitData);
        await newVisit.save();
        return newVisit;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get all visits
const getAllVisits = async () => {
    try {
        const visits = await Visit.find()
            .populate('clientId')
            .populate('careProfessionalId');
        return visits;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch a visit by ID
const getVisitById = async (id) => {
    try {
        const visit = await Visit.findById(id)
            .populate('clientId')
            .populate('careProfessionalId');
        if (!visit) {
            throw new Error('Visit not found');
        }
        return visit;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch visits by client ID
const getVisitsByClientId = async (clientId) => {
    try {
        const visits = await Visit.find({ clientId })
            .populate('clientId')
            .populate('careProfessionalId');
        return visits;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch visits by client ID
const getVisitsByEmployeeid = async (careProfessionalId) => {
    try {
        const visits = await Visit.find({ careProfessionalId })
            .populate('clientId')
            .populate('careProfessionalId');
        return visits;
    } catch (error) {
        throw new Error(error.message);
    }
};


// Service to update a visit
const updateVisit = async (id, updateData) => {
    try {
        const updatedVisit = await Visit.findByIdAndUpdate(id, updateData, { new: true })
            .populate('clientId')
            .populate('careProfessionalId');
        if (!updatedVisit) {
            throw new Error('Visit not found');
        }
        return updatedVisit;
    } catch (error) {
        throw new Error(error.message);
    }
};


const getVisitsByClientIdAndDate = async (clientId, DateOfVisit) => {
    try {
        const visits = await Visit.find({ clientId, DateOfVisit })
            .populate('clientId')
            .populate('careProfessionalId');
        return visits;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getVisitsByEmployeeIdAndDate = async (careProfessionalId, DateOfVisit) => {
    try {
        const visits = await Visit.find({ careProfessionalId, DateOfVisit })
            .populate('clientId')
            .populate('careProfessionalId');
        return visits;
    } catch (error) {
        throw new Error(error.message);
    }
};


const getAllVisitswithPagination = async (page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit; // Calculate the number of documents to skip
        const visits = await Visit.find()
            .populate('clientId')
            .populate('careProfessionalId')
            .skip(skip)
            .limit(limit);

        const totalVisits = await Visit.countDocuments(); // Get the total number of documents
        return {
            visits,
            totalVisits,
            currentPage: page,
            totalPages: Math.ceil(totalVisits / limit),
        };
    } catch (error) {
        throw new Error(error.message);
    }
};





// Service to delete a visit
const deleteVisit = async (id) => {
    try {
        const deletedVisit = await Visit.findByIdAndDelete(id);
        if (!deletedVisit) {
            throw new Error('Visit not found');
        }
        return deletedVisit;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to filter visits by date range using startTime
const getVisitsByDateRange = async (startDate, endDate) => {
    try {
        // Convert dates to proper Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        const visits = await Visit.find({
            startTime: {
                $gte: start, // Greater than or equal to start date
                $lte: end,   // Less than or equal to end date
            },
        })
        .populate('clientId')
        .populate('careProfessionalId');

        return visits;
    } catch (error) {
        throw new Error(error.message);
    }
};



const getVisitsByEmployeeIdAndDateRange = async (employeeId, startDate, endDate) => {
    try {
        // Convert dates to proper Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        const visits = await Visit.find({
            careProfessionalId: employeeId, // Filter by careProfessionalId (EmployeeId)
            startTime: {
                $gte: start, // Greater than or equal to start date
                $lte: end,   // Less than or equal to end date
            },
        })
        .populate('clientId')
        .populate('careProfessionalId');

        return visits;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to filter visits by ClientId and DateRange
const getVisitsByClientIdAndDateRange = async (clientId, startDate, endDate) => {
    try {
        // Convert dates to proper Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        const visits = await Visit.find({
            clientId: clientId, // Filter by clientId
            startTime: {
                $gte: start, // Greater than or equal to start date
                $lte: end,   // Less than or equal to end date
            },
        })
        .populate('clientId')
        .populate('careProfessionalId');

        return visits;
    } catch (error) {
        throw new Error(error.message);
    }
};




module.exports = {
    createVisit,
    getAllVisits,
    getVisitById,
    getVisitsByClientId,
    updateVisit,
    getVisitsByClientIdAndDate,
    getVisitsByEmployeeIdAndDate,
    getVisitsByEmployeeid,
    getAllVisitswithPagination,
    deleteVisit,
    getVisitsByDateRange,
    getVisitsByClientIdAndDateRange,
    getVisitsByEmployeeIdAndDateRange
};
