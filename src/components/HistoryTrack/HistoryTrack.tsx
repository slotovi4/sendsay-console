import React from 'react';
import styled from 'styled-components';
import { 
	DotsButton, 
	HistoryTrackMenu, 
	THistoryTrackMenuButtonType 
} from 'components';

const Track = styled.div`
	height: 30px;
	background: #FFFFFF;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	margin-right: 10px;
	font-size: 16px;
	line-height: 20px;
	transition: box-shadow 0.3s ease;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
	};
`;

const HistoryCodeStatus = styled.div<IHistoryCodeStatusProps>`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: ${props => props.success ? '#30B800' : '#CF2C00'};
	border: 1px solid rgba(0, 0, 0, 0.2);
	margin-right: 5px;
`;

const HistoryButton = styled(DotsButton)`
	padding: 0 12px;
	height: 20px;
	cursor: pointer;
`;

const TrackBody = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 5px 0px 5px 10px;
`;

const copyAlertDuration = 2;

const CopyAlert = styled.div`
	background: #F6F6F6;
	border-radius: 5px;
	font-size: 12px;
	line-height: 20px;
	padding: 0 5px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	animation-duration: ${copyAlertDuration}s;
	animation-name: hide;
	opacity: 1;

	@keyframes hide {
		from {
			top: 50%;
			opacity: 1;
		}
		to {
			top: -20%;
			opacity: 0;
		}
	}
`;

const HistoryTrack = ({ request, onClick, onRun, onDelete }: IProps) => {
	const trackRef = React.useRef<HTMLDivElement | null>(null);
	const [isShowMenu, setIsShowMenu] = React.useState(false);
	const [isShowCopyAlert, setIsShowCopyAlert] = React.useState(false);

	React.useEffect(() => {
		let timeout: NodeJS.Timeout | null = null;

		if (isShowCopyAlert) {
			timeout = setTimeout(() => {
				setIsShowCopyAlert(false);
			}, copyAlertDuration * 1000);
		}

		return () => {
			if (timeout !== null) {
				clearTimeout(timeout);
			}
		};
	}, [isShowCopyAlert]);

	const onSettingsClick = () => {
		setIsShowMenu((prevShow => !prevShow));
	};

	const onCopy = () => {
		const el = document.createElement('textarea');

		el.value = request.requestData;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);

		setIsShowCopyAlert(true);
	};

	const onButtonClick = (buttonType: THistoryTrackMenuButtonType) => () => {
		setIsShowMenu(false);

		switch(buttonType) {
			case 'copy':
				onCopy();
				break;
			case 'run':
				onRun();
				break;
			case 'delete':
				onDelete();
			default:
				break;
		}
	};

	const hideMenu = () => {
		setIsShowMenu(false);
	};

	return (
		<>
			<Track ref={trackRef}>
				<TrackBody onClick={onClick}>
					<HistoryCodeStatus success={request.success} />
					{request.action}
				</TrackBody>

				<HistoryButton onClick={onSettingsClick} />

				{isShowCopyAlert ? (
					<CopyAlert>Скопировано</CopyAlert>
				) : null}
			</Track>
			<HistoryTrackMenu
				show={isShowMenu}
				parentRef={trackRef}
				onButtonClick={onButtonClick}
				hideMenu={hideMenu}
			/>
		</>
	);
};

export default React.memo(HistoryTrack);

interface IProps {
	request: IRequestData;
	onClick: () => void;
	onRun: () => void;
	onDelete: () => void;
}

interface IHistoryCodeStatusProps {
	success: IRequestData['success'];
}

interface IRequestData {
	action: string;
	success: boolean;
	requestData: string;
}