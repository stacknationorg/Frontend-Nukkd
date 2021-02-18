import ReactDom from 'react-dom'

function Modal(props) {
    return ReactDom.createPortal(
        props.children,
        document.getElementById("modals")
    )
}

export default Modal
