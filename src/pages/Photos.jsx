import SiteHeader from '../components/SiteHeader';
import { Flower } from '../components/Illustrations';
import weddingPhoto from '../img/DSC_2831_(2).jpg';

export default function Photos() {
  return <div className="site-shell">
    <SiteHeader />
    <main className="photos-page" aria-labelledby="photos-title">
      <h1 id="photos-title">照片欣賞</h1>
      <div className="photo-keepsake">
        <span className="photo-spark photo-spark-left" aria-hidden="true">✧</span>
        <Flower className="photo-flower photo-flower-left" />
        <figure className="photo-print">
          <span className="card-tape" aria-hidden="true" />
          <img src={weddingPhoto} alt="新娘手持花束，從身後擁抱坐在椅子上的新郎，兩人開心微笑" width="3907" height="5872" />
        </figure>
        <Flower className="photo-flower photo-flower-right" />
        <svg className="photo-squiggle" viewBox="0 0 100 60" fill="none" aria-hidden="true"><path d="M5 45c18-40 45-35 51-20s-23 24-25 4S62 0 75 15s-3 31 19 35" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg>
      </div>
      <div className="photos-coming-soon">
        <span className="photos-status">還沒做好 ੭ ᐕ)੭</span>
        <div className="photos-dots" aria-hidden="true"><i/><i/><i/></div>
      </div>
    </main>
    <footer className="site-footer"><div className="closing-note"><span className="line"/><Flower className="footer-flower"/><span>謝謝你來參加</span><span className="line"/></div></footer>
  </div>;
}
