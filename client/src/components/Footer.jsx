import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div>
          <Link className="brand brand--footer" to="/"><span className="brand-mark">д</span><span className="brand-name">добра<span>справа</span><small>ПЛАТФОРМА ДОБРИХ ІНІЦІАТИВ</small></span></Link>
          <p>Коли кожен робить маленький крок — разом ми змінюємо багато.</p>
        </div>
        <div className="footer-links"><strong>Навігація</strong><Link to="/catalog">Усі збори</Link><Link to="/contacts">Зв’язатися з нами</Link><Link to="/">Про платформу</Link></div>
        <div className="footer-note"><strong>Відкритість — це важливо</strong><p>Мета, прогрес і звіти про витрати зібрані в одному місці.</p><span className="footer-stamp">✳  ДОБРО ПОЧИНАЄТЬСЯ З ДІЇ</span></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 «Добра Справа»</span><span>Навчальний вебпроєкт · Варіант № 21</span><span className="demo-mark">ДЕМО · БЕЗ РЕАЛЬНИХ ПЛАТЕЖІВ</span></div>
    </footer>
  );
}
