import React from 'react';

export default function ThemeToggle({ theme, onToggle }) {
  const dark = theme === 'dark';
  return (
    <button className="theme-toggle" type="button" onClick={onToggle} aria-label={dark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'} title={dark ? 'Світла тема' : 'Темна тема'}>
      <span aria-hidden="true">{dark ? '☼' : '◐'}</span>
    </button>
  );
}
