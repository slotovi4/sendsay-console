import React from 'react';
import styled from 'styled-components';
import dotsIcon from './dotsIcon.svg';
import dotsIconHover from './dotsIconHover.svg';

const DotsButton = styled.div`
	background: url(${dotsIcon}) no-repeat center;
	width: 4px;
	height: 100%;
	transition: background 0.3s ease;

	&:hover {
		background: url(${dotsIconHover}) no-repeat center;
	}
`;

export default React.memo(DotsButton);
