import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return <main className="not-found container"><span>404</span><div className="eyebrow">ЗДАЄТЬСЯ, МИ ЗБИЛИСЯ З ШЛЯХУ</div><h1>Такої сторінки<br /><em>не знайдено.</em></h1><p>Можливо, посилання застаріло або сторінку переміщено.</p><Link className="button" to="/">На головну ↗</Link></main>;
}
