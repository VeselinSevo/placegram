import { createPortal } from "react-dom";
export default function Backdrop(props) {
    return createPortal(
        <div
            className="fixed inset-0 bg-black opacity-50 z-[60]"
            onClick={props.onClick}
        ></div>,
        document.getElementById("backdrop")
    );
}
