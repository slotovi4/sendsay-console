import React from 'react';
import styled from 'styled-components';
import logoIcon from './logoIcon.svg';

const LogoStyled = styled.img<IProps>`
	margin-bottom: ${props => props.mb ? '20px' : '0'};
	width: 115px;
	height: 30px;
`;

const Logo = (props: IProps) => <LogoStyled src={logoIcon} alt="logoIcon" {...props} />;

export default React.memo(Logo);

interface IProps {
	mb?: boolean;
}
