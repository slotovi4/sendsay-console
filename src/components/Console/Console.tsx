import React from 'react';
import {
	Logo,
	Button,
	HistoryTrack,
	RequestSection
} from 'components';
import styled from 'styled-components';
import logoutIcon from './logoutIcon.svg';
import fullScreenIcon from './fullScreenIcon.svg';
import formatIcon from './formatIcon.svg';
import clearIcon from './clearIcon.svg';
import exitScreenIcon from './exitScreenIcon.svg';

const Header = styled.section`
	padding: 10px 15px;
	display: flex;
	justify-content: space-between;
	background: #F6F6F6;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Title = styled.span`
	font-size: 20px;
	line-height: 30px;
	display: block;
	margin-left: 20px;
`;

const SubLogin = styled.div`
	border: 1px solid rgba(0, 0, 0, 0.2);
	border-radius: 5px;
	padding: 3px 15px;
	font-size: 16px;
	line-height: 20px;
	margin-right: 30px;
`;

const SubLoginDots = styled.span`
	color: rgba(0, 0, 0, 0.2);
`;

const FlexContainer = styled.div`
	display: flex;
	align-items: center;
`;

const LogoutButton = styled.button`
	background: transparent;
	border: none;
	width: 82px;
	font-size: 16px;
	line-height: 24px;
	position: relative;
	text-align: left;
	padding: 0;
	cursor: pointer;

	&::after {
		content: '';
		background: url(${logoutIcon});
		width: 24px;
		height: 24px;
		position: absolute;
		right: 0;
	}
`;

const FullScreenButton = styled.div<IFullScreenButtonProps>`
	background: url(${props => props.fullScreen ? exitScreenIcon : fullScreenIcon});
	width: 20px;
	height: 20px;
	margin-left: 20px;
`;

const RequestHistory = styled.section`
	padding: 10px 15px;
	display: flex;
	background: #F6F6F6;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	position: relative;
	height: 51px;
`;

const HistoryClearButton = styled.button`
	background: transparent;
	padding: 0;
	border: none;
	position: absolute;
	width: 51px;
	height: 100%;
	background: url(${clearIcon});
	background-repeat: no-repeat;
    background-position: center;
	border-left: 1px solid #C4C4C4;
	right: 0;
	top: 0;
	cursor: pointer;

	&::after {
		content: '';
		position: absolute;
		background: linear-gradient(269.93deg, #F6F6F6 0.06%, rgba(246, 246, 246, 0) 99.93%);
		width: 15px;
		height: 100%;
		top:0;
		left: -16px;
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
	const isInvalidResponseData = Boolean(requestHistoryList && requestHistoryList.length ? !requestHistoryList[0].success : false);
	const [requestValue, setRequestValue] = React.useState('{"action":"track.get","id":"12345"}');
	const [isFullScreen, setIsFullScreen] = React.useState(window.innerHeight === screen.height);
	const [isInvalidRequestData, setIsInvalidRequestData] = React.useState(false);

	React.useEffect(() => {
		const fullScreenDetect = () => {
			if (document.fullscreenElement) {
				setIsFullScreen(true);
			} else {
				setIsFullScreen(false);
			}
		};

		document.addEventListener('fullscreenchange', fullScreenDetect);

		return () => {
			document.removeEventListener('fullscreenchange', fullScreenDetect);
		};
	}, []);

	const onChangeRequestValue = (event: React.ChangeEvent<HTMLTextAreaElement> | undefined) => {
		const value = event?.target.value;

		if (value !== undefined) {
			setRequestValue(value);
		}
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
			onRequest({
				action: requestData.action || '',
				id: requestData.id || undefined
			});
		}
	};

	const onClickFullScreenButton = () => {
		if (consoleRef.current) {

			if (!isFullScreen) {
				consoleRef.current.requestFullscreen();
				setIsFullScreen(true);
			} else {
				document.exitFullscreen();
				setIsFullScreen(false);
			}
		}
	};

	const onClickHistoryTrack = (request: IHistoryTrack) => () => {
		setRequestValue(request.payload);
	};

	const onRunHistoryTrack = (request: IHistoryTrack) => () => {
		onRequest(request);
	}; 

	const onDeleteHistoryTrack = (trackId: IHistoryTrack['id']) => () => {
		onDeleteRequestHistory(trackId);
	};

	return (
		<section ref={consoleRef}>
			<Header>
				<FlexContainer>
					<Logo />
					<Title>API-консолька</Title>
				</FlexContainer>

				<FlexContainer>
					<SubLogin>{subLogin} <SubLoginDots>:</SubLoginDots> sublogin</SubLogin>
					<LogoutButton onClick={onLogout}>Выйти</LogoutButton>
					<FullScreenButton fullScreen={isFullScreen} onClick={onClickFullScreenButton} />
				</FlexContainer>
			</Header>

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
				<FormatButton>Форматировать</FormatButton>
			</Footer>
		</section>
	);
};

export default React.memo(Console);

interface IProps {
	subLogin: string | null;
	isRequestLoading: boolean;
	response: string | null;
	requestHistoryList: IHistoryTrack[] | null;
	onLogout: () => void;
	onRequest: (data: IRequestData) => void;
	onDeleteRequestHistory: (id: IHistoryTrack['id']) => void;
}

interface IFullScreenButtonProps {
	fullScreen: boolean;
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