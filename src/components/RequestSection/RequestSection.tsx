import React from 'react';
import styled from 'styled-components';
import { DotsButton } from 'components';

const TextArea = styled.textarea<ITextAreaProps>`
	background: transparent;
	border: 1px solid rgba(0, 0, 0, 0.2);
	border-radius: 5px;
	resize: none;
	height: calc(100% - 20px);
	width: 100%;
	outline: none;
	padding: 10px;

	${props => props.isInvalid && `
		box-shadow: 0px 0px 5px rgba(207, 44, 0, 0.5);
		border-color: #CF2C00;
	`};
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

const TextAreaLabel = styled.span<TTextAreaLabelProps>`
	display: block;
	font-size: 12px;
	line-height: 20px;
	user-select: none;
	color: ${props => props.isInvalid ? '#CF2C00' : '#999999'};
`;

const TextAreaResizeButton = styled(DotsButton)`
	position: absolute;
	left: calc(50% - 5px);
	top: 0;
	margin: 0;
	padding: 0;
	cursor: col-resize;
	height: 100%;
	width: 10px;
`;

const RequestSection = ({
	isInvalidRequestData,
	isInvalidResponseData,
	onChangeRequestValue,
	requestValue,
	responseValue
}: IProps) => {
	const textAreaResizeButtonRef = React.useRef<HTMLDivElement | null>(null);
	const leftTextAreaBlockRef = React.useRef<HTMLDivElement | null>(null);
	const rightTextAreaBlockRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		const resizeButton = textAreaResizeButtonRef.current;
		const leftTextArea = leftTextAreaBlockRef.current;
		const rightTextArea = rightTextAreaBlockRef.current;

		if (!resizeButton || !leftTextArea || !rightTextArea) {
			return;
		}

		const resizeTextArea = ({ x }: MouseEvent) => {
			if (x > 100 && x < window.innerWidth - 100) {
				leftTextArea.style.width = `${x - 18}px`;
				rightTextArea.style.width = `calc(100% - ${x}px)`;
				resizeButton.style.left = `${x - 3}px`;
			}
		};

		resizeButton.addEventListener('mousedown', () => {
			document.addEventListener('mousemove', resizeTextArea, false);
		}, false);

		document.addEventListener('mouseup', () => {
			document.removeEventListener('mousemove', resizeTextArea, false);
		}, false);

		return () => {
			document.removeEventListener('mousemove', resizeTextArea, false);
		};
	}, []);

	return (
		<>
			<TextAreaContainer ref={leftTextAreaBlockRef}>
				<TextAreaLabel isInvalid={isInvalidRequestData}>Запрос:</TextAreaLabel>
				<TextArea
					value={requestValue}
					onChange={onChangeRequestValue}
					isInvalid={isInvalidRequestData}
				/>
			</TextAreaContainer>

			<TextAreaResizeButton ref={textAreaResizeButtonRef} />

			<TextAreaContainer ref={rightTextAreaBlockRef}>
				<TextAreaLabel isInvalid={isInvalidResponseData}>Ответ:</TextAreaLabel>
				<TextArea
					value={responseValue}
					isInvalid={isInvalidResponseData}
					readOnly />
			</TextAreaContainer>
		</>
	);
};

export default React.memo(RequestSection);

interface IProps {
	isInvalidRequestData: boolean;
	isInvalidResponseData: boolean;
	requestValue: string;
	responseValue: string;
	onChangeRequestValue: (event: React.ChangeEvent<HTMLTextAreaElement> | undefined) => void;
}

interface ITextAreaProps {
	isInvalid: boolean;
}

type TTextAreaLabelProps = ITextAreaProps;
