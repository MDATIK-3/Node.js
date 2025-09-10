import { NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="flex gap-4 p-4 bg-gray-100 shadow">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "text-blue-600 font-bold" : "text-gray-700"
                }
            >
                Home
            </NavLink>

            <NavLink
                to="/createPage"
                className={({ isActive }) =>
                    isActive ? "text-blue-600 font-bold" : "text-gray-700"
                }
            >
                Create
            </NavLink>
        </nav>
    )
}
