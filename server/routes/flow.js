const router = require('express').Router();
const Flow = require('../models/flow');

// Get all flows
router.route('/').get((req, res) => {
    Flow.find()
        .then(flows => res.json(flows))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get a specific flow by id
router.route('/:id').get((req, res) => {
    Flow.findById(req.params.id)
        .then(flow => res.json(flow))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new flow
router.route('/add').post((req, res) => {
    const { name, nodes, edges, folder } = req.body;

    // Validation
    if (!name || name.trim() === '') {
        return res.status(400).json('Error: Flow name is required');
    }

    const newFlow = new Flow({
        name,
        nodes: nodes || [],
        edges: edges || [],
        folder: folder || 'Default'
    });

    newFlow.save()
        .then(() => res.json('Flow added!'))
        .catch(err => {
            console.error('Database error when saving flow:', err);
            res.status(400).json('Error creating flow: ' + err.message);
        });
});

// Update a flow
router.route('/update/:id').post((req, res) => {
    Flow.findById(req.params.id)
        .then(flow => {
            flow.nodes = req.body.nodes;
            flow.edges = req.body.edges;

            flow.save()
                .then(() => res.json('Flow updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
