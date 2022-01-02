//  props: {
//    nodeId: Number,
//    name: String,
//    isCompleted: Boolean,
//    prerequisiteNodeIds: Array, //Array of NodeIds;
//   dependentNodeIds: Array, //Array of NodeIds;
//    prerequisitesAchieved: Array, //Array of Booleans
//  }

//DESIGN store based on this format:

import primTask from "./primTask.js";

export const store = {
  state: {
    nodeArray, //Array of nodes shown above
    numNodes, //Explicit variable.
    idToName, //hash map
    nameToId, //hash map
  },

  sendUpdate(senderID, state, nodesTobeUpdated) {
    for (let i = 0; i < nodesTobeUpdated.length; i++) {
      if (i < state.numNodes)
        state.nodeArray[i].updateDependency(senderID, state);
      else console.log("Attempted to access nodeArray out of index");
    }
  },

  //parse JSON as object with single field "all_tasks" that is a list with fields:
  //name: String;
  //prerequisites: Array of Strings that is the same as before;
  //Possibly Type?
  //containing object (NULL for world level, then town level, probably).
  initializeStore(inputJSONpath) {
    resetState();
    const parsed = JSON.parse(inputJSONpath);
    const nodes = parsed["all_tasks"];
    state.nodeArray = new Array();
    state.idToName = {};
    state.nameToId = {};
    //Populate Node Array
    for (let i = 0; i < nodes.length; i++) {
      state.idToName[i] = nodes.name;
      state.nameToId[nodes.name] = i;
      //    constructor(nodeId, name, prerequisiteNodeIds, dependentNodeIds) %initialize with a full array of -1, or n ull if no prereqs. Dependencies are populated later.
      state.nodeArray.push(
        new primTask(
          i,
          nodes[i].name,
          nodes[i].prerequisites.length > 0
            ? new Array(nodes[i].prerequisites.length).fill(-1)
            : null,
          []
        )
      );
    }
    state.numNodes = nodeArray.length; //Yes, this is dumb.
    //Populate dependnecies, and do the name to ID conversion.
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes[i].prerequisites.length; j++) {
        //convert names to Ids for prereqs
        const prereqId = state.nameToId[nodes[i].prerequisites[j]];
        state.nodeArray[i].prerequisiteNodeIds[j] = prereqId;
        //add dependency to noted node
        state.nodeArray[prereqId] = i;
      }
    }
  },
  resetState() {
    //JAVASCRIPT I DON'T GET GARBAGE COLLECTION AND I WANT TO FORCE EMPTY.
    state.nodeArray = null;
    state.idToName = null; //hash map
    state.nameToId = null; //hash map
  },
};
