
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PostsPage } from '../pages';

const RouterManager = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PostsPage />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default RouterManager;