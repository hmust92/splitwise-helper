import React from "react";

const Input = ({ style = {}, ...props }) => (
    <input
        {...props}
        style={{
            padding: 5,
            display: "inline-block",
            border: "1px solid #ccc",
            boxShadow: "inset 0 1px 3px #ddd",
            borderRadius: 4,
            fontSize: 15,
            ...style
        }}
    />
);

export default Input;
