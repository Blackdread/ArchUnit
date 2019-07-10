'use strict';

//all nodes are added to this list when they are moved to their position to be able to track the process
let movedNodes = [];
let nodesWhoseRadiusWasChanged = [];
const saveMovedNodesTo = arr => movedNodes = arr;
const saveNodesWhoseRadiusWasChangedTo = arr => nodesWhoseRadiusWasChanged = arr;

const NodeViewStub = class {
  constructor({nodeName, fullNodeName}) {
    this.cssClass = '';
    this.isVisible = true;
    this.hasMovedToPosition = false;
    this.hasMovedToRadius = false;

    this.getTextWidth = () => nodeName.length * 7;

    this.show = () => this.isVisible = true;
    this.hide = () => this.isVisible = false;
    this.jumpToPosition = () => this.hasJumpedToPosition = true;
    this.moveToPosition = () => {
      this.hasMovedToPosition = true;
      return Promise.resolve();
    };
    this.startMoveToPosition = () => Promise.resolve();
    this.changeRadius = (r, textOffset) => {
      this.hasMovedToRadius = true;
      this.textOffset = textOffset;
      return new Promise(resolve => {
        movedNodes.push(fullNodeName);
        setTimeout(resolve, 10);
      });
    };
    this.setRadius = () => {
      nodesWhoseRadiusWasChanged.push(fullNodeName);
    };
    this.updateNodeType = cssClass => this.cssClass = cssClass;
    this.showIfVisible = node => {
      if (node.isVisible()) {
        this.isVisible = true;
      }
    };
    this.focus = () => {
    };
    this.addChildView = () => {
    };
    this.detachFromParent = () => {
    };
  }
};

//all dependencies are added to this list when they are moved to their position to be able to track the process
let movedDependencies = [];
const saveMovedDependenciesTo = arr => movedDependencies = arr;

const DependencyViewStub = class {
  constructor(dependency) {
    this._dependency = dependency;

    this.refreshWasCalled = false;
    this.hasJumpedToPosition = false;
    this.hasMovedToPosition = false;

    this.show = () => this.isVisible = true;
    this.hide = () => this.isVisible = false;

    this.jumpToPositionAndShowIfVisible = () => {
      this.hasJumpedToPosition = true;
      this.isVisible = this._dependency.isVisible();
    };
    this.refresh = () => {
      this.refreshWasCalled = true;
    };
    this.moveToPositionAndShowIfVisible = () => {
      this.hasMovedToPosition = true;
      this.isVisible = this._dependency.isVisible();
      return new Promise(resolve => {
        movedDependencies.push(this._dependency);
        setTimeout(resolve, 10);
      });
    };
    this.onEndNodeInForegroundChanged = () => {
    };

    this.onContainerEndNodeChanged = () => {
    };
    this.onMouseOver = () => {
    };
    this.onMouseOut = () => {
    };
  }
};

const DetailedDependencyViewStub = class {
  constructor() {
  }
};

const GraphViewStub = class {
  constructor() {
    this.renderWithTransition = () => {
    };
    this.addRootView = () => {
    };
  }
};

const createNodeListenerStub = () => {
  let _onDragWasCalled = false;
  const _draggedNodes = [];
  let _foldedNode;
  let _initialFoldedNode = null;
  let _onLayoutChangedWasCalled = false;

  const overlappedNodesAndPosition = [];

  return {
    onDrag: (node) => {
      _onDragWasCalled = true;
      _draggedNodes.push(node.getFullName());
    },
    onFold: node => _foldedNode = node,
    onLayoutChanged: () => _onLayoutChangedWasCalled = true,
    onInitialFold: node => _initialFoldedNode = node,

    onDragWasCalled: () => _onDragWasCalled,
    draggedNodes: () => _draggedNodes,
    foldedNode: () => _foldedNode,
    initialFoldedNode: () => _initialFoldedNode,
    onLayoutChangedWasCalled: () => _onLayoutChangedWasCalled,
    onNodesFocused: () => {
    },

    onNodesOverlapping: (fullNameOfOverlappedNode, positionOfOverlappingNode) =>
      overlappedNodesAndPosition.push({overlappedNode: fullNameOfOverlappedNode, position: positionOfOverlappingNode}),
    resetNodesOverlapping: () => {
    },
    finishOnNodesOverlapping: () => {
    },

    overlappedNodesAndPosition: () => overlappedNodesAndPosition,

    resetInitialFoldedNode: () => _initialFoldedNode = null
  }
};

module.exports = {
  NodeViewStub: NodeViewStub,
  DependencyViewStub: DependencyViewStub,
  DetailedDependencyViewStub: DetailedDependencyViewStub,
  GraphViewStub: GraphViewStub,
  NodeListenerStub: createNodeListenerStub,
  saveMovedDependenciesTo: saveMovedDependenciesTo,
  saveMovedNodesTo: saveMovedNodesTo,
  saveNodesWhoseRadiusWasChangedTo: saveNodesWhoseRadiusWasChangedTo
};