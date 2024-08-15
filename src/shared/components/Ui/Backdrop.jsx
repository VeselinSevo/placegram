import { createPortal } from "react-dom";

export default function Backdrop(props) {
    const content = (
        <div
            className="absolute z-50 bg-gray-900 opacity-50 w-full h-screen"
            onClick={props.onClick}
        ></div>
    );
    return createPortal(content, document.getElementById("backdrop"));
}
