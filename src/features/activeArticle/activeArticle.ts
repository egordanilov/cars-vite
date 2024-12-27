import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface Article {
    id: string;
    title: string;
    content: string;
    url: string;
}

interface ActiveArticleState {
    article: Article | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ActiveArticleState = {
    article: null,
    status: 'idle',
    error: null,
};

// Fetch specific article
export const fetchSpecificArticle = createAsyncThunk<Article, string>(
    'activeArticle/fetchSpecificArticle',
    async (newsUrl) => {
        const response = await fetch(`/api/news/${newsUrl}`);
        const data = await response.json();
        return data;
    }
);

const activeArticleSlice = createSlice({
    name: 'activeArticle',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpecificArticle.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSpecificArticle.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.article = action.payload;
            })
            .addCase(fetchSpecificArticle.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message!;
            });
    },
});

// Selectors
export const selectActiveArticle = (state: RootState) => state.activeArticle.article;

export default activeArticleSlice.reducer;