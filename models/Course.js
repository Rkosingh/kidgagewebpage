const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    durationUnit: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: true },
    feeAmount: { type: Number, required: true },
    feeType: { type: String, required: true },
    days: { type: [String], required: true },
    timeSlots: [{
        from: { type: String, required: true },
        to: { type: String, required: true }
    }],
    location: { type: String, required: true },
    hashtags: { type: [String], default: [] } // Add this field
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
