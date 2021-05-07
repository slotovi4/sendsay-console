import React from 'react';
import styled from 'styled-components';
import { Logo } from 'components';
import logoutIcon from './logoutIcon.svg';
import fullScreenIcon from './fullScreenIcon.svg';

const Header = styled.div`
	height: 50px;
	padding: 10px 15px;
	display: flex;
	justify-content: space-between;
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

		</section>
	);
};

export default React.memo(Console);

interface IProps {
	subLogin: string | null;
	onLogout: () => void;
}
