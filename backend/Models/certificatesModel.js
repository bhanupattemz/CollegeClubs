const mongoose = require('mongoose');

const CertificatesSchema = new mongoose.Schema({
    pdf: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Certificates = mongoose.model('Certificates', CertificatesSchema);
module.exports = Certificates;
