// articlesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

const API_KEY = 'cee16085ae9a4c68a658b03c2425b91e';
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ category }, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apiKey: API_KEY,
          country: 'us',
          category: category !== 'All' ? category.toLowerCase() : ''
        }
      });
      // Add unique ids to articles
      return response.data.articles.map(article => ({ ...article, id: uuidv4() }));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue('Unauthorized: Invalid API key');
      }
      return rejectWithValue('Failed to fetch articles');
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    favorites: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favorites.find(article => article.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(article => article.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addFavorite, removeFavorite } = articlesSlice.actions;

export default articlesSlice.reducer;


//best 
/*import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_KEY = 'cee16085ae9a4c68a658b03c2425b91e'; // Replace with your actual API key cee16085ae9a4c68a658b03c2425b91e  a21cb9677f1a44b0bd3c05b6ed46b491
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ category }, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apiKey: API_KEY,
          country: 'us',
          category: category !== 'All' ? category.toLowerCase() : ''
        }
      });
      return response.data.articles;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue('Unauthorized: Invalid API key');
      }
      return rejectWithValue('Failed to fetch articles');
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    favorites: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favorites.find(article => article.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(article => article.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addFavorite, removeFavorite } = articlesSlice.actions;

export default articlesSlice.reducer;*/




/* worked well2 import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'a21cb9677f1a44b0bd3c05b6ed46b491'; // Replace with your actual API key
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ category }, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apiKey: API_KEY,
          country: 'us',
          category: category !== 'All' ? category.toLowerCase() : ''
        }
      });
      return response.data.articles;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue('Unauthorized: Invalid API key');
      }
      return rejectWithValue('Failed to fetch articles');
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    favorites: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(article => article.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addFavorite, removeFavorite } = articlesSlice.actions;

export default articlesSlice.reducer;*/



/* working well import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Replace with your NewsAPI key
const API_KEY = 'a21cb9677f1a44b0bd3c05b6ed46b491';
const BASE_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
  const response = await axios.get(`${BASE_URL}&country=us`);
  return response.data.articles;
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    favorites: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(article => article.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addFavorite, removeFavorite } = articlesSlice.actions;

export default articlesSlice.reducer;*/




/*// src/redux/articlesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'YOUR_NEWSAPI_KEY'; // Replace with your NewsAPI key

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async () => {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    return response.data.articles;
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default articlesSlice.reducer;*/





//https://timesofindia.indiatimes.com/topic/url-link/news
/*// src/redux/articlesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async () => {
    const response = await axios.get('YOUR_NEWS_API_ENDPOINT');
    return response.data.articles;
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default articlesSlice.reducer;*/
