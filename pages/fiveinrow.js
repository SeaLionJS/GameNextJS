import React, { useEffect } from "react";
import MainLayout from "../components/MainLayout";
import GBoard from "../components/widgets/GBoard";
import { Store } from "../utils/store";
import { useContext } from "react";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import GameControl from "../components/widgets/GameControl";
import { connectWebSocket } from "../components/controllers/ws";

export default function FiveInRow() {
  useEffect(() => {
    connectWebSocket();
  }, []);

  const additionalTool = (
    <div className="g-control">
      <GameControl />
    </div>
  );

  return (
    <MainLayout title="FiveInRow" additionalTool={additionalTool}>
      <GBoard />
    </MainLayout>
  );
}
