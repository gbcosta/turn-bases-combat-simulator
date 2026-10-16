import { BattleCanvas } from "../BattleCanvas/BattleCanvas";
import { Explorer } from "../Explorer";
import {
  DockviewReact,
  type DockviewReadyEvent,
  themeAbyss,
} from "dockview-react";
import "dockview/dist/styles/dockview.css";

export const Layout = () => {
  const onReady = (event: DockviewReadyEvent) => {
    event.api.addPanel({
      id: "explorer",
      component: "explorer",
      title: "Explorer",
    });

    event.api.addPanel({
      id: "viewport",
      component: "viewport",
      title: "Viewport",
      position: {
        referencePanel: "explorer",
        direction: "right",
      },
    });

    event.api.addPanel({
      id: "Settings",
      component: "settings",
      title: "Settings",
      position: {
        referencePanel: "viewport",
        direction: "right",
      },
    });

    event.api.addPanel({
      id: "Console",
      component: "console",
      title: "Console",
      position: {
        referencePanel: "viewport",
        direction: "below",
      },
    });
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <DockviewReact
        className="dockview-theme-dark"
        onReady={onReady}
        theme={themeAbyss}
        components={{
          explorer: Explorer,
          viewport: BattleCanvas,
          settings: Explorer,
          console: Explorer,
        }}
      />
    </div>
  );
};
