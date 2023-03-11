import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

const ActivityCard = ({ variant, activity }) => {
  return (
    <div className="card" onClick={() => console.log("clicked")}>
      {variant === "addNew" ? (
        <button
          className="addNew"
          style={{ gridColumn: "1 / 3", gridRow: "1 / 6" }}
        >
          <FontAwesomeIcon icon={faPlusSquare} />
        </button>
      ) : (
        <>
          <div
            style={{
              gridRowStart: 1,
              gridRowEnd: 2,
              gridColumnStart: 1,
              gridColumnEnd: 3,
              fontSize: "2.4rem",
            }}
          >
            {activity.title}
          </div>
          <div
            style={{
              gridRowStart: 3,
              gridRowEnd: 4,
              gridColumnStart: 1,
              gridColumnEnd: 3,
            }}
          >
            {activity.description}
          </div>
          <div
            style={{
              gridRowStart: 2,
              gridRowEnd: 3,
              gridColumnStart: 1,
              gridColumnEnd: 2,
            }}
          >
            Start: {activity.start === -1 ? "now" : activity.start + "h"}
          </div>
          <div
            style={{
              gridRowStart: 2,
              gridRowEnd: 3,
              gridColumnStart: 2,
              gridColumnEnd: 3,
            }}
          >
            length: {activity.length + "h"}
          </div>
          <div
            style={{
              gridRowStart: 4,
              gridRowEnd: 5,
              gridColumnStart: 1,
              gridColumnEnd: 3,
            }}
          >
            Outfit Suggestion
          </div>
        </>
      )}
    </div>
  );
};

export default ActivityCard;
