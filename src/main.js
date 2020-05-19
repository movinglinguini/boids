import ENGINE from '@movinglinguini/three-boilerplate';
import * as THREE from 'three';

import { Tree } from './model-rules/tree/tree.js';
import { SphereWithin } from './model-rules/fun-spheres/sphere-within.js';
import { MultiDisk } from './model-rules/fun-spheres/multi-discs';
import { Sphere } from 'three';

const engine = new ENGINE();

// const grid = new THREE.GridHelper(10, 10, 0x000000);
// engine.addObject(grid);

const axisHelpers = new THREE.Group();
const xPoints = [ new THREE.Vector3(), new THREE.Vector3(100, 0, 0)];
const yPoints = [ new THREE.Vector3(), new THREE.Vector3(0, 100, 0)];
const zPoints = [ new THREE.Vector3(), new THREE.Vector3(0, 0, 100)];

axisHelpers.add(
  // x line 
  new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(xPoints),
    new THREE.LineBasicMaterial({ color: 0xff0000 }),
  ),
  // y line
  new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(yPoints),
    new THREE.LineBasicMaterial({ color: 0x00ff00 }),
  ),
  // z line
  new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(zPoints),
    new THREE.LineBasicMaterial({ color: 0x0000ff }),
  )
);

engine.addObject(axisHelpers);

// the damping got annoying
engine._orbitControls.enableDamping = false;

const tree = new Tree();
engine.addObject(tree.group);
// const multiDisk = new SphereWithin();
// engine.addObject(multiDisk.mesh);

