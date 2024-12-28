import  { Suspense } from 'react';
import { Route, Routes} from 'react-router';
import './styles/index.scss';
import {useTheme} from "./theme/useTheme";

import {Header} from "@/shared";
// @ts-ignore
import {MainPageAsync, ArticlePageAsync} from '@/pages';


const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
      <main className={`app ${theme}`}>
        <Header/>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={'/'} element={<MainPageAsync/>}/>
            <Route path={'*'} element={<ArticlePageAsync/>}/>
          </Routes>
        </Suspense>
      </main>

  );
};

export default App;
