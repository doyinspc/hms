import React from "react";
import RoomWidget from "./Room/RoomWidget";
import RoomAnalysis from "./Room/RoomAnalysis";
import MaintenanceWidget from "./Maintenance/MaintenanceWidget";

class BottomCard extends React.Component {
    render() {
        return (
            <>
              <div class="content">
                  <RoomWidget />
                  <RoomAnalysis />
                  <MaintenanceWidget />
              </div>
            </>
        )
    }
}
export default BottomCard;