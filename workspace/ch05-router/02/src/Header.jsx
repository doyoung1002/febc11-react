import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <>
      <header>
        <h1>리액트 라우터 - 02</h1>

        <NavLink
          className={({ isActive }) => (isActive ? 'menu-dark' : 'menu')}
          to='/home'
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'menu-dark' : 'menu')}
          to='/about'
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'menu-dark' : 'menu')}
          to='/list'
        >
          TodoList
        </NavLink>

        {/* <Link to='/'>home</Link>
        <br />
        <Link to='/page1'>page1</Link>
        <br />
        <Link to='/page2'>page2</Link> */}
      </header>
    </>
  );
}

export default Header;
