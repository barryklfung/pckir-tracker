import sendUpdate from "./dataStore.js"

class primTask {
    constructor(nodeId, name, prerequisiteNodeIds, dependentNodeIds) {
        this.nodeId = nodeId;
        this.name = name;
        this.isCompleted = false;
        this.prerequisiteNodeIds = prerequisiteNodeIds;
        this.dependentNodeIds = dependentNodeIds;
        this.prerequisitesAchieved = new Array(this.dependentNodeIds.length).fill(false);
    }
    //checking accessibility should be fast:
    isAccessible() {
        // if there are dependencies
        if (this.prerequisiteNodeIds.length > 0)
            // return 1 if nothing is _unsatisfied_
            return this.prerequisitesAchieved.includes(false) ? false : true;
        else return true; // return 1 otherwise.
    }
    toggleComplete() {
      // if we complete a task, update all dependencies.
      //Not sure right now, pass both new state, nodeId, and dependentIds, up, probably?
      // I think the "easiest way" is to maintain the list of nodes at global level, and directed edges at node level.
        const newState = !this.isCompleted;
        sendUpdate(this.nodeId, newState, this.dependentNodeIds);
    }
    updateDependency(nodeId, state) {
      // Update the input prereq (should work for completed vs not)
      const index = this.prerequisitesNodeIds.indexOf(nodeId);
      if (index > -1) this.prerequisitesAchieved[index] = state;
    }
}
