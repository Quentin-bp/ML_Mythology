import './Header.css';

function Header({title, children}) {
    return (
        <div className="page-bar">
            <div className="title">{title}</div>
            <div className="buttons">{children}</div>
        </div>
    )
}

export default Header;