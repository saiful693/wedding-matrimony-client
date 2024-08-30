import { Footer, FooterBrand, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from 'flowbite-react';
import logo from '../../../assets/images/main-logo.png'
import { FaFacebook, FaGithub, FaTwitter } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';


const WebFooter = () => {
    return (
        <Footer container className='mt-20 lg:h-[50vh] bg-[#151c29] !text-white'>
            <div className="w-full md:px-32">
                <div className="grid w-full sm:flex sm:justify-between md:flex md:grid-cols-1">
                    <div className='!text-white w-1/3'>
                        <FooterBrand className=''
                            href="/"
                            src={logo}
                            alt="Flowbite Logo"
                            name="Niqah"
                        />
                    </div>
                    <div className="grid flex-1 !text-white grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <FooterTitle title="about" />
                            <FooterLinkGroup col>
                                <FooterLink href="#">Niqah</FooterLink>
                                <FooterLink href="#">Contact Us</FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title="Follow us" />
                            <FooterLinkGroup col>
                                <FooterLink href="#">Github</FooterLink>
                                <FooterLink href="#">Discord</FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title="Legal" />
                            <FooterLinkGroup col>
                                <FooterLink href="#">Privacy Policy</FooterLink>
                                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
                            </FooterLinkGroup>
                        </div>
                    </div>
                </div>
                <FooterDivider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <FooterCopyright href="#" by="Niqah™" year={2024} />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <FooterIcon href="#" icon={FaFacebook} />
                        <FooterIcon href="#" icon={FiInstagram} />
                        <FooterIcon href="#" icon={FaTwitter} />
                        <FooterIcon href="#" icon={FaGithub} />
                    </div>
                </div>
            </div>
        </Footer>
    );
};

export default WebFooter;