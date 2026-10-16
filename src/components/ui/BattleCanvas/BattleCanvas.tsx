import { useEffect, useRef } from "react";
import { Application, extensions, CullerPlugin } from "pixi.js";
import { BattleRendering } from "@/core/rendering/BattleRendering";

export function BattleCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let app: Application | undefined;
    let cancelled = false;
    let observer: ResizeObserver | undefined;
    let render: BattleRendering | undefined;

    async function init() {
      const instance = new Application();
      await instance.init({
        width: container?.clientWidth ?? 800,
        height: container?.clientWidth ?? 450,
        backgroundColor: 0x20243a,
        antialias: true,
        autoDensity: true,
        resolution: window.devicePixelRatio || 1,
      });

      if (cancelled) {
        instance.destroy(true);
        return;
      }
      extensions.add(CullerPlugin);

      app = instance;
      containerRef.current?.appendChild(instance.canvas);

      render = new BattleRendering(instance);
      render.initialize();
    }

    void init();

    observer = new ResizeObserver(([entry]) => {
      if (!entry || !app) return;

      const { width, height } = entry.contentRect;

      if (width > 0 && height > 0) {
        app.renderer.resize(width, width * (9 / 16));
        render?.resize(width);
      }
    });

    observer.observe(container);
    return () => {
      cancelled = true;
      app?.destroy(true, { children: true });
      observer?.disconnect();
    };
  }, []);

  return <div ref={containerRef} className="" />;
}
