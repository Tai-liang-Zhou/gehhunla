import { Link, NavLink } from 'react-router-dom';
import { Flower } from './Illustrations';

export default function SiteHeader() {
  return <header className="site-header">
    <Link className="wordmark" to="/seating"><span>ㄍㄟˋ婚啦</span><Flower className="wordmark-flower"/></Link>
    <nav className="site-nav" aria-label="主要導覽">
      <NavLink to="/seating">桌次查詢</NavLink>
      <NavLink to="/photos">照片欣賞</NavLink>
    </nav>
  </header>;
}
