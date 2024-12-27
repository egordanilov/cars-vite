import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface Article {
    id: string;
    title: string;
    content: string;
    url: string;
}

interface NewsState {
    articles: Article[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Initial state
const initialState: NewsState = {
    articles: [],
    status: 'idle',
    error: null,
};

// Async thunk to fetch articles (infinite scroll)
export const fetchArticles = createAsyncThunk<Article[], { page: number }>(
    'news/fetchArticles',
    async ({ page }) => {
        const response = await fetch(`/api/news?page=${page}`);
        const data = await response.json();
        return data;
    }
);

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        addArticle(state, action: PayloadAction<Article>) {
            state.articles.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.articles = [...state.articles, ...action.payload]; // Append new articles
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message!;
            });
    },
});

export const { addArticle } = newsSlice.actions;

// Selectors
export const selectAllArticles = (state: RootState) => state.news.articles;

export default newsSlice.reducer;