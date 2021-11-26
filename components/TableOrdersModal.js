import { find, pipe, prop, propEq } from "ramda";
import { useRouter } from "next/router";
import React from "react";

import Modal from "./Modal";

const TableOrderModals = ({
    isOpen,
    onRequestClose,
    onSubmit,
    tableOrders,
}) => {
    const router = useRouter();

    const id = router.query.params?.[1];

    const [tableOrderAmount, setTableOrderAmount] = React.useState("");

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            onAfterOpen={() => {
                const initialAmount = pipe(
                    find(propEq("id", id)),
                    prop("amount")
                )(tableOrders);

                if (id && initialAmount) {
                    setTableOrderAmount(initialAmount);
                }
            }}
        >
            <div style={{ fontSize: 15 }}>Amount</div>
            <input
                name="tableOrderAmount"
                value={tableOrderAmount}
                onChange={(e) => {
                    if (isNaN(e.target.value)) {
                        return;
                    }
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
                disabled={!tableOrderAmount || Number(tableOrderAmount) <= 0}
                onClick={(e) => {
                    e.preventDefault();
                    setTableOrderAmount("");
                    onSubmit?.(tableOrderAmount);
                }}
            >
                {id ? "Edit" : "Add"}
            </button>
        </Modal>
    );
};

export default TableOrderModals;
