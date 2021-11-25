import Modal from "react-modal";

const ResultsModal = ({ isOpen, onRequestClose, results }) => {
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
                    maxWidth: "80%",
                },
                overlay: {
                    backgroundColor: "rgb(155 155 155 / 90%)",
                },
            }}
        >
            {results.map(({ person, totalAmount, id }, i, list) => (
                <div
                    key={id}
                    style={{
                        marginBottom: i === list.length - 1 ? 0 : 10,
                        textAlign: "center",
                    }}
                >
                    {person} needs to pay ${totalAmount.toFixed(2)}
                </div>
            ))}
        </Modal>
    );
};

export default ResultsModal;
