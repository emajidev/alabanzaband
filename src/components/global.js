
import { AsyncStorage} from 'react-native'

export class AppColors {
    static colors = {main_color: "#FFEB3B", secondary_color: "#FFC107"}
    state = {
        dataStorage:{},
        colorTheme
     }   
  
    componentDidMount = async () =>{
      await this.getData()
    }     
    getData = async () => {
        try {
           const data = await AsyncStorage.getItem('@storage_Key')
           let newData = JSON.parse(data);
           console.log(" global storage",newData)
           let newDataStorage = {
              colorTheme:this.state.colorTheme,
              phone:"user04169029089 ",
              user:"emanuel",
              
           }
           
           console.log(" settings",this.state.dataStorage)
        } catch(e) {
           // error reading value
           console.log(e)
        }
     }
}