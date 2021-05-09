import { IHistoryRequest } from 'reducers';

const requestHistoryKey = 'requestHistoryList';

/**
 * Сохраняет историю запросов в localStorage
 * @param requestHistoryList история запросов
 */
export const saveHistoryRequestList = (requestHistoryList: IHistoryRequest[]) => {
	const limitedRequestHistoryList = [...requestHistoryList];

	if (limitedRequestHistoryList.length > 20) {
		limitedRequestHistoryList.splice(20);
	}

	const newRequestHistoryList = JSON.stringify(limitedRequestHistoryList);

	localStorage.setItem(requestHistoryKey, newRequestHistoryList);
};

/**
 * Возвращает историю запросов из localStorage
 * @returns история запросов
 */
export const getRequestHistoryList = () => {
	const localData = localStorage.getItem(requestHistoryKey);

	if (localData) {
		return JSON.parse(localData) as IHistoryRequest[];
	}

	return null;
};

/**
 * Очищает историю запросов из localStorage
 */
export const clearRequestHistoryList = () => {
	localStorage.removeItem(requestHistoryKey);
};