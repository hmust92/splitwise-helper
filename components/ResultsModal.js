import Modal from './Modal';

const ResultsModal = ({ isOpen, onRequestClose, results }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
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
