import React from 'react'
import { StatusBar} from 'react-native'


import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	background-color:  ${props => props.theme.bg};
	justify-content: center;
	align-items: center;
	

    
`;
export const Header = styled.View`
	height:50px;
    flex-direction:row;
	background-color: ${props => props.theme.bg};
	align-items:center ;
	shadow-color: #000;
	shadow-offset: {width: 0, height: 4};
	shadow-opacity: 0.32;
	shadow-radius: 5;
	elevation: 9;
   
    
`;
export const Songs = styled.TouchableOpacity`
	height:50px;
	width:100%;
	padding:5%;
	margin-top: 3;
	background-color: ${props => props.theme.bg};
`;


