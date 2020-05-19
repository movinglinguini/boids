import { Utils } from '../../utils/utils.js';
import { SphericalMesh } from '../../classes/spherical-mesh.js';

export class SphereWithin extends SphericalMesh {
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
        const theta = (Math.PI) * (i / iters);
        const radius = Math.max(1.5, 3 * (Math.sin(k)));
        
        const sphr = Utils.sphericalToVector3({ phi, theta, radius });

        points.push(...Utils.vector3ToPointBuffer(sphr));
      }
    }

    return points;
  }

  onUpdate() {
    /**
     * @todo
     * Use the expression below to "animate" this sphere
     * The idea is to spin theta by adding the second term, where t is the time since rendering
     * and `speed` is a damping factor.
     */

     // theta = (.75 * Math.PI) * (i / iters) + ((Math.PI * .25) * t * speed)
  }
}