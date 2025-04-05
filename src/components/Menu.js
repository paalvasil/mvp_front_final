import { useState } from "react";
import { useNavigate } from 'react-router';

export default function Menu() {   
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();
 
    const menuItems = [
        { name: "Início", path: "/" },
        { name: "Cadastro de Cerveja", path: "/add-beer" },
        { name: "Ranking de Cervejas", path: "/ranking" },
        { name: "Fale Conosco", path: "/contact-us" },
    ];

    return (
        <div className="menu">
            <div className="menu-items">
                {menuItems.map((item) => (
                    <div
                        key={item.name}
                        className={`${item.name} ${selectedItem === item.name ? "selected" : ""}`}
                        onClick={() => {
                            setSelectedItem(item.name); 
                            navigate(item.path); 
                        }}>
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
}