import { SphericalMesh } from "../../classes/spherical-mesh";

export class MoonPhases extends SphericalMesh {
  constructor() {
    super();
    this.radius = 3;
    this.constructMesh();
  }
  drawRule() {
    const points = [];
    const iters = 100;

    const startTheta = Math.PI; // (.025 * Math.PI);
    const thetaArcSize = 2;
    const pieces = 8;

    for (let j = 0; j < iters; j += 1) {
      sliceRotation = j / pieces;
      for (let i = 0; i < iters; i += 1) {
        for (let k = 0; k < iters; k += 1) {
          const phi = (Math.PI) * (k / iters);
          const theta = (thetaArcSize * startTheta) * (i / iters) - ((startTheta) + sliceRotation);
          const radius = Math.max(1, this.radius * (theta * Math.PI));
          
          const sphr = Utils.sphericalToVector3({ phi, theta, radius });
  
          points.push(...Utils.vector3ToPointBuffer(sphr));
        }
      }
    }

    return points;
  }
}
