import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './slice/tokenSlice'
import hideTabsReducer from './slice/hideTabsSlice'

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    hideTabs: hideTabsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
