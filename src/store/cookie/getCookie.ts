export const getCookie = (name: string) => {
	const value = `; ${document.cookie}`;
	const partsList = value.split(`; ${name}=`);
	
	if (partsList.length === 2) {
		return partsList.pop()?.split(';').shift();
	}

	return undefined;
};