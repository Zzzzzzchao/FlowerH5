import { get } from './helpers'

const getSeller = get('api/seller')
const getGoods = get('mall/goods/tree')
const getRatings = get('api/ratings')

export {
  getSeller,
  getGoods,
  getRatings
}
