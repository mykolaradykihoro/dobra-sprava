import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';

export default function Header({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" onClick={close} aria-label="Добра Справа — на головну">
          <span className="brand-mark" aria-hidden="true">д</span>
          <span className="brand-name">добра<span>справа</span><small>ПЛАТФОРМА ДОБРИХ ІНІЦІАТИВ</small></span>
        </Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
          <span className="sr-only">{open ? 'Закрити меню' : 'Відкрити меню'}</span><i /><i /><i />
        </button>
        <nav id="main-navigation" className={`main-nav ${open ? 'main-nav--open' : ''}`} aria-label="Головна навігація">
          <NavLink to="/" end onClick={close}>Головна</NavLink>
          <NavLink to="/catalog" onClick={close}>Збори</NavLink>
          <NavLink to="/contacts" onClick={close}>Контакти</NavLink>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <Link to="/catalog" className="button button--small" onClick={close}>Підтримати  ↗</Link>
        </nav>
      </div>
    </header>
  );
}
