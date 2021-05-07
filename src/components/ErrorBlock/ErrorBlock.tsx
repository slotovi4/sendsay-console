import React from 'react';
import styled from 'styled-components';
import errorIcon from './errorIcon.svg';

const ErrorSection = styled.section`
	width: 100%;
	height: 70px;
	background: rgba(207, 44, 0, 0.1);
	border-radius: 5px;
	padding: 10px 0px 10px 42px;
	margin-bottom: 20px;
`;

const ErrorTitle = styled.span`
	color: #CF2C00;
	font-size: 18px;
	line-height: 30px;
	display: block;
	position: relative;

	&::before {
		content: '';
		position: absolute;
		background: url(${errorIcon}) no-repeat;
		width: 24px;
		height: 24px;
		left: calc(-24px - 8px);
		top: 2px;
	}
`;

const ErrorText = styled.span`
	display: block;
	font-size: 12px;
	line-height: 20px;
	color: #CF2C00;
	opacity: 0.5;
`;

const ErrorBlock = ({ error, errorTitle }: IProps) => {
	return (
		<>
			{error ? (
				<ErrorSection>
					{errorTitle ? <ErrorTitle>{errorTitle}</ErrorTitle> : null}
					<ErrorText>{JSON.stringify(error)}</ErrorText>
				</ErrorSection>
			) : null}
		</>
	);
};

export default React.memo(ErrorBlock);

export interface IProps {
	errorTitle?: string;
	error?: IError | null;
}

interface IError {
	explain: string;
	id: string;
}
