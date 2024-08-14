import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faLinkedin,
    faXTwitter,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-800 py-8 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo and Company Name */}
                    <div className="mb-6 md:mb-0">
                        <a
                            href="/"
                            className="flex items-center space-x-3 rtl:space-x-reverse"
                        >
                            <img
                                src="logo/logo.png"
                                className="h-12"
                                alt="Logo"
                            />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">
                                Places Tracker
                            </span>
                        </a>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
                        <a
                            href="#"
                            className="text-gray-600 dark:text-gray-400 hover:underline"
                        >
                            About
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 dark:text-gray-400 hover:underline"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 dark:text-gray-400 hover:underline"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 dark:text-gray-400 hover:underline"
                        >
                            Contact
                        </a>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                            <FontAwesomeIcon icon={faFacebook} />
                            <span className="sr-only">Facebook</span>
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                            <FontAwesomeIcon icon={faXTwitter} />
                            <span className="sr-only">Twitter</span>
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                            <FontAwesomeIcon icon={faInstagram} />
                            <span className="sr-only">Instagram</span>
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                            <FontAwesomeIcon icon={faLinkedin} />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
                    © 2024 Places Tracker. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
