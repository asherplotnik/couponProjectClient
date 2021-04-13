import { useState } from "react";
import "./Menu.css";

interface MenuProps {
  menu: string[];
  select: Function;
}
function Menu(props: MenuProps): JSX.Element {
  const handleSelect = (id: number) => {
    props.select(id);
  };
  const handleHover = (item: number) => {
    setItemHovered(item);
  };
  const [itemHovered, setItemHovered] = useState(-1);
  return (
    <div className="Menu">
      {props.menu.map((item, index) => {
        return (
          <div
            key={index + 1}
            className={itemHovered == index + 1 ? "HoveredItem" : ""}
            onMouseEnter={() => handleHover(index + 1)}
            onMouseLeave={() => handleHover(-1)}
            onClick={() => handleSelect(index + 1)}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

export default Menu;
