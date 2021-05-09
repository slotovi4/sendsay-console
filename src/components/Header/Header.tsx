import React from 'react';
import { Logo, FullScreenIcon, ExitScreenIcon } from 'components';
import styled from 'styled-components';
import logoutIcon from './logoutIcon.svg';

const HeaderContainer = styled.section`
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

const FlexContainer = styled.div`
	display: flex;
	align-items: center;
`;

const SubLoginDots = styled.span`
	color: rgba(0, 0, 0, 0.2);
`;

const FullScreenButtonContainer = styled.div`
	margin-left: 30px;
	cursor: pointer;
	height: 20px;
	position: relative;

	&:focus::before {
		content: '';
		position: absolute;
		height: 32px;
		width: 32px;
		border-radius: 7px;
		border: 2px solid rgba(69, 165, 255, 0.5);
		left: -8px;
		top: -8px;
	}

	&:hover path {
		stroke: #0055FB;
	}
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

const Header = ({ subLogin, onLogout, parentRef }: IProps) => {
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

	const onClickFullScreenButton = () => {
		if (parentRef.current) {

			if (!isFullScreen) {
				parentRef.current.requestFullscreen();
				setIsFullScreen(true);
			} else {
				document.exitFullscreen();
				setIsFullScreen(false);
			}
		}
	};

	return (
		<HeaderContainer>
			<FlexContainer>
				<Logo />
				<Title>API-консолька</Title>
			</FlexContainer>

			<FlexContainer>
				<SubLogin>{subLogin} <SubLoginDots>:</SubLoginDots> sublogin</SubLogin>
				<LogoutButton onClick={onLogout}>Выйти</LogoutButton>
				<FullScreenButtonContainer onClick={onClickFullScreenButton}>
					{!isFullScreen ? <FullScreenIcon /> : <ExitScreenIcon />}
				</FullScreenButtonContainer>
			</FlexContainer>
		</HeaderContainer>
	);
};

export default React.memo(Header);

export interface IProps {
	subLogin: string | null;
	parentRef: React.MutableRefObject<HTMLElement | null>;
	onLogout: () => void;
}

