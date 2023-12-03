import Cards from '../components/Cards';

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="home-page-header">
        <h2>Result Forms</h2>
      </div>
      <div className="home-page-content-wrapper">
        <div className="home-page-content">
          <Cards />
        </div>
      </div>
    </div>
  );
}
