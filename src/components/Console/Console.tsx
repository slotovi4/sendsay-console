import React from 'react';
import styled from 'styled-components';
import { Logo, Button } from 'components';
import logoutIcon from './logoutIcon.svg';
import fullScreenIcon from './fullScreenIcon.svg';
import dotsIcon from './dotsIcon.svg';
import formatIcon from './formatIcon.svg';
import clearIcon from './clearIcon.svg';

const Header = styled.section`
	padding: 10px 15px;
	display: flex;
	justify-content: space-between;
	background: #F6F6F6;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	position: relative;
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

const FullScreenButton = styled.div`
	background: url(${fullScreenIcon});
	width: 20px;
	height: 20px;
	margin-left: 20px;
`;

const RequestHistory = Header;

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

const HitoryCodeStatus = styled.div`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: #30B800;
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
	}
`;

const Console = ({ onLogout, subLogin }: IProps) => {
	return (
		<section>
			<Header>
				<FlexCotainer>
					<Logo />
					<Title>API-консолька</Title>
				</FlexCotainer>

				<FlexCotainer>
					<SubLogin>{subLogin} <SubLoginDots>:</SubLoginDots> sublogin</SubLogin>
					<LogoutButton onClick={onLogout}>Выйти</LogoutButton>
					<FullScreenButton />
				</FlexCotainer>
			</Header>

			<RequestHistory>
				<HistoryTrack>
					<HitoryCodeStatus />
					123
					<HistoryButton />
				</HistoryTrack>

				<HistoryClearButton />
			</RequestHistory>

			<RequestContainer>
				<TextAreaContainer>
					<TextAreaLabel>Запрос:</TextAreaLabel>
					<TextArea />
				</TextAreaContainer>

				<TextAreaContainer>
					<TextAreaLabel>Ответ:</TextAreaLabel>
					<TextArea />
				</TextAreaContainer>
			</RequestContainer>

			<Footer>
				<Button type='button'>Отправить</Button>
				<FooterLink href='#'>@link-to-your-github</FooterLink>
				<FormatButton>Форматировать</FormatButton>
			</Footer>
		</section>
	);
};

export default React.memo(Console);

interface IProps {
	subLogin: string | null;
	onLogout: () => void;
}
