import Modal from "react-modal";
import React from 'react';

const TableOrderModals = ({ isOpen, onRequestClose, onSubmit }) => {
    const [tableOrderAmount, setTableOrderAmount] = React.useState("");

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    background: "#f2f2f2",
                },
                overlay: {
                    backgroundColor: "rgb(155 155 155 / 90%)",
                },
            }}
        >
            <div style={{ fontSize: 15 }}>Amount</div>
            <input
                name="tableOrderAmount"
                value={tableOrderAmount}
                onChange={(e) => {
                    setTableOrderAmount(e.target.value);
                }}
                style={{
                    marginTop: 10,
                    marginRight: 3,
                    padding: 5,
                    display: "inline-block",
                    border: "1px solid #ccc",
                    boxShadow: "inset 0 1px 3px #ddd",
                    borderRadius: 4,
                    fontSize: 15,
                }}
                placeholder="Your Amount"
            />
            <button
                style={{ marginLeft: 3 }}
                onClick={(e) => {
                    e.preventDefault();
                    setTableOrderAmount("");
                    onSubmit?.(tableOrderAmount);
                }}
            >
                Add
            </button>
        </Modal>
    );
};

export default TableOrderModals;