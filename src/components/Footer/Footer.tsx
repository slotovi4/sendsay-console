import React from 'react';
import styled from 'styled-components';
import { Button, FormatIcon } from 'components';

const FooterContainer = styled.footer`
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
	width: 168px;
	text-align: right;
	cursor: pointer;
	border-radius: 7px;
	padding: 8px 7px;
	border: 2px solid transparent;

	& svg {
		position: absolute;
		left: 7px;
		top: 7px;
	}

	&:hover {
		color: #0055FB;

		& svg path {
			stroke: #0055FB;
		}
	}

	&:focus {
		border-color: rgba(69,165,255,0.5);
	}
`;

const Footer = ({ isRequestLoading, onFormatRequest, onSubmit }: IProps) => {
	return (
		<FooterContainer>
			<Button onClick={onSubmit} isLoading={isRequestLoading} type='button'>Отправить</Button>
			<FooterLink href='#'>@link-to-your-github</FooterLink>
			<FormatButton onClick={onFormatRequest}>
				<FormatIcon />
				Форматировать
			</FormatButton>
		</FooterContainer>
	);
};

export default React.memo(Footer);

interface IProps {
	isRequestLoading: boolean;
	onFormatRequest: () => void;
	onSubmit: () => void;
}
