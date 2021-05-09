/* eslint-disable react/display-name */
import React from 'react';
import styled from 'styled-components';

const IconContainer = styled.div`
	& svg, & path {
		outline: none;
	}
`;

const IconHOC = (Component: React.ElementType) => () => {
	return (
		<IconContainer>
			<Component />
		</IconContainer>
	);
};

export default IconHOC;
