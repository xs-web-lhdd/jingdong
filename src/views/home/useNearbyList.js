import { ref } from 'vue'
import { get } from '../../utils/request'

export const useNearbyList = () => {
  const loading = ref(true)
  const nearbyList = ref([])
  const getNearBylist = async () => {
    const result = await get('/api/shop/hot-list')
    if (result.error === 0 && result.length !== 0) {
      // 将附件商家的数据列表进行更新---用get到的数据进行替换
      nearbyList.value = result.data
      loading.value = false
    }
  }
  return { getNearBylist, nearbyList, loading }
}
