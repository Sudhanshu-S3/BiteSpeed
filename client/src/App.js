import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, useNodesState, useEdgesState, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import axios from 'axios';

import NodesPanel from './components/NodesPanel';
import SettingsPanel from './components/SettingsPanel';
import TextNode from './components/TextNode';
import ImageNode from './components/ImageNode';
import TableNode from './components/TableNode';
import ButtonNode from './components/ButtonNode';
import TextBoxNode from './components/TextBoxNode';
import DarkModeToggle from './components/DarkModeToggle';
import FlowsPanel from './components/FlowsPanel';

import './App.css';
import './components/Nodes.css';

const initialNodes = [
    {
        id: '1',
        type: 'textNode',
        data: { label: 'Test message 1' },
        position: { x: 250, y: 5 },
    },
];

const nodeTypes = {
    textNode: TextNode,
    imageNode: ImageNode,
    tableNode: TableNode,
    buttonNode: ButtonNode,
    textBoxNode: TextBoxNode
};

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const [saveError, setSaveError] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [flows, setFlows] = useState([]);
    const [currentFlow, setCurrentFlow] = useState(null);
    const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

    useEffect(() => {
        const fetchFlows = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/flow');
                setFlows(response.data);
                if (response.data.length > 0) {
                    handleSelectFlow(response.data[0]);
                }
            } catch (error) {
                console.error('Error fetching flows:', error);
            }
        };
        fetchFlows();
    }, []);

    const handleSelectFlow = async (flow) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/flow/${flow._id}`);
            if (response.data) {
                setNodes(response.data.nodes || []);
                setEdges(response.data.edges || []);
                setCurrentFlow(response.data);
            }
        } catch (error) {
            console.error('Error fetching flow:', error);
        }
    };

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: (nodes.length + 1).toString(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, nodes, setNodes]
    );

    const onNodeClick = (event, node) => {
        setSelectedNode(node);
    };

    const onPaneClick = () => {
        setSelectedNode(null);
    };

    const onSave = async () => {
        if (!currentFlow) {
            alert('Please select a flow to save.');
            return;
        }

        const nodeCount = nodes.length;
        const edgeCount = edges.length;

        if (nodeCount > edgeCount + 1) {
            setSaveError(true);
            setTimeout(() => setSaveError(false), 3000);
        } else {
            setSaveError(false);
            const flowData = {
                nodes,
                edges,
            };
            try {
                await axios.post(`http://localhost:5000/api/flow/update/${currentFlow._id}`, flowData);
                alert('Flow saved successfully!');
            } catch (error) {
                console.error('Error saving flow:', error);
                alert('Error saving flow. Please check the console.');
            }
        }
    };

    const onNewFlow = async (folderName = 'Default') => {
        const flowName = prompt(`Enter the name for the new flow in "${folderName}" folder:`);
        if (flowName) {
            try {
                // Generate unique IDs for initial nodes to avoid conflicts
                const uniqueInitialNodes = initialNodes.map(node => ({
                    ...node,
                    id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`
                }));

                const newFlowData = {
                    name: flowName,
                    nodes: uniqueInitialNodes,
                    edges: [],
                    folder: folderName
                };

                const response = await axios.post('http://localhost:5000/api/flow/add', newFlowData);

                // Refresh the flows list and select the new flow
                const flowsResponse = await axios.get('http://localhost:5000/api/flow');
                setFlows(flowsResponse.data);

                // Find the newly created flow
                const newFlow = flowsResponse.data.find(flow => flow.name === flowName && flow.folder === folderName);
                if (newFlow) {
                    setCurrentFlow(newFlow);
                    setNodes(uniqueInitialNodes);
                    setEdges([]);
                }

                alert('New flow created successfully!');
            } catch (error) {
                console.error('Error creating new flow:', error);
                let errorMessage = 'Error creating new flow.';

                if (error.response && error.response.data) {
                    errorMessage += ` ${error.response.data}`;
                }

                alert(errorMessage + ' Please check the console.');
            }
        }
    };

    return (
        <div className={`dndflow ${isDarkMode ? 'dark-mode' : ''}`}>
            <ReactFlowProvider>
                <div className="top-bar">
                    <button
                        className="navbar-toggle-btn"
                        onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
                        title={isPanelCollapsed ? "Show sidebar" : "Hide sidebar"}
                    >
                        {isPanelCollapsed ? '☰' : '◀'}
                    </button>
                    {saveError && <div className="error-message">Cannot save Flow</div>}
                    <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                    <button onClick={onSave} className="save-button">
                        Save Changes
                    </button>
                </div>
                <div className="main-wrapper">
                    <FlowsPanel
                        flows={flows}
                        onSelectFlow={handleSelectFlow}
                        onNewFlow={onNewFlow}
                        isCollapsed={isPanelCollapsed}
                        currentFlow={currentFlow}
                    />
                    <div className="content-wrapper">
                        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                            <ReactFlow
                                nodes={nodes}
                                edges={edges}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                onConnect={onConnect}
                                onInit={setReactFlowInstance}
                                onDrop={onDrop}
                                onDragOver={onDragOver}
                                onNodeClick={onNodeClick}
                                onPaneClick={onPaneClick}
                                nodeTypes={nodeTypes}
                                fitView
                            >
                                <Controls />
                            </ReactFlow>
                        </div>
                        <div className="panels-container">
                            {selectedNode ? (
                                <SettingsPanel selectedNode={selectedNode} setNodes={setNodes} setSelectedNode={setSelectedNode} />
                            ) : (
                                <NodesPanel />
                            )}
                        </div>
                    </div>
                </div>
            </ReactFlowProvider>
        </div>
    );
};

export default DnDFlow;
