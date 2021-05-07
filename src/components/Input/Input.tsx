import React from 'react';
import styled from 'styled-components';

const errorColor = '#CF2C00';

const InputBlock = styled.div`
	margin-bottom: 20px;
`;

const Field = styled.input<IInputProps>`
	width: 100%;
	height: 40px;
	border-radius: 5px;
	font-size: 18px;
	line-height: 30px;
	padding: 5px 10px;
	outline: none;
	border: 1px solid ${props => props.isInvalid ? errorColor : 'rgba(0, 0, 0, 0.2)'};
	box-shadow: ${props => props.isInvalid ? '0px 0px 5px rgba(207, 44, 0, 0.5)' : 'none'};
`;

const Label = styled.label<ILabelProps>`
	font-size: 16px;
	line-height: 20px;
	display: block;
	margin-bottom: 5px;
	position: relative;
	color: ${props => props.isInvalid ? errorColor : 'inherit'};

	${props => props.isOptional && `
		&::before {
			content: 'Опционально';
			position: absolute;
			right: 0;
			font-size: 12px;
			line-height: 20px;
			color: #999999;
		}`
	};
`;

const Input = ({ isInvalid, isOptional, id, labelText, ...rest }: IProps) => {
	return (
		<InputBlock>
			<Label
				isInvalid={isInvalid}
				isOptional={isOptional}
				htmlFor={id}
			>
				{labelText}
			</Label>
			<Field
				isInvalid={isInvalid}
				id={id}
				{...rest}
			/>
		</InputBlock>
	);
};

export default React.memo(Input);

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	isInvalid: boolean;
	labelText: string;
	id: string;
	isOptional?: ILabelProps['isOptional'];
}

interface IInputProps {
	isInvalid: boolean;
}

interface ILabelProps {
	isOptional?: boolean;
	isInvalid: boolean;
}
