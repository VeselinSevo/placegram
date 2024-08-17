import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faLinkedin,
    faXTwitter,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function SocialMediaLinks() {
    return (
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
    );
}
