import { forwardRef } from "react";

import CopyRight from "./Copyright";
import FooterLinks from "./FooterLinks";
import Logo from "./Logo";
import SocialMediaLinks from "./SocialMediaLinks";

const Footer = forwardRef((props, ref) => {
    return (
        <footer
            ref={ref}
            className="bg-bg dark:bg-bg-dark py-8 border-t border-border dark:border-border-dark"
        >
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <Logo />
                    <FooterLinks />
                    <SocialMediaLinks />
                </div>
                <CopyRight />
            </div>
        </footer>
    );
});

export default Footer;
