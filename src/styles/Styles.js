import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
    header:{
      flex: 1,
      marginTop: StatusBar.currentHeight,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content:{
      flex: 6,
      width:'100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      TextInput: {
        flexDirection: 'row',
        
       
        marginTop:20,
        marginBottom:20,
        width:'80%'
      },
      bg:{
        justifyContent: 'center',
        alignItems: 'center',
        width:250,
        height:50,
        marginBottom:100,
      },
      mg:{
        marginTop:2
      },
     
      borderBox:{
       
        justifyContent: 'center',
        alignItems: 'center',
        width:'80%',
        borderRadius:10,
        shadowColor: "#000", shadowOffset: { width: 2, height: 4, }, shadowOpacity: 0.2, shadowRadius: 10
       
      },
      btn_sesion:{
        backgroundColor:'#10cb42',
        marginTop:20,
        width:'80%',
        height:50,
        justifyContent:"center",
        alignItems:'center',
        
      },
      btn_facebook:{
        backgroundColor:'#235e86',
        marginTop:40,
        width:'80%',
        height:50,
        justifyContent:"center",
        alignItems:'center',
        flexDirection:'row'
    
      },
      btn_accept:{
        backgroundColor:'#5f25fe',
        marginTop:40,
        width:'80%',
        height:50,
        borderRadius:50,
        justifyContent:"center",
        alignItems:'center',
        flexDirection:'row',
        shadowColor: "#000", shadowOffset: { width: 2, height: 4, }, shadowOpacity: 0.2, shadowRadius: 10

      },
      btn_primary_light:{
        
        borderColor:'#5f25fe',
        borderWidth:2,
        borderRadius:50,
        marginTop:40,
        width:'80%',
        height:50,
        borderRadius:50,
        justifyContent:"center",
        alignItems:'center',
        flexDirection:'row',
        shadowColor: "#000", shadowOffset: { width: 2, height: 4, }, shadowOpacity: 0.2, shadowRadius: 10

      },
});