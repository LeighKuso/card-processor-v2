import { Link } from "@remix-run/react";

export default function Layout({ children }) {
    return (
        <div
            id="remix-card-processor"
            className="h-screen grid grid-rows-[10%_auto_50px] gap-2 md:grid-rows-[auto_50px] md:grid-cols-[max-content_auto]">
            <header className="flex justify-end items-center h-full border-2 md:flex-col md:h-full md:justify-center md:row-span-2 md:max-w-max">
                <nav aria-label="Main navigation" className="w-full md:w-auto md:h-2/3">
                    <ul className="flex md:flex-col md:h-full">
                        <li className="mx-4 px-3 py-1 bg-gray-200 rounded md:my-4 md:px-0 md:border-b-2 md:border-b-gray-600 md:rounded-none md:bg-transparent">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="mx-4 px-3 py-1 bg-gray-200 rounded md:my-4 md:px-0 md:border-b-2 md:border-b-gray-600 md:rounded-none md:bg-transparent">
                            <Link to="/cards">Validate Card</Link>
                        </li>
                        <li className="mx-4 px-3 py-1 bg-gray-200 rounded md:my-4 md:px-0 md:border-b-2 md:border-b-gray-600 md:rounded-none md:bg-transparent">
                            <Link to="/countries">Configure Countries</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="h-full">
                <div className="p-2">{children}</div>
            </div>
            <footer className="h-10 w-full text-xs flex self-end">
                <div className="">
                    <p>&copy; Ashleigh</p>
                </div>
            </footer>
        </div>
    );
}