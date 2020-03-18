import React from 'react';
import {AsyncStorage} from 'react-native'
export const themes = {
    
    light: {
        foreground: '#000000',
        background: '#eeeeee',
      },
      dark: {
        foreground: '#ffffff',
        background: '#222222',
      },
    };
export const AppContext = React.createContext(
    themes.dark // valor por defecto
);

export class AppContextProvider extends React.Component{
 
    render() {
      
       
        return(
            
            <AppContext.Provider value={{theme:this.state.colorTheme}}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}
export const AppContextConsumer =AppContext.Consumer;