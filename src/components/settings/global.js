

export class AppColors {
    constructor(props){
        super(props)
        this.selectTheme = this.selectTheme.bind(this);
  
        this.state = {
           dataStorage:{},
        }
   
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
           this.setState({dataStorage:newDataStorage})
           console.log(" settings",this.state.dataStorage)
        } catch(e) {
           // error reading value
           console.log(e)
        }
     }
    static colors = {main_color: this.state.dataStorage.colorTheme}
}