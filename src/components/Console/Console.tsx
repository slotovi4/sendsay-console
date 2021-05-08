import React from 'react';
import { Logo, Button } from 'components';
import styled from 'styled-components';
import logoutIcon from './logoutIcon.svg';
import fullScreenIcon from './fullScreenIcon.svg';
import dotsIcon from './dotsIcon.svg';
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

const FlexCotainer = styled.div`
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

const HistoryTrack = styled.div`
	height: 30px;
	padding: 5px 10px;
	background: #FFFFFF;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	display: flex;
	align-items: center;
	margin-right: 10px;
	cursor: pointer;
	font-size: 16px;
	line-height: 20px;
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

const HistoryButton = styled.div`
	background: url(${dotsIcon});
	width: 4px;
	height: 18px;
	margin-left: 10px;
`;

const HistoryCodeStatus = styled.div<IHistoryCodeStatusProps>`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: ${props => props.success ? '#30B800' : '#CF2C00'};
	border: 1px solid rgba(0, 0, 0, 0.2);
	margin-right: 5px;
`;

const RequestContainer = styled.section`
	background: #FFFFFF;
	height: calc(100vh - 70px - 51px - 51px);
	padding: 10px 15px;
`;

const TextArea = styled.textarea`
	background: transparent;
	border: 1px solid rgba(0, 0, 0, 0.2);
	border-radius: 5px;
	resize: none;
	height: calc(100% - 20px);
	width: 100%;
`;

const TextAreaContainer = styled.div`
	height: 100%;
	width: calc(50% - 5px);
	display: inline-block;

	&:first-child {
		margin-right: 5px;
	}

	&:last-child {
		margin-left: 5px;
	}
`;

const TextAreaLabel = styled.span`
	display: block;
	font-size: 12px;
	line-height: 20px;
	color: #999999;
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
	requestHistoryList
}: IProps) => {
	const ref = React.useRef<HTMLElement | null>(null);
	const [requestValue, setRequestValue] = React.useState('{"action":"track.get","id":"12345"}');
	const [isFullScreen, setIsFullScreen] = React.useState(window.innerHeight === screen.height);

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
		} catch (e) {
			alert(e);
		}

		if (requestData) {
			onRequest({
				action: requestData.action || '',
				id: requestData.id || ''
			});
		}
	};

	const onClickFullScreenButton = () => {
		if (ref.current) {

			if (!isFullScreen) {
				ref.current.requestFullscreen();
				setIsFullScreen(true);
			} else {
				document.exitFullscreen();
				setIsFullScreen(false);
			}
		}
	};

	return (
		<section ref={ref}>
			<Header>
				<FlexCotainer>
					<Logo />
					<Title>API-консолька</Title>
				</FlexCotainer>

				<FlexCotainer>
					<SubLogin>{subLogin} <SubLoginDots>:</SubLoginDots> sublogin</SubLogin>
					<LogoutButton onClick={onLogout}>Выйти</LogoutButton>
					<FullScreenButton fullScreen={isFullScreen} onClick={onClickFullScreenButton} />
				</FlexCotainer>
			</Header>

			<RequestHistory>
				{requestHistoryList.map(request => (
					<HistoryTrack key={`historyTrack_${request.id}`}>
						<HistoryCodeStatus success={request.success} />
						{request.action}
						<HistoryButton />
					</HistoryTrack>
				))}
				
				{requestHistoryList.length ? <HistoryClearButton /> : null}
			</RequestHistory>

			<RequestContainer>
				<TextAreaContainer>
					<TextAreaLabel>Запрос:</TextAreaLabel>
					<TextArea value={requestValue} onChange={onChangeRequestValue} />
				</TextAreaContainer>

				<TextAreaContainer>
					<TextAreaLabel>Ответ:</TextAreaLabel>
					<TextArea value={response || ''} readOnly />
				</TextAreaContainer>
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
	requestHistoryList: IHistoryTrack[];
	onLogout: () => void;
	onRequest: (data: IRequestData) => void;
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
	response: string;
	action: string;
	id: string;
}

interface IHistoryCodeStatusProps {
	success: boolean;
}
