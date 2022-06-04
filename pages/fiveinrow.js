import React from "react";
import MainLayout from "../components/MainLayout";
import GBoard from "../components/widgets/GBoard";
import { Store } from "../utils/store";
import { useContext } from "react";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import GameControl from "../components/widgets/GameControl";

export default function FiveInRow() {
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
