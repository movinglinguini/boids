/**
 * @author Luis Angel Garcia
 * This file defines the tree's trunk.
 * The trunk consists of the boundaries of
 * a number of "kissing spheres"
 */
import * as THREE from 'three';
import { Utils } from '../../../utils/utils.js';
import { MathUtils } from '../../../utils/math-utils.js';
import { SphericalMesh } from '../../../classes/spherical-mesh.js';

export class TreeTrunk {
  constructor() {
    this._pieces = [];

    const numPieces = 16;
    const pieceRadius = 3;
    for (let i = 0; i < numPieces; i += 1) {
      const newPiece = new TrunkPiece(pieceRadius, i / numPieces);

      this._pieces.push(newPiece);
    }

    this.group = new THREE.Group();
    this.group.add(...this._pieces.map(p => p.mesh));
  }
}

class TrunkPiece extends SphericalMesh {
  constructor(radius, arcPosition) {
    super();
    this.radius = radius;
    this.sliceRotation = -arcPosition * (2 * Math.PI) + Math.PI;
    this.constructMesh();
    this.setPosition(arcPosition);
  }

  drawRule() {
    const points = [];
    const iters = 250;

    const startTheta = (.0325 * Math.PI);
    const thetaArcSize = 2;

    for (let i = 0; i < iters; i += 1) {
      for (let k = 0; k < iters; k += 1) {
        const phi = (Math.PI) * (k / iters);
        const theta = (thetaArcSize * startTheta) * (i / iters) - ((startTheta) + this.sliceRotation);
        const radius = this.radius;
        
        const sphr = Utils.sphericalToVector3({ phi, theta, radius });
        sphr.y *= 1.75;

        points.push(...Utils.vector3ToPointBuffer(sphr));
      }
    }

    return points;
  }

  setPosition(arcPosition) {
    const phi = Math.PI / 2;
    const theta = 2 * Math.PI * arcPosition;
    const radius =  this.radius * 1.4;

    const position = Utils.sphericalToVector3({
      phi,
      theta,
      radius,
    });

    this.mesh.translateX(position.x);
    this.mesh.translateY(position.y);
    this.mesh.translateZ(position.z);
  }
}
