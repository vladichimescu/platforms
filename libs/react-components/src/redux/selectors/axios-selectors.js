import { createSelector } from "reselect"

const selectAxiosStore = (state) => state.axios

const selectAxiosLoading = createSelector(
  selectAxiosStore,
  (axios) => axios.loading
)

const selectAxiosData = createSelector(selectAxiosStore, (axios) => axios.data)

export { selectAxiosLoading, selectAxiosData }
