import * as THREE from 'three';
import { TreeTrunk } from './trunk/tree-trunk.js';
import { Canopy } from './canopy/canopy.js';

export class Tree {
  constructor() {
    this._trunk = new TreeTrunk();
    this._canopy = new Canopy();

    this.group = new THREE.Group();
    this.group.add(this._trunk.group);
    this.group.add(this._canopy.group);
  }
}
