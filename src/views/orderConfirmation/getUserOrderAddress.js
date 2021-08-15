import { ref } from 'vue'
import { get } from '../../utils/request'

export const getUserOrderAddress = () => {
  const userMessage = ref([])

  const getAddress = async () => {
    const result = await get('/api/user/address/')
    if (result.error === 0 && result.length !== 0) {
      userMessage.value = result.data
    }
  }
  getAddress()
  return { userMessage, getAddress }
}
