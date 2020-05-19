import { V as Vector3, S as Spherical, B as BufferGeometry, a as BufferAttribute, P as PointsMaterial, b as Points, O as Object3D, G as Group, E as ENGINE, L as Line, c as LineBasicMaterial } from './vendor.js';

const Utils = {
	sphericalToVector3(sphCoords) {
		return new Vector3().setFromSpherical(new Spherical(sphCoords.radius, sphCoords.phi, sphCoords.theta));
	},
	vector3ToPointBuffer(vector3) {
		return [ vector3.x, vector3.y, vector3.z ];
	},
	getRandomSphericalCoord(funcs = {
		radiusFunc: (x) => { return x; },
		phiFunc: (x) => { return x; },
		thetaFunc: (x) => { return x; },
	}, config = {
		asVector3: false,
	}) {
		const sph = {
			radius: funcs.radiusFunc ? funcs.radiusFunc(Math.random()) : Math.random(),
			phi: funcs.phiFunc ? funcs.phiFunc(Math.random()) : Math.random() * Math.PI * 2,
			theta: funcs.thetaFunc ? funcs.thetaFunc(Math.random()) : Math.random() * Math.PI * 2,
		};

		if (config) {
			if (config.asVector3) {
				return this.sphericalToVector3(sph.radius, sph.phi, sph.theta);
			}
		}

		return sph;
	},
	clamp(x, min, max) {
		return Math.max(min, Math.min(x, max));
	},
	makeRandomNumberBetween(min = 0, max = 1) {
		return (Math.random() * (max - min)) + min;
	},
};

class SphericalMesh {
  constructor () {
    this.points = [];
    this.mesh = null;
    this.obj3d = null;
    this.meshColor = 0xffffff;
  }

  drawRule() {}

  constructMesh() {
    this.points = this.drawRule();

    this.points = new Float32Array(this.points);
    const geom = new BufferGeometry()
      .setAttribute('position', new BufferAttribute(this.points, 3));

    const pointMaterial = new PointsMaterial({ color: this.meshColor });
    pointMaterial.sizeAttenuation = false;
    this.mesh = new Points(geom, pointMaterial);

    this.obj3d = new Object3D();
    this.obj3d.add(this.mesh);
  }
}

/**
 * @author Luis Angel Garcia
 * This file defines the tree's trunk.
 * The trunk consists of the boundaries of
 * a number of "kissing spheres"
 */

class TreeTrunk {
  constructor() {
    this._pieces = [];

    const numPieces = 16;
    const pieceRadius = 3;
    for (let i = 0; i < numPieces; i += 1) {
      const newPiece = new TrunkPiece(pieceRadius, i / numPieces);

      this._pieces.push(newPiece);
    }

    this.group = new Group();
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

/**
 * @author Luis Angel Garcia
 * This file defines the tree's trunk.
 * The trunk consists of the boundaries of
 * a number of "kissing spheres"
 */

class Canopy {
  constructor() {
    this._pieces = [];

    const numPieces = 16;
    const pieceRadius = 3;
    for (let i = 0; i < numPieces; i += 1) {
      const newPiece = new CanopyPiece(pieceRadius, i / numPieces);

      this._pieces.push(newPiece);
    }

    this.group = new Group();
    this.group.add(...this._pieces.map(p => p.mesh));
  }
}

class CanopyPiece extends SphericalMesh {
  constructor(radius, arcPosition) {
    super();
    this.radius = radius;
    this.sliceRotation = -arcPosition * (2 * Math.PI);
    this.arcPosition = arcPosition;
    this.meshColor = 0x00ff00;
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
          const theta = (thetaArcSize * startTheta) * (i / iters);//  - ((startTheta) + this.sliceRotation);
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

class Tree {
  constructor() {
    this._trunk = new TreeTrunk();
    this._canopy = new Canopy();

    this.group = new Group();
    this.group.add(this._trunk.group);
    this.group.add(this._canopy.group);
  }
}

const engine = new ENGINE();

// const grid = new THREE.GridHelper(10, 10, 0x000000);
// engine.addObject(grid);

const axisHelpers = new Group();
const xPoints = [ new Vector3(), new Vector3(100, 0, 0)];
const yPoints = [ new Vector3(), new Vector3(0, 100, 0)];
const zPoints = [ new Vector3(), new Vector3(0, 0, 100)];

axisHelpers.add(
  // x line 
  new Line(
    new BufferGeometry().setFromPoints(xPoints),
    new LineBasicMaterial({ color: 0xff0000 }),
  ),
  // y line
  new Line(
    new BufferGeometry().setFromPoints(yPoints),
    new LineBasicMaterial({ color: 0x00ff00 }),
  ),
  // z line
  new Line(
    new BufferGeometry().setFromPoints(zPoints),
    new LineBasicMaterial({ color: 0x0000ff }),
  )
);

engine.addObject(axisHelpers);

// the damping got annoying
engine._orbitControls.enableDamping = false;

const tree = new Tree();
engine.addObject(tree.group);
// const multiDisk = new SphereWithin();
// engine.addObject(multiDisk.mesh);
//# sourceMappingURL=main.js.map
