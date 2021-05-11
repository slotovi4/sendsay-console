export const getPrettyRequestData = (requestData: IRequestJson) => JSON.stringify(requestData, undefined, 4);

export const parseRequestValue = ({ value, setIsInvalid }: IParseValueData) => {
	let requestData: IRequestJson | null = null;

	try {
		if (value) {
			requestData = JSON.parse(value);
		}

		setIsInvalid(false);
	} catch {
		setIsInvalid(true);
	}

	return requestData;
};

interface IParseValueData {
	value: string;
	setIsInvalid: (valid: boolean) => void;
}

interface IRequestJson {
	[key: string]: string;
}