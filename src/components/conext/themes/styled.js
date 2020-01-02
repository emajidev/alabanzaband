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
   
    
`;
export const Songs = styled.TouchableOpacity`
	height:50px;
	padding:5%;
	margin-top: 3;
	background-color: ${props => props.theme.bg};
	height:80;
	align-items:flex-start;
    
`;
