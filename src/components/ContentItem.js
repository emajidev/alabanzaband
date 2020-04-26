import React from 'react'
import { View, Text, StatusBar, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import Shareicon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import MusicIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { db } from './firebase.js';
import IconLike from 'react-native-vector-icons/AntDesign';
import { withGlobalContext } from './UserContext';

class ContentItem extends React.Component {
   constructor(props) {

      super(props);
      this.state = {
         statusLike: false
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
               this.setState({ statusLike: '#f45' })

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

   componentDidMount() {
      const postId = this.props.navigation.state.params.item.id
      const user = this.props.global.account
      const referLike = db.ref('/users/user' + user + '/store_likes/' + postId)
      referLike.on('value', (snapshot) => {
         console.log("status like", snapshot.val())
         if (snapshot.val() != null) {
            this.setState({ statusLike: '#f45' })
         }else{
            this.setState({ statusLike: '#000'})
         }
      })

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
      const FortmatLyrics = item.lyrics.replace(/\+/g, "\n");
      console.log(item.name)
      return (

         <View style={styles.container}  >
            <View>
               <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: '20%', alignContent: 'center', justifyContent: 'center' }}>
                     <MusicIcon
                        name='bookmark-music'
                        color='#000'
                        size={60}
                     />
                  </View>

                  <View style={{ width: '60%' }}>
                     <Text style={styles.title}>Titulo: <Text style={{ fontWeight: 'bold' }}>{item.name}</Text> </Text>
                     <Text style={styles.subtitle}>Categoria:  <Text style={{ fontWeight: 'bold' }}>{item.category}</Text></Text>
                  </View>
                  <View style={{ width: '20%', alignContent: 'center', justifyContent: 'center' }}>
                     <TouchableOpacity style={styles.btn_nav}
                        onPress={() => {
                           this.onPostLike(item.id)
                        }}
                     >
                        <IconLike
                           name='like2'
                           color={this.state.statusLike}
                           size={40}
                           
                           style={{ textAlign: 'center' }}
                        />
                     </TouchableOpacity>
                  </View>

               </View>
               <View style={styles.lyrics}>
                  <Text>{FortmatLyrics}</Text>
               </View>
            </View>



            <TouchableOpacity style={{ marginTop: 50 }} onPress={() => this.props.navigation.goBack()}>
               <Icon name='chevron-circle-left' size={40} />

            </TouchableOpacity>
         </View>
      )
   }
}
export default withGlobalContext(withNavigation(ContentItem));

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: StatusBar.currentHeight + 15,
      margin: 15,
   },
   lyrics: {
      margin: 15,
   },
   title: {
      fontSize: 20,
   },
   subtitle: {
      fontSize: 15,
   }
})
