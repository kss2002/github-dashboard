import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import NotFoundPage from '../not-found';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
