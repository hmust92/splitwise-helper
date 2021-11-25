import ReactModal from "react-modal";

const Modal = ({ style = {}, ...props }) => (
    <ReactModal
        style={{
            ...style,
            content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                background: "#f2f2f2",
                maxWidth: "80%",
                ...style.content,
            },
            overlay: {
                backgroundColor: "rgb(155 155 155 / 90%)",
                ...style.overlay,
            },
        }}
        {...props}
    />
);

export default Modal;
