import { Link } from "react-router-dom"
function Sitelogo() {
    return(
        <Link to={'/'} className="flex items-center">
            <img src={require(`../assets/images/logo.png`)} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">My Cart</span>

       </Link>
    )
}
export default Sitelogo;