import { Utils } from '../../utils/utils.js';
import { SphericalMesh } from '../../classes/spherical-mesh.js';

export class MultiDisk extends SphericalMesh {
  constructor() {
    super();
    this.constructMesh();
  }

  drawRule() {
    const points = [];
    const iters = 100;

    for (let i = 0; i < iters; i += 1) {
      for (let k = 0; k < iters; k += 1) {
        const phi = (Math.PI) * (k / iters);
        const theta = (2 * Math.PI) * (i / iters);
        const radius = 3 * (Math.sin(k));
        
        const sphr = Utils.sphericalToVector3({ phi, theta, radius });

        points.push(...Utils.vector3ToPointBuffer(sphr));
      }
    }

    return points;
  }
}