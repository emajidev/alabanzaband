import React from 'react'
import { View, Text, StatusBar, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import Shareicon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import MusicIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { db } from './firebase.js';
import IconLike from 'react-native-vector-icons/AntDesign';
import IconComment from 'react-native-vector-icons/MaterialCommunityIcons';
import IconView from 'react-native-vector-icons/Feather';

import { withGlobalContext } from './UserContext';

class ContentItem extends React.Component {
   constructor(props) {

      super(props);
      this.state = {
         statusLike: '#A0A0A0',
         infoSong: {}
      };

   }


   onPostLike(postId) {
      const reference = db.ref('songs/' + postId + '/likes');
      const user = this.props.global.account
      const referLike = db.ref('/users/user' + user + '/store_likes/')

      // Execute transaction
      referLike.child(postId).orderByChild('like').once("value", function (snapshot) {

         if (snapshot.val() == null) {
            console.log("tiene like", snapshot.val())
            referLike.child(postId).update({
               like: true
            })
            return reference.transaction(currentLike => {
               if (currentLike === null) return 1;
               return currentLike + 1;
            });
         } else {
            console.log("borrar like", snapshot.val())
            referLike.child(postId).update({
               like: null
            })
            return reference.transaction(currentLike => {
               return currentLike - 1;
            });
         }
         /*   return reference.transaction(currentLike => {
              if (currentLike === null) return 1;
              return currentLike + 1;
           }); */
      })


   }


   onPostVisit(postId) {
      const reference = db.ref('songs/' + postId + '/visits');
      return reference.transaction(currentVisits => {
         if (currentVisits === null) return 1;
         return currentVisits + 1;
      });
   }
   statusLike() {
      const postId = this.props.navigation.state.params.item.id
      const user = this.props.global.account
      const referLike = db.ref('/users/user' + user + '/store_likes/' + postId)
      referLike.on('value', (snapshot) => {
         console.log("status like", snapshot.val())
         if (snapshot.val() != null) {
            this.setState({ statusLike: true })
         } else {
            this.setState({ statusLike: false })
         }
      })
   }
   
   statusLikeInSongs() {
      const postId = this.props.navigation.state.params.item.id
      const reference = db.ref('songs/' + postId);
      reference.on('value', (snapshot) => {
         const info = snapshot.val()
         this.setState({ infoSong: info })
      })


   }
   componentDidMount() {
      this.statusLike()
      this.statusLikeInSongs()
   }
   pushLike(status) {
      this.onPostLike(this.props.navigation.state.params.item.id, status).then(transaction => {
         console.log('New post like count: ', transaction.snapshot.val());
      })
   }

   componentWillUnmount() {
      this.onPostVisit(this.props.navigation.state.params.item.id).then(transaction => {
         console.log('post visited count: ', transaction.snapshot.val());
      })
   }
   render() {
      const { item } = this.props.navigation.state.params;
      const FortmatLyrics = item.lyrics.replace(/\./g, c =>"\n\n");
      
      console.log("info songs", this.state.infoSong)
      return (

         <View style={styles.container}  >
               <View style={{backgroundColor:'#EBF8FF',borderRadius:10,padding:15,marginBottom:10}}>
               
                  <View style={{width:'80%',height:15,marginBottom:20,backgroundColor:'#fff694',borderRadius:10}}/>
                  <View style={{width:'60%',height:15,marginBottom:20,backgroundColor:'#94c4ff',borderRadius:10}}/>
                  <View style={{width:'70%',height:15,marginBottom:10,backgroundColor:'#a947ff',borderRadius:10}}/>
               </View>
               <View style={{ flexDirection:'row',width:'100%',justifyContent:'flex-start',}}>
                 {/*  <View >
                     <MusicIcon
                        name='bookmark-music'
                        color='#000'
                        size={60}
                     />
                  </View> */}

                  <View >
                     <Text style={styles.title}>Titulo: <Text style={{ }}>{item.name}</Text> </Text>
                     <Text style={styles.subtitle}>Categoria:  <Text style={{ }}>{item.category}</Text></Text>
                  </View>
           
               </View>
               <View style={{ flexDirection: 'row',justifyContent:'space-between',width:'100%',marginBottom:20,marginTop:20,paddingBottom:10,borderBottomColor:'#DCDCDC',borderBottomWidth:1 }}>
                  <TouchableOpacity style={styles.btn_nav}
                     onPress={() => {
                        this.onPostLike(item.id)
                     }}
                  >
                     <View style={{ flexDirection: 'row' }}>
                     {
                        this.state.statusLike ? (
                           <IconLike
                           name='heart'
                           color={'#f45'}
                           size={25}
                        />
                        ):(
                           <IconLike
                           name='hearto'
                           color={'#A0A0A0'}
                           size={25}
                        />
                        )
                     }
                       
                        <Text style={{color:'#A0A0A0'}}> {this.state.infoSong.likes} Me gusta</Text>
                     </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn_nav}
                     onPress={() => {
                     }}
                  >
                     <View style={{ flexDirection: 'row' }}>
                        <IconView
                           name='eye'
                           color={this.state.statusVisits}
                           size={25}
                        />
                        <Text style={{color:'#A0A0A0'}}> {this.state.infoSong.visits} Vistos</Text>
                     </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn_nav}
                     onPress={() => {
                     }}
                  >
                     <View style={{ flexDirection: 'row' }}>
                        <IconComment
                           name='comment-outline'
                           color={this.state.statusComment}
                           size={25}
                        />
                         <Text style={{color:'#A0A0A0'}}> {this.state.infoSong.visits} Comentarios</Text>
                     </View>
                    
                  </TouchableOpacity>

               </View>
               <View>


               </View>
               <View style={styles.lyrics}>
               <Text style={{textAlign:'center',color:'#A5A5A5',marginBottom:20,letterSpacing:5}}>LETRA</Text>
                  <Text style={{color:'#A0A0A0',fontSize:15,textAlign:'center'}}>{FortmatLyrics}</Text>
               </View>



           {/*  <TouchableOpacity style={{ marginTop: 50 }} onPress={() => this.props.navigation.goBack()}>
               <Icon name='chevron-circle-left' size={40} />

            </TouchableOpacity> */}
         </View>
      )
   }
}
export default withGlobalContext(withNavigation(ContentItem));

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'flex-start',
      marginTop: StatusBar.currentHeight,
      margin: 15,
   },
   lyrics: {
      margin: 15,
      justifyContent: 'flex-start',
      color:'#A0A0A0'
   },
   title: {
      fontSize: 20,
      color:'#A0A0A0'
   },
   subtitle: {
      fontSize: 15,
      color:'#A0A0A0'
   }
})
