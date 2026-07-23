
function runAStar(startNodeId, targetExits, nodesMap, fireLocation) {
  if (!startNodeId || !nodesMap || !nodesMap[startNodeId]) return null;

  const FIRE_HAZARD_RADIUS = 30.0;
  const EXTREME_HAZARD_PENALTY = 999999;

  // A* uses targetRisk for pathfinding so it plans for the future horizon correctly
  Object.keys(nodesMap).forEach(id => {
    const node = nodesMap[id];
    node.hazardPenalty = 0;
    node.isBlockedByFire = false;

    if (fireLocation && nodesMap[fireLocation]) {
      const fireNode = nodesMap[fireLocation];
      const dist = Math.hypot(node.x - fireNode.x, node.y - fireNode.y);

      if (dist < 4.5) {
        node.isBlockedByFire = true;
      } else if (dist <= FIRE_HAZARD_RADIUS) {
        node.hazardPenalty = (FIRE_HAZARD_RADIUS - dist) * (EXTREME_HAZARD_PENALTY / FIRE_HAZARD_RADIUS);
      }
    }
  });

  let validExits = targetExits.filter(exitId => {
    const exitNode = nodesMap[exitId];
    return exitNode && !exitNode.isBlockedByFire && (exitNode.hazardPenalty < EXTREME_HAZARD_PENALTY / 2);
  });

  if (validExits.length === 0) validExits = targetExits;

  let bestPath = null;
  let minTotalCost = Infinity;

  for (let exitId of validExits) {
    const pathResult = computeSingleAStar(startNodeId, exitId, nodesMap);
    if (pathResult && pathResult.totalCost < minTotalCost) {
      minTotalCost = pathResult.totalCost;
      bestPath = pathResult;
    }
  }

  return bestPath;
}

function computeSingleAStar(startId, goalId, nodesMap) {
  let openSet = [startId];
  let cameFrom = {};
  let gScore = {};
  let fScore = {};

  Object.keys(nodesMap).forEach(id => {
    gScore[id] = Infinity;
    fScore[id] = Infinity;
  });

  gScore[startId] = 0;
  fScore[startId] = heuristic(nodesMap[startId], nodesMap[goalId]);

  while (openSet.length > 0) {
    openSet.sort((a, b) => fScore[a] - fScore[b]);
    let currentId = openSet.shift();

    if (currentId === goalId) {
      let path = [currentId];
      while (cameFrom[path[0]]) {
        path.unshift(cameFrom[path[0]]);
      }
      return { path: path, totalCost: gScore[goalId], exitId: goalId };
    }

    let currentNode = nodesMap[currentId];
    if (currentNode.isBlockedByFire && currentId !== startId) continue;

    let neighbors = currentNode.neighbors || [];

    for (let neighborId of neighbors) {
      let neighborNode = nodesMap[neighborId];
      if (!neighborNode || neighborNode.isBlockedByFire) continue;

      let dist = Math.hypot(currentNode.x - neighborNode.x, currentNode.y - neighborNode.y);
      let nodeRisk = (neighborNode.targetRisk || 0) * 100;
      let tentativeG = gScore[currentId] + dist + (neighborNode.hazardPenalty || 0) + nodeRisk;

      if (tentativeG < gScore[neighborId]) {
        cameFrom[neighborId] = currentId;
        gScore[neighborId] = tentativeG;
        fScore[neighborId] = tentativeG + heuristic(neighborNode, nodesMap[goalId]);

        if (!openSet.includes(neighborId)) {
          openSet.push(neighborId);
        }
      }
    }
  }

  return null;
}

function heuristic(nodeA, nodeB) {
  if (!nodeA || !nodeB) return 0;
  return Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y);
}
