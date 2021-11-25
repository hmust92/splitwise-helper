import React from "react";

import Input from './Input';
import Modal from "./Modal";

const TableOrderModals = ({ isOpen, onRequestClose, onSubmit }) => {
    const [tableOrderAmount, setTableOrderAmount] = React.useState("");

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
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
