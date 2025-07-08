import React from 'react';

const HighlightBox = ({ title, value, Icon }) => {
  return (
    <div
      style={{
        backgroundColor: "#374151",
        color: "white",
        padding: "1rem",
        borderRadius: "0.5rem",
        width: "200px",
        textAlign: "center",
      }}
    >
      <Icon style={{ fontSize: "35px" }} />
      <div style={{ marginTop: "10px", fontSize: "18px", fontWeight: "bold" }}>
        {title}
      </div>
      <div style={{ marginTop: "5px", fontSize: "16px" }}>{value}</div>
    </div>
  );
};

export default HighlightBox;
