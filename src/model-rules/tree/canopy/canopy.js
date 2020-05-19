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

export class Canopy {
  constructor() {
    this._pieces = [];

    const numPieces = 16;
    const pieceRadius = 3;
    for (let i = 0; i < numPieces; i += 1) {
      const newPiece = new CanopyPiece(pieceRadius, i / numPieces);

      this._pieces.push(newPiece);
    }

    this.group = new THREE.Group();
    this.group.add(...this._pieces.map(p => p.mesh));
  }
}

class CanopyPiece extends SphericalMesh {
  constructor(radius, arcPosition) {
    super();
    this.radius = radius;
    this.sliceRotation = -arcPosition * (2 * Math.PI);
    this.arcPosition = arcPosition;
    this.meshColor = 0x00ff00
    this.constructMesh();
  }

  drawRule() {
    const points = [];
    const iters = 150;

    const startTheta = Math.PI;
    const thetaArcSize = 2;

    for (let p = 0; p < 9; p +=1) {
      const sPhi = Math.PI * (p / 9);
      const sTheta = 2 * Math.PI * this.arcPosition;
      const sRadius = this.radius * (1.4 * Math.random() + 0.25);
      const sphrCoord = Utils.sphericalToVector3({ phi: sPhi, theta: sTheta, radius: sRadius });

      for (let i = 0; i < iters; i += 1) {
        for (let k = 0; k < iters; k += 1) {
          const phi = (Math.PI) * (k / iters);
          const theta = (thetaArcSize * startTheta) * (i / iters)//  - ((startTheta) + this.sliceRotation);
          const radius = 1.5;
          
          const sphr = Utils.sphericalToVector3({ phi, theta, radius });
          
          // edit this sphere's coordinates
          sphr.y += ((2.6 * this.radius) + sphrCoord.y) / (1.3);
          sphr.x += sphrCoord.x * 1.15;
          sphr.z += sphrCoord.z * 1.2;
  
          points.push(...Utils.vector3ToPointBuffer(sphr));
        }
      }
    }

    return points;
  }

  setPosition(arcPosition) {
    for (let i = 0; i <= 4; i += 1) {
      const phi = (Math.PI * i / 4);
      const theta = 2 * Math.PI * arcPosition;
      const radius =  this.radius * 1.4;
    }

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
