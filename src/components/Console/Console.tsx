import React from 'react';
import {
	HistoryTrack,
	RequestSection,
	Header,
	IHeaderProps,
	Footer,
	getPrettyRequestData,
	parseRequestValue
} from 'components';
import styled from 'styled-components';
import clearIcon from './clearIcon.svg';

const RequestHistoryScrollContainer = styled.section`
	overflow-x: auto;

	::-webkit-scrollbar {
		display: none;
	}
`;

const RequestHistory = styled.section`
	padding: 10px 60px 10px 15px;
	display: flex;
	background: #F6F6F6;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	position: relative;
	height: 51px;
	float: left;
	min-width: 100%;
`;

const HistoryClearButton = styled.button`
	background: transparent;
	padding: 0;
	border: none;
	position: fixed;
	width: 50px;
	height: 50px;
	border-left: 1px solid #C4C4C4;
	right: 0;
	top: 51px;
	cursor: pointer;
	background: #F6F6F6;

	&::before {
		content: '';
		position: absolute;
		background: linear-gradient(269.93deg, #F6F6F6 0.06%, rgba(246, 246, 246, 0) 99.93%);
		width: 15px;
		height: 100%;
		top:0;
		left: -16px;
	}

	&::after {
		content: '';
		position: absolute;
		background: url(${clearIcon});
		background-repeat: no-repeat;
		background-position: center;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}
`;

const RequestContainer = styled.section`
	background: #FFFFFF;
	height: calc(100vh - 70px - 51px - 51px);
	padding: 10px 15px;
	position: relative;
`;

const Console = ({
	onLogout,
	subLogin,
	onRequest,
	response,
	onClearHistory,
	isRequestLoading,
	requestHistoryList,
	onDeleteRequestHistory
}: IProps) => {
	const consoleRef = React.useRef<HTMLElement | null>(null);
	const [requestValue, setRequestValue] = React.useState('');
	const [responseValue, setResponseValue] = React.useState('');
	const [isInvalidResponseData, setIsInvalidResponseData] = React.useState(false);
	const [isInvalidRequestData, setIsInvalidRequestData] = React.useState(false);

	React.useEffect(() => {
		if (response === null || response === '') {
			return;
		}

		const responseJsonData = parseRequestValue({
			value: response,
			setIsInvalid: setIsInvalidResponseData
		});

		if (responseJsonData !== null) {
			setResponseValue(getPrettyRequestData(responseJsonData));
		} else {
			setResponseValue('');
		}

		setIsInvalidResponseData(Boolean(requestHistoryList && !requestHistoryList[0].success));
	}, [response]);

	const sendRequest = (value: string) => {
		const requestJsonData = parseRequestValue({
			value,
			setIsInvalid: setIsInvalidRequestData
		});

		if (requestJsonData !== null) {
			onRequest({
				action: requestJsonData.action || '',
				id: requestJsonData.id || undefined
			});
		}
	};

	const onChangeRequestValue = (event: React.ChangeEvent<HTMLTextAreaElement> | undefined) => {
		const value = event?.target.value;

		if (value !== undefined) {
			setRequestValue(value);
		}
	};

	const onFormatRequest = () => {
		const requestJsonData = parseRequestValue({
			value: requestValue,
			setIsInvalid: setIsInvalidRequestData
		});

		if (requestJsonData !== null) {
			const prettyRequestValue = getPrettyRequestData(requestJsonData);

			setRequestValue(prettyRequestValue);
		}
	};

	const onSubmit = () => {
		sendRequest(requestValue);
	};

	const onRunHistoryTrack = (request: IHistoryTrack) => () => {
		setRequestValue(request.requestData);
		sendRequest(request.requestData);
	};

	const onClickHistoryTrack = (request: IHistoryTrack) => () => {
		setRequestValue(request.requestData);
	};

	const onDeleteHistoryTrack = (trackId: IHistoryTrack['id']) => () => {
		const isDelete = confirm('Удалить запрос?');

		if (isDelete) {
			onDeleteRequestHistory(trackId);
		}
	};

	const onClearTrackHistory = () => {
		const isClear = confirm('Очистить историю?');

		if (isClear) {
			onClearHistory();
		}
	};

	return (
		<section ref={consoleRef}>
			<Header
				subLogin={subLogin}
				onLogout={onLogout}
				parentRef={consoleRef}
			/>

			<RequestHistoryScrollContainer>
				<RequestHistory>
					{requestHistoryList?.map(request => (
						<HistoryTrack
							key={`historyTrack_${request.id}`}
							request={request}
							onClick={onClickHistoryTrack(request)}
							onRun={onRunHistoryTrack(request)}
							onDelete={onDeleteHistoryTrack(request.id)}
						/>
					))}

					{requestHistoryList?.length ? <HistoryClearButton title='Очистить историю' onClick={onClearTrackHistory} /> : null}
				</RequestHistory>
			</RequestHistoryScrollContainer>

			<RequestContainer>
				<RequestSection
					isInvalidRequestData={isInvalidRequestData}
					isInvalidResponseData={isInvalidResponseData}
					onChangeRequestValue={onChangeRequestValue}
					requestValue={requestValue}
					responseValue={responseValue}
				/>
			</RequestContainer>

			<Footer
				onSubmit={onSubmit}
				isRequestLoading={isRequestLoading}
				onFormatRequest={onFormatRequest}
			/>
		</section>
	);
};

export default React.memo(Console);

interface IProps {
	subLogin: IHeaderProps['subLogin'];
	isRequestLoading: boolean;
	response: string | null;
	requestHistoryList: IHistoryTrack[] | null;
	onLogout: IHeaderProps['onLogout'];
	onClearHistory: () => void;
	onRequest: (data: IRequestData) => void;
	onDeleteRequestHistory: (id: IHistoryTrack['id']) => void;
}

interface IRequestData {
	action: string;
	id?: string;
}

interface IHistoryTrack {
	success: boolean;
	requestData: string;
	action: string;
	id: string;
}