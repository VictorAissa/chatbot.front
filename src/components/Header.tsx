import { useNavigate } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from './ui/navigation-menu';

const Header = () => {
    const navigate = useNavigate();
    const handleAboutClick = () => navigate('/about');
    const handleChatClick = () => navigate('/');

    return (
        <header className="flex justify-between px-10 py-4">
            <p className=" flex items-center text-xl font-light">
                LaMontagne/Chatbot
            </p>
            <div className="flex gap-3">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="flex flex-col p-2 min-w-40">
                                    <li
                                        className="p-2 cursor-pointer hover:bg-gray-100"
                                        onClick={handleChatClick}
                                    >
                                        Chat
                                    </li>
                                    <li
                                        className="p-2 cursor-pointer hover:bg-gray-100"
                                        onClick={handleAboutClick}
                                    >
                                        About
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    );
};

export default Header;
