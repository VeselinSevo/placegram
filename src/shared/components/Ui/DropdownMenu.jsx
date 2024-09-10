import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const DropdownMenu = ({ onEdit, onDelete, onHide, onClose }) => {
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div
            ref={menuRef}
            className="absolute right-0 mt-2 w-48 bg-bg dark:bg-bg-dark rounded-md shadow-lg z-10"
        >
            <ul className="py-1">
                <li>
                    <button
                        onClick={onEdit}
                        className="block px-4 py-2 text-sm text-text dark:text-text-dark hover:bg-hover dark:hover:bg-hover-dark w-full text-left"
                    >
                        <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
                    </button>
                </li>
                <li>
                    <button
                        onClick={onDelete}
                        className="block px-4 py-2 text-sm text-text dark:text-text-dark hover:bg-hover dark:hover:bg-hover-dark w-full text-left"
                    >
                        <FontAwesomeIcon icon={faTrash} className="mr-2" />{" "}
                        Delete
                    </button>
                </li>
                <li>
                    <button
                        onClick={onHide}
                        className="block px-4 py-2 text-sm text-text dark:text-text-dark hover:bg-hover dark:hover:bg-hover-dark w-full text-left"
                    >
                        <FontAwesomeIcon icon={faEyeSlash} className="mr-2" />{" "}
                        Hide
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default DropdownMenu;
