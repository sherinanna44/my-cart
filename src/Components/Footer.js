import { Link } from "react-router-dom";
import Sitelogo from "./Sitelogo";
function Footer() {
    return(
        

<footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Sitelogo/>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                 <li>
                <Link to={'/aboutus'} className="hover:underline me-4 md:me-6">About Us</Link>
                </li>
                
                <li>
                    <a  className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a  className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                              <Link to={'/contactus'} className="hover:underline me-4 md:me-6">Contact</Link>
                              </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024  <Link to={'/'} className="hover:underline">My Cart</Link>. All Rights Reserved.</span>
    </div>
</footer>
    );
}
export default Footer;