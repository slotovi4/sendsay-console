import React from 'react';
import styled from 'styled-components';
import { DotsButton } from 'components';

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
`;

const MenuBlock = styled.div`
	background: #FFFFFF;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
	border-radius: 3px;
	position: absolute;
	left: 0;
	top: 30px;
	z-index: 1;
	width: 100%;
	min-width: 130px;
	padding: 5px 0;
`;

const MenuButton = styled.span<IMenuButtonProps>`
	display: block;
	font-size: 16px;
	line-height: 20px;
	padding: 10px 15px;
	transition: background-color 0.3s ease, color 0.3s ease;
	cursor: pointer;

	&:hover {
		color: white;
		background-color: ${props => props.destruct ? '#CF2C00' : '#0055FB'};
	}
`;

const MenuLine = styled.hr`
	height: 1px;
	width: 100%;
	background: rgba(0,0,0,0.2);
	border: none;
	margin: 5px 0;
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
	const menuRef = React.useRef<HTMLDivElement | null>(null);
	const settingsRef = React.useRef<HTMLDivElement | null>(null);
	const [isShowMenu, setIsShowMenu] = React.useState(false);
	const [isShowCopyAlert, setIsShowCopyAlert] = React.useState(false);

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if(!menuRef.current || !settingsRef.current) {
				return;
			}

			if (!menuRef.current.contains(event.target as Node | null) &&
				!settingsRef.current.contains(event.target as Node | null)) {
				setIsShowMenu(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

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

		el.value = request.payload;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);

		setIsShowCopyAlert(true);
	};

	const onButtonClick = (callBack: () => void) => () => {
		setIsShowMenu(false);
		callBack();
	};

	return (
		<Track>
			<TrackBody onClick={onClick}>
				<HistoryCodeStatus success={request.success} />
				{request.action}
				<HistoryButton ref={settingsRef} onClick={onSettingsClick} />
			</TrackBody>

			{isShowMenu ? (
				<MenuBlock ref={menuRef}>
					<MenuButton onClick={onButtonClick(onRun)}>Выполнить</MenuButton>
					<MenuButton onClick={onButtonClick(onCopy)}>Скопировать</MenuButton>
					<MenuLine />
					<MenuButton onClick={onButtonClick(onDelete)} destruct>Удалить</MenuButton>
				</MenuBlock>
			) : null}

			{isShowCopyAlert ? (
				<CopyAlert>Скопировано</CopyAlert>
			) : null}
		</Track>
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
	payload: string;
}

interface IMenuButtonProps {
	destruct?: boolean;
}