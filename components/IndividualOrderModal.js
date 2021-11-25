import React from "react";

import Input from './Input';
import Modal from "./Modal";

const IndividualOrderModal = ({ isOpen, onRequestClose, onSubmit }) => {
    const [person, setPerson] = React.useState("Hasan");
    const [amount, setAmount] = React.useState("");
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <label
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <span style={{ fontSize: 14 }}>Choose a person</span>
                <select
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
                    value={person}
                    onChange={(e) => {
                        setPerson(e.target.value);
                    }}
                >
                    <option value="Hasan">Hasan</option>
                    <option value="Maaz">Maaz</option>
                    <option value="Amar">Amar</option>
                    <option value="Shayan">Shayan</option>
                    <option value="Arshad">Arshad</option>
                    <option value="Omair">Omair</option>
                </select>
            </label>
            <div style={{ fontSize: 15, marginTop: 10 }}>Amount</div>
            <div
                style={{
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Input
                    name="individualOrderAmount"
                    value={amount}
                    onChange={(e) => {
                        setAmount(e.target.value);
                    }}
                    placeholder="Your Amount"
                />
                <button
                    style={{ marginTop: 10 }}
                    onClick={(e) => {
                        e.preventDefault();
                        setAmount("");
                        onSubmit?.({ amount, person });
                    }}
                >
                    Add
                </button>
            </div>
        </Modal>
    );
};

export default IndividualOrderModal;
