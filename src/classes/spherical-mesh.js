import * as THREE from 'three';

export class SphericalMesh {
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
    const geom = new THREE.BufferGeometry()
      .setAttribute('position', new THREE.BufferAttribute(this.points, 3));

    const pointMaterial = new THREE.PointsMaterial({ color: this.meshColor });
    pointMaterial.sizeAttenuation = false;
    this.mesh = new THREE.Points(geom, pointMaterial);

    this.obj3d = new THREE.Object3D();
    this.obj3d.add(this.mesh);
  }
}