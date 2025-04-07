import { useNavigate } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
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
                                <NavigationMenuLink onClick={handleChatClick}>
                                    Chat
                                </NavigationMenuLink>
                                <NavigationMenuLink onClick={handleAboutClick}>
                                    About
                                </NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    );
};

export default Header;
