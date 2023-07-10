import { Link } from "@remix-run/react";

const linkItemsClasses = "mx-2 px-2 py-1 md:my-4 md:px-0 md:border-b-2 md:border-b-gray-600 md:rounded-none md:bg-transparent";

export default function Layout({ children }) {
    return (
        <div
            id="remix-card-processor"
            className="h-screen grid grid-rows-[10%_auto_50px] gap-2 md:grid-rows-[auto_50px] md:grid-cols-[max-content_auto]"
            >
            <header className="flex justify-end items-center h-full border-bottom-2 md:border-r-2 md:flex-col md:h-full md:justify-center md:row-span-2 md:max-w-max">
                <nav aria-label="Main navigation" className="w-full md:w-auto md:h-2/3">
                    <ul className="flex justify-end w-full divide-x-2 md:flex-col md:justify-center md:h-full md:divide-x-0">
                        <li className={linkItemsClasses}>
                            <Link to="/">Home</Link>
                        </li>
                        <li className={linkItemsClasses}>
                            <Link to="/cards">Validate Card</Link>
                        </li>
                        <li className={linkItemsClasses}>
                            <Link to="/countries">Configure Countries</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="h-full">
                <div className="p-2 h-full">{children}</div>
            </div>
            <footer className="h-10 w-full text-xs flex justify-center">
                <div>
                    <p>&copy; Ashleigh Davidson</p>
                </div>
            </footer>
        </div>
    );
}