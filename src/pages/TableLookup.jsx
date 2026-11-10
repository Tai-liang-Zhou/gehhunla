import { useState } from 'react';
import SiteHeader from '../components/SiteHeader';
import guests from '../../data/guests.json';
import { lookupGuest } from '../lib/guests';
import { Flower, TableIllustration } from '../components/Illustrations';
export default function TableLookup() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [guest, setGuest] = useState(null);
  function lookup(event) {
    event.preventDefault();
    const result = lookupGuest(guests, name);
    setGuest(result.guest ?? null);
    setMessage(result.message ?? '');
    setStatus(result.guest ? 'success' : 'error');
  }
  function changeName(event) { setName(event.target.value); setStatus('idle'); setGuest(null); setMessage(''); }
  return <div className="site-shell">
    <SiteHeader />
    <main className="seating-page">
      <section className="main-layout" aria-labelledby="page-title">
        <div className="lookup-card">
          {/* <div className="card-tape" aria-hidden="true"/> */}
          <h2>確認座位與人數</h2>
          <p className="card-description">輸入姓名或代表報名的家人姓名</p>
          <form onSubmit={lookup} noValidate>
            <label htmlFor="guest-name">你的姓名</label>
            <div className={`input-wrap ${status === 'error' ? 'invalid' : ''}`}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M5 21v-3a7 7 0 0 1 14 0v3"/></svg><input id="guest-name" autoComplete="name" maxLength={80} placeholder="請輸入完整姓名" value={name} onChange={changeName} aria-invalid={status === 'error'} aria-describedby={status === 'error' ? 'lookup-message' : 'name-help'}/></div>
            <button type="submit" ><span>查詢</span><span aria-hidden="true">↗</span></button>
          </form>
          <div className="result-area" aria-live="polite" aria-atomic="true">
            {status === 'error' ? <p id="lookup-message" className="error-message">{message}</p> : guest ? <div className="guest-result"><p>歡迎你，<strong>{guest.name}</strong>！</p><div className="result-numbers"><div><span>你的桌次</span><strong>{guest.tableNumber}{!String(guest.tableNumber).includes('主桌') && <small> 桌</small>}</strong></div><div><span>出席人數</span><strong>{guest.partySize}<small> 位</small></strong></div></div></div> : <div className="empty-result"><TableIllustration/></div>}
          </div>
        </div>
      </section>
    </main>
    <footer className="site-footer">
      <div className="closing-note"><span className="line"/><Flower className="footer-flower"/><span>謝謝你前來參加</span><span className="line"/></div>
      </footer>
  </div>;
}
