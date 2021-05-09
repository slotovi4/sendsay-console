import React from 'react';
import {
	Button,
	HistoryTrack,
	RequestSection,
	Header,
	IHeaderProps
} from 'components';
import styled from 'styled-components';
import formatIcon from './formatIcon.svg';
import clearIcon from './clearIcon.svg';

const RequestHistory = styled.section`
	padding: 10px 15px;
	display: flex;
	background: #F6F6F6;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	position: relative;
	height: 51px;
	// overflow-y: hidden;
	// overflow-x: auto;

	// overflow-y: auto;
	// overflow-x: hidden;
	// transform: rotate(-90deg) translateY(-100px);
	// transform-origin: right top;
	// & > div {
	// 	display: block;
	// 	transform: rotate(90deg);
	// 	transform-origin: right top;
	// }

	// display: flex;
	// flex-wrap: nowrap;
	// overflow-x: auto;

	// & div > {
	// 	flex: 0 0 auto;
	// }

	// overflow-x: scroll;
	// overflow-y: hidden;
	// white-space: nowrap;

	// & div > {
	// 	display: inline-block;
	// }
`;

const HistoryClearButton = styled.button`
	background: transparent;
	padding: 0;
	border: none;
	position: absolute;
	width: 51px;
	height: 100%;
	border-left: 1px solid #C4C4C4;
	right: 0;
	top: 0;
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


const Footer = styled.footer`
	background: #FFFFFF;
	padding: 15px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const FooterLink = styled.a`
	color: #999999;
	font-size: 16px;
	line-height: 20px;
	text-decoration: none;
`;

const FormatButton = styled.button`
	font-size: 16px;
	line-height: 20px;
	background: transparent;
	padding: 0;
	border: none;
	position: relative;
	width: 158px;
	text-align: right;

	&::after {
		content: '';
		background: url(${formatIcon});
		width: 24px;
		height: 24px;
		position: absolute;
		left: 0;
		top: -3px;
	}
`;

const Console = ({
	onLogout,
	subLogin,
	onRequest,
	response,
	isRequestLoading,
	requestHistoryList,
	onDeleteRequestHistory
}: IProps) => {
	const consoleRef = React.useRef<HTMLElement | null>(null);
	const firstUpdate = React.useRef(true);
	const isInvalidResponseData = Boolean(!firstUpdate.current && requestHistoryList && requestHistoryList.length ? !requestHistoryList[0].success : false);
	const [requestValue, setRequestValue] = React.useState('');
	const [isInvalidRequestData, setIsInvalidRequestData] = React.useState(false);

	const onSendRequest = (request: IRequestData) => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
		}

		onRequest(request);
	};

	const onChangeRequestValue = (event: React.ChangeEvent<HTMLTextAreaElement> | undefined) => {
		const value = event?.target.value;

		if (value !== undefined) {
			setRequestValue(value);
		}
	};

	const onFormatRequest = () => {
		const requestData = JSON.parse(requestValue);
		const prettyRequestData = JSON.stringify(requestData, undefined, 4);

		setRequestValue(prettyRequestData);
	};

	const onSubmit = () => {
		let requestData = null;

		try {
			requestData = JSON.parse(requestValue);
			setIsInvalidRequestData(false);
		} catch {
			setIsInvalidRequestData(true);
		}

		if (requestData) {
			onSendRequest({
				action: requestData.action || '',
				id: requestData.id || undefined
			});
		}
	};

	const onClickHistoryTrack = (request: IHistoryTrack) => () => {
		setRequestValue(request.payload);
	};

	const onRunHistoryTrack = (request: IHistoryTrack) => () => {
		onSendRequest({ action: request.action, id: request.id });
	};

	const onDeleteHistoryTrack = (trackId: IHistoryTrack['id']) => () => {
		onDeleteRequestHistory(trackId);
	};

	return (
		<section ref={consoleRef}>
			<Header
				subLogin={subLogin}
				onLogout={onLogout}
				parentRef={consoleRef}
			/>

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

				{requestHistoryList?.length ? <HistoryClearButton /> : null}
			</RequestHistory>

			<RequestContainer>
				<RequestSection
					isInvalidRequestData={isInvalidRequestData}
					isInvalidResponseData={isInvalidResponseData}
					onChangeRequestValue={onChangeRequestValue}
					requestValue={requestValue}
					responseValue={response || ''}
				/>
			</RequestContainer>

			<Footer>
				<Button onClick={onSubmit} isLoading={isRequestLoading} type='button'>Отправить</Button>
				<FooterLink href='#'>@link-to-your-github</FooterLink>
				<FormatButton onClick={onFormatRequest}>Форматировать</FormatButton>
			</Footer>
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
	onRequest: (data: IRequestData) => void;
	onDeleteRequestHistory: (id: IHistoryTrack['id']) => void;
}

interface IRequestData {
	action: string;
	id?: string;
}

interface IHistoryTrack {
	success: boolean;
	payload: string;
	response: string;
	action: string;
	id: string;
}