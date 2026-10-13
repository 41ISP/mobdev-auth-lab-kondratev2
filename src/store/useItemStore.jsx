import { create } from 'zustand'
import api from '../api'

export const useItemStore = create((set) => ({
  items: [],

  getItems: async () => {
    try {
      const data = await api.getItems()
      if (Array.isArray(data)) {
        set({ items: data })
      }
    } catch (error) {
      console.error(error)
    }
  },
}))