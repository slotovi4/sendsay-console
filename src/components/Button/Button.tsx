import React from 'react';
import styled from 'styled-components';
import loaderIcon from './loaderIcon.svg';

const SubmitButton = styled.button<IButtonProps>`
	width: 110px;
	height: 40px;
	font-weight: 500;
	font-size: 16px;
	line-height: 30px;
	color: #FFFFFF;
	padding: 5px 10px;
	background: linear-gradient(180deg, #45A6FF 0%, #0055FB 100%), #C4C4C4;
	border-radius: 5px;
	border: none;
	transition all 0.3s ease;
	position: relative;

	${props => !props.isLoading && `
		&:disabled {
			background: linear-gradient(0deg, #C4C4C4, #C4C4C4);
		}
	`}

	&:not(:disabled) {
		cursor: pointer;

		&:hover {
			background: linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)), linear-gradient(180deg, #45A6FF 0%, #0055FB 100%), #C4C4C4;
		}
	
		&:active {
			background: linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(180deg, #45A6FF 0%, #0055FB 100%), #C4C4C4;
		}
	
		&:focus {
			box-shadow: 0px 0px 1px 2px #45A5FF;
		}
	}

	${props => props.isLoading && `
		color: transparent;

		&::after {
			content: '';
			position: absolute;
			background: url(${loaderIcon}) no-repeat;
			width: 24px;
			height: 24px;
			top: 50%;
			left: 50%;
			margin-left: -12px;
			margin-top: -12px;
			animation: spinAnimation infinite 2s linear;
		}
	`};

	@keyframes spinAnimation {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;

const Button: React.FC<TProps> = ({isLoading, disabled, ...rest}: TProps) => <SubmitButton {...rest} isLoading={isLoading} disabled={disabled || isLoading} />;

export default React.memo(Button);

type TProps = IAttributes & IButtonProps;

interface IAttributes extends Omit<React.AllHTMLAttributes<HTMLButtonElement>, 'as'> {
	type?: 'button' | 'submit' | 'reset' | undefined;
}

interface IButtonProps {
	isLoading?: boolean;
}
