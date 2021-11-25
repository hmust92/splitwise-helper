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
                },
                overlay: {
                    backgroundColor: "rgb(155 155 155 / 90%)",
                },
            }}
        >
            <ul>
                {results.map(({ person, totalAmount, id }) => (
                    <li key={id}>
                        {person} needs to pay ${totalAmount}
                    </li>
                ))}
            </ul>
        </Modal>
    );
};

export default ResultsModal;
