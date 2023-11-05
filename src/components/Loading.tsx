import loading from '../assets/hugging-grogu.gif';

export default function Loading() {
  return (
    <div className="loading">
      <img src={loading} alt="loading..." />
      <div className="text-style">Loading...</div>
    </div>
  );
}
