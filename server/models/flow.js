const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const nodeSchema = new Schema({
    id: { type: String, required: true },
    type: { type: String, required: true },
    data: { type: Object, required: true },
    position: { type: Object, required: true },
});

const edgeSchema = new Schema({
    id: { type: String, required: true },
    source: { type: String, required: true },
    target: { type: String, required: true },
});

const flowSchema = new Schema({
    name: { type: String, required: true },
    nodes: [nodeSchema],
    edges: [edgeSchema],
    folder: { type: String, default: 'Default' }
});

const Flow = mongoose.model('Flow', flowSchema);

module.exports = Flow;
