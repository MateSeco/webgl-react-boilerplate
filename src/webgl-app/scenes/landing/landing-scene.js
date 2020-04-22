import BaseScene from '../base/base-scene';
import { VECTOR_ZERO } from '../../utils/math';
import Ambient from '../../lights/ambient';
import Directional from '../../lights/directional';
import assets from './assets';
import Background from './objects/background/background';
import renderer from '../../rendering/renderer';
import ParticlesNormal from './objects/particles/particles-normal';
import Particles from './objects/particles/particles';

export const LANDING_SCENE_ID = 'landing';

export default class LandingScene extends BaseScene {
  constructor() {
    const lights = [new Ambient(), new Directional()];
    super({ id: LANDING_SCENE_ID, assets, gui: true, guiOpen: true, lights, controls: true });
    this.camera.position.set(0, 0, 5);
    this.camera.lookAt(VECTOR_ZERO);
  }

  /**
   * Create and setup any objects for the scene
   *
   * @memberof LandingScene
   */
  async createSceneObjects() {
    await new Promise((resolve, reject) => {
      try {
        this.background = new Background(this.gui);
        this.scene.add(this.background.mesh);

        // Create particle classes
        this.particlesNormal = new ParticlesNormal(renderer);
        const particles = new Particles(
          this.gui,
          5000, // total particles
          this.particlesNormal, // particles normal texture class
          renderer.getPixelRatio()
        );
        this.scene.add(particles.mesh);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Update loop
   *
   * @memberof LandingScene
   */
  update = (delta: number) => {
    this.particlesNormal.render(this.camera);
  };
}
