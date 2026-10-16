import { Graphics, type Application, Container } from "pixi.js";

const DESIGN_WIDTH = 1920;

export class BattleRendering {
  app: Application;
  enemy: Graphics;
  enemy2: Graphics;
  camera = new Container();
  rotate = 0.1;
  constructor(app: Application) {
    this.enemy2 = new Graphics().rect(0, 0, 100, 100).fill(0xe85d75);
    this.enemy = new Graphics().rect(0, 0, 100, 100).fill(0xe85d75);
    this.app = app;
  }

  initialize(): void {
    this.enemy.position.set(300, 150);
    this.enemy2.position.set(300, 0);

    this.camera.addChild(this.enemy2);
    this.camera.addChild(this.enemy);

    this.app.ticker.add(this.update);
    this.app.stage.addChild(this.camera);
  }

  private update = (_: { deltaTime: number }) => {
    //   const deltaTime = ticker.deltaTime;
  };

  resize(width: number): void {
    this.camera.scale.set(width / DESIGN_WIDTH);
  }

  get world(): Container {
    return this.camera;
  }

  destroy(): void {
    this.app.ticker.remove(this.update);
    this.camera.destroy({ children: true });
  }
}
