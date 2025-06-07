import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
    const location = useLocation();

    // Tách đường dẫn thành từng phần
    const paths = location.pathname.split("/").filter((x) => x);

    return (
        <nav className="text-sm breadcrumbs text-gray-600 my-4">
            <ul className="flex space-x-2">
                <li>
                    <Link to="/" className="hover:underline text-blue-500">Home</Link>
                </li>
                {paths.map((path, index) => {
                    const routeTo = `/${paths.slice(0, index + 1).join("/")}`;
                    const isLast = index === paths.length - 1;

                    return (
                        <li key={routeTo} className="flex items-center space-x-1">
                            <span className="mx-1">/</span>
                            {isLast ? (
                                <span className="text-gray-500 capitalize">{decodeURIComponent(path)}</span>
                            ) : (
                                <Link to={routeTo} className="hover:underline text-blue-500 capitalize">
                                    {decodeURIComponent(path)}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
