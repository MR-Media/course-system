import { Link } from "react-router-dom";

import "./NavBar.css";

const NAV_ITEMS = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "Users",
    link: "/users",
  },
];

interface NavItemProps {
  link: string;
  text: string;
}

const NavItem = ({ link, text }: NavItemProps) => {
  return (
    <li>
      <Link to={link}>{text}</Link>
    </li>
  );
};

export const NavBar = () => {
  return (
    <nav>
      <ul>
        {NAV_ITEMS.map((item) => {
          return <NavItem text={item.text} link={item.link} />;
        })}
      </ul>
    </nav>
  );
};
