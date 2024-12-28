import React, { Suspense } from 'react';
import { Route, Routes} from 'react-router';
import './styles/index.scss';
import { ArticlePageAsync } from "./pages/ArticlePage/ArticlePage.async";
import {MainPageAsync} from "./pages/MainPage/MainPage.async";
import {useTheme} from "./theme/useTheme";
import {Header} from "./shared/Header/Header";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
      <main className={`app ${theme}`}>
        <Header/>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={'/'} element={<MainPageAsync/>}/>
            <Route path={'/:newsUrl'} element={<ArticlePageAsync/>}/>
          </Routes>
        </Suspense>
      </main>

  );
};

export default App;
