import React from 'react';
import styled from 'styled-components';

const MenuBlock = styled.div`
	background: #FFFFFF;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
	border-radius: 3px;
	position: fixed;
	z-index: 1;
	width: 130px;
	padding: 5px 0;
	visibility: hidden;
`;

const MenuButton = styled.span<IMenuButtonProps>`
	display: block;
	font-size: 16px;
	line-height: 20px;
	padding: 10px 15px;
	transition: background-color 0.3s ease, color 0.3s ease;
	cursor: pointer;
	user-select: none;

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

const HistoryTrackMenu = ({ show, parentRef, onButtonClick, hideMenu }: IProps) => {
	const menuRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!menuRef.current || !parentRef.current) {
				return;
			}

			if (!menuRef.current.contains(event.target as Node | null) &&
				!parentRef.current.contains(event.target as Node | null)) {
				hideMenu();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	React.useEffect(() => {
		if (show && parentRef.current && menuRef.current) {
			const { top, left, height } = parentRef.current.getBoundingClientRect();
			
			menuRef.current.style.left = `${left}px`;
			menuRef.current.style.top = `${top + height}px`;
			menuRef.current.style.visibility = 'visible';
		}
	}, [show]);

	return (
		<>
			{show ? (
				<MenuBlock ref={menuRef}>
					<MenuButton onClick={onButtonClick('run')}>Выполнить</MenuButton>
					<MenuButton onClick={onButtonClick('copy')}>Скопировать</MenuButton>
					<MenuLine />
					<MenuButton onClick={onButtonClick('delete')} destruct>Удалить</MenuButton>
				</MenuBlock>
			) : null}
		</>
	);
};

export default HistoryTrackMenu;

interface IProps {
	show: boolean;
	parentRef: React.MutableRefObject<HTMLDivElement | null>;
	onButtonClick: (type: TButtonType) => () => void;
	hideMenu: () => void;
}

interface IMenuButtonProps {
	destruct?: boolean;
}

export type TButtonType = 'run' | 'copy' | 'delete';
