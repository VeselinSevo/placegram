import React, { useEffect } from "react";
import Modal from "./Modal";
import Option from "./Option";
import { disableBodyScroll, enableBodyScroll } from "../../util/bodyScroll";

export default function OptionsModal({ options, onClose }) {
    useEffect(() => {
        disableBodyScroll();
        return () => enableBodyScroll();
    }, []);

    return (
        <Modal onClose={onClose} customClasses="!w-auto !p-0" disableHover>
            {options.map((option, index) => (
                <Option
                    key={index}
                    optionText={option.text}
                    onClick={() => {
                        option.onClick();
                    }}
                    style={option.style}
                    isLast={index === options.length - 1}
                />
            ))}
        </Modal>
    );
}
