import React from "react";
import { Spring } from "react-spring";

const ElementBar = ({ progress }) => {
  return (
    <Spring from={{ percent: 0 }} to={{ percent: progress }}>
      {({ percent }) => (
        <div className="progress vertical">
          <div style={{ height: `${progress}%` }} className="progress-bar">
          <p className="text-danger">
            <span className="sr-only">{`${progress}%`}</span>
            </p>
          </div>
        </div>

      )}
    </Spring>
  );
};

export default ElementBar;
