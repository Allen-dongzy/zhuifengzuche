import storage from '@/utils/storage'
import {
	regionCityFindAllCity,
	regionCityFindHotCity,
	regionCityFindCityByLatLng
} from '@/apis/regionCity'
import ChinesePY from '@/utils/ChinesePY.min'
import {
	getLocation
} from '@/utils/uni-tools'

const city = {
	namespaced: true,
	state: {
		alphabet: [
			"area",
			"hot",
			"A",
			"B",
			"C",
			"D",
			"E",
			"F",
			"G",
			"H",
			"J",
			"K",
			"L",
			"M",
			"N",
			"P",
			"Q",
			"R",
			"S",
			"T",
			"W",
			"X",
			"Y",
			"Z"
		], // 城市首字母列表
		currentCity: {}, // 当前城市
		hotCity: [], // 热门城市
		allCity: {
			A: [],
			B: [],
			C: [],
			D: [],
			E: [],
			F: [],
			G: [],
			H: [],
			I: [],
			J: [],
			K: [],
			L: [],
			M: [],
			N: [],
			O: [],
			P: [],
			Q: [],
			R: [],
			S: [],
			T: [],
			U: [],
			V: [],
			W: [],
			X: [],
			Y: [],
			Z: [],
		}, // 所有城市
	},
	mutations: {
		// 设置所有城市
		setAllCity(state, allCity) {
			state.allCity = allCity
			storage.set('allCity', allCity)
		},
		// 设置热门城市
		setHotCity(state, hotCity) {
			state.hotCity = hotCity
			storage.set('hotCity', hotCity)
		},
		// 设置当前城市
		setCurrentCity(state, currentCity) {
			state.currentCity = currentCity
			storage.set('currentCity', currentCity)
		}
	},
	actions: {
		// 获取所有城市
		async getAllCity({
			state,
			commit
		}) {
			const allCity = storage.get('allCity')
			if (allCity && Object.keys(allCity).length > 0) {
				commit('setAllCity', allCity)
				return
			}
			const [err, res] = await regionCityFindAllCity()
			if (err) return
			const cityList = state.allCity
			res.data.forEach(item => {
				const cityFirstLetter = ChinesePY.GetJP(item.name)[0]
				cityList[cityFirstLetter].push(item)
			})
			commit('setAllCity', cityList)
		},
		// 获取热门城市
		async getHotCity({
			commit
		}) {
			const hotCity = storage.get('hotCity')
			if (hotCity && Object.keys(hotCity).length > 0) {
				commit('setHotCity', hotCity)
				return
			}
			const [err, res] = await regionCityFindHotCity()
			if (err) return
			commit('setHotCity', res.data)
		},
		// 获取当前城市
		async getCurrentCity({
			commit
		}) {
			const currentCity = storage.get('currentCity')
			if (currentCity && Object.keys(currentCity).length > 0) {
				commit('setCurrentCity', currentCity)
				return
			}
			// 获取位置
			const [locationErr, locationRes] = await getLocation()
			// 获取城市信息
			const params = {
				lat: locationRes.lat,
				lng: locationRes.lng
			}
			const [err, res] = await regionCityFindCityByLatLng(params)
			if (err) return
			commit('setCurrentCity', res.data)
		}
	}
}

export default city
