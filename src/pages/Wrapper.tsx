import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Wrapper() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/pages/1', { replace: true });
  });
  return <div>Wrapper</div>;
}
