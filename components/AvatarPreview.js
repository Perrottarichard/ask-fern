/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {View, StyleSheet, FlatList, ToastAndroid, ActivityIndicator, Animated, Dimensions} from 'react-native'
import {RadioButton, Text, Card, TextInput, Button, Divider} from 'react-native-paper'
import {BigHead} from 'react-native-bigheads'
import {updateUserAvatar} from '../reducers/activeUserReducer'
import {ExpandingDot} from 'react-native-animated-pagination-dots'
import Micon from 'react-native-vector-icons/MaterialCommunityIcons'
 
const accessoryButtons = [
  {name: "ไม่มี", value: "none"},
  {name: "ตุ้มหู", value: "hoopEarrings"}, 
  {name: "แว่นตาทรงกลม", value: "roundGlasses"},
  {name: "แว่นตาจิ๋ว", value: "tinyGlasses"},
  {name: "แว่นตาดำ", value:"shades"},
  {name: "หน้ากากอนามัย", value: "faceMask"}
]

const hatButtons = [
  {name: 'ไม่สวมหมวก', value: 'none'},
  {name: 'ไหมพรม', value: 'beanie'},
  {name: 'ปาร์ตี้', value: 'party'},
  {name: 'ผ้าโพกหัว', value: 'turban'},
  {name: 'ฮิญาบ', value: 'hijab'}
]

const bgColorButtons = [
  {name: "ฟ้า", value: "blue"}, 
  {name: "เขียว", value: "green"},
  {name: "แดง", value: "red"},
  {name: "ส้ม", value: "orange"},
  {name: "เหลือง", value:"yellow"},
  {name: "ชมพู", value: "pink"}
]

const bodyButtons = [
  {name: "มีหน้าอก", value: "breasts"},
  {name: "ไม่มีหน้าอก", value: "chest"}
]

const clothingButtons = [
  {name: "เสื้อเชิ้ต", value: "shirt"}, 
  {name: "ไม่ใส่เสื้อ", value: "naked"},
  {name: "เสื้อยีนส์", value: "denimJacket"},
  {name: "เสื้อมีหมวก", value: "hoodie"},
  {name: "เสื้อแขนกุด", value:"tankTop"},
  {name: "เดรส", value: "dress"}
]

const clothingColorButtons = [
  {name: "ขาว", value: "white"}, 
  {name: "ฟ้า", value: "blue"},
  {name: "เขียว", value: "green"},
  {name: "แดง", value: "red"},
  {name: "ดำ", value:"black"},
]
const hatColorButtons = [
  {name: "ขาว", value: "white"}, 
  {name: "ฟ้า", value: "blue"},
  {name: "เขียว", value: "green"},
  {name: "แดง", value: "red"},
  {name: "ดำ", value:"black"},
]

const lipColorButtons = [
  {name: "ม่วง", value: "purple"}, 
  {name: "ชมพู", value: "pink"},
  {name: "เขียว", value: "green"},
  {name: "แดง", value: "red"},
  {name: "ฟ้า", value:"turqoise"},
]

const eyebrowsButtons = [
  {name: "คิ้วต่ำ", value: "leftLowered"}, 
  {name: "คิ้วโก่ง", value: "raised"},
  {name: "เคร่งเครียด", value: "serious"},
  {name: "โกรธ", value: "angry"},
  {name: "ครุ่นคิด", value:"concerned"},
]

const eyesButtons = [
  {name: "ปกติ", value: "normal"}, 
  {name: "รูปดาว", value: "stars"},
  {name: "มีความสุข", value: "happy"},
  {name: "หรี่ตา", value: "squint"},
  {name: "หลับตาข้างเดียว", value:"wink"},
  {name: "น่ารัก", value: "cute"},
]

const facialHairButtons = [
  {name: "ไม่มี", value: "none"}, 
  {name: "หนวดหรอมแหรม", value: "stubble"},
  {name: "หนวดเครา", value: "mediumBeard"},
  {name: "เคราแพะ", value: "goatee"},
]

const graphicButtons = [
  {name: "ไม่มี", value: "none"}, 
  {name: "โดนัท", value: "donut"},
  {name: "สายรุ้ง", value: "rainbow"},
]

const hairButtons = [
  {name: "ไม่มี", value: "none"}, 
  {name: "ผมยาว", value: "long"},
  {name: "ผมสั้น", value: "short"},
  {name: "มวยผม", value: "bun"},
  {name: "ผมทรงกะลา", value:"pixie"},
  {name: "ผมบ๊อบ", value: "bob"},
]

const hairColorButtons = [
  {name: "น้ำตาล", value: "brown"}, 
  {name: "ดำ", value: "black"},
  {name: "ฟ้า", value: "blue"},
  {name: "ขาว", value: "white"},
  {name: "ชมพู", value: "pink"}, 
  {name: "บลอนด์", value: "blonde"},
]

const skinToneButtons = [
  {name: "น้ำตาล", value: "brown"}, 
  {name: "ดำ", value: "black"},
  {name: "เหลือง", value: "yellow"},
  {name: "แดง", value: "red"},
  {name: "สีอ่อน", value:"light"},
  {name: "สีเข้ม", value: "dark"}, 
]

const mouthButtons = [
  {name: "ทาลิป", value: "lips"}, 
  {name: "เคร่งเครียด", value: "serious"},
  {name: "ยิ้มยิงฟัน", value: "grin"},
  {name: "เศร้า", value: "sad"},
  {name: "ยิ้มกว้าง", value:"open"},
  {name: "แลบลิ้น", value: "piercedTongue"},
]

const DATA = [
  {
    type: 'body',
    buttons: bodyButtons,
    title: 'รูปร่าง',
    level: 1
  },
  {
    type: 'bgColor',
    buttons: bgColorButtons,
    title: 'สีพื้นหลัง',
    level: 1
  },
  {
    type: 'eyebrows',
    buttons: eyebrowsButtons,
    title: 'คิ้ว',
    level: 1
  },
  {
    type: 'lipColor',
    buttons: lipColorButtons,
    title: 'สีริมฝีปาก',
    level: 1
  },
  {
    type: 'skinTone',
    buttons: skinToneButtons,
    title: 'สีผิว',
    level: 1
  },
  {
    type: 'facialHair',
    buttons: facialHairButtons,
    title: 'หนวด',
    level: 1
  },
  {
    type: 'hair',
    buttons: hairButtons,
    title: 'ทรงผม',
    level: 1
  },
  {
    type: 'hairColor',
    buttons: hairColorButtons,
    title: 'สีผม',
    level: 1
  },
  {
    type: 'clothingColor',
    buttons: clothingColorButtons,
    title: 'สีเสื้อผ้า',
    level: 1
  },
  {
    type: 'mouth',
    buttons: mouthButtons,
    title: 'ปาก',
    level: 2
  },
  {
    type: 'eyes',
    buttons: eyesButtons,
    title: 'ตา',
    level: 2
  },
  {
    type: 'clothing',
    buttons: clothingButtons,
    title: 'เสื้อผ้า',
    level: 3
  },
  {
    type: 'graphic',
    buttons: graphicButtons,
    title: 'ลายเสื้อ',
    level: 3
  },
  {
    type: 'accessory',
    buttons: accessoryButtons,
    title: 'เครื่องประดับ',
    level: 4
  },
  {
    type: 'hat',
    buttons: hatButtons,
    title: 'หมวก',
    level: 4
  },
  {
    type: 'hatColor',
    buttons: hatColorButtons,
    title: 'สีของหมวก',
    level: 4
  },

]

const Item = ({item, handleValueChange, index, avatarPropsLocal, userLevel}) => (
  <Card
    style={styles.surface}
  >
    <Text
      style={styles.groupCategoryText}
    >
      {item.title}
    </Text>
    <Divider
      style={{margin: 3}}/>
    {userLevel >= item.level ?
      <RadioButton.Group
        onValueChange={newValue => handleValueChange(item.type, newValue, index)}
        value={avatarPropsLocal[item.type]}
    >
        {item.buttons.map(b => (
          <Card.Content
            key={b.value} style={styles.innerChoices}
        >
            <RadioButton.Item
              label={b.name} value={b.value} style={styles.radioButtonItems} labelStyle={{fontSize: 14}}
          />
          </Card.Content>
            ))}
      </RadioButton.Group>
    : 
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
        <Micon
          name='lock' size={90} color='gray'/>
        <Text>
          Level: {item.level}
        </Text>
      </View>}
  </Card>
)
const ITEM_HEIGHT = Dimensions.get('screen').width

const AvatarPreview = ({navigation}) => {

  const user = useSelector(state => state.activeUser.user)
  const userLevel = useSelector(state => state.activeUser.userLevel)
  const {avatarProps} = user
  const {avatarName} = user
  const [name, setName] = useState(avatarName || 'anonymous')
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const [avatarPropsLocal, setAvatarPropsLocal] = useState({
    accessory: avatarProps.accessory ? avatarProps.accessory : 'none',
      bgColor:avatarProps.bgColor ? avatarProps.bgColor : 'blue',
      body:avatarProps.body ? avatarProps.body :'breasts',
      clothing:avatarProps.clothing ? avatarProps.clothing :'shirt',
      clothingColor:avatarProps.clothingColor ? avatarProps.clothingColor :'white',
      eyebrows:avatarProps.eyebrows ? avatarProps.eyebrows :'leftLowered',
      eyes:avatarProps.eyes ? avatarProps.eyes :'normal',
      facialHair:avatarProps.facialHair ? avatarProps.facialHair :'none',
      graphic:avatarProps.graphic ? avatarProps.graphic :'none',
      hair:avatarProps.hair ? avatarProps.hair :'none',
      hairColor:avatarProps.hairColor ? avatarProps.hairColor :'brown',
      skinTone:avatarProps.skinTone ? avatarProps.skinTone :'brown',
      mouth:avatarProps.mouth ? avatarProps.mouth : 'lips',
      hat: avatarProps.hat ? avatarProps.hat : 'none',
      hatColor: avatarProps.hatColor ? avatarProps.hatColor : 'green',
      lipColor: avatarProps.lipColor ? avatarProps.lipColor : 'pink',
      showBackground: true,
      bgShape: 'squircle',
      lashes: true
  })

  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if(user){
      setIsLoading(false)
    }
  }, [user])
  const submitUpdate = async () => {
    if(!name) {
      ToastAndroid.show('ตั้งชื่อให้เราด้วยนะ', ToastAndroid.SHORT)
    }else{
      const id = user._id
      const avatarProps = {
        hat: avatarPropsLocal.hat,
        hatColor: avatarPropsLocal.hatColor,
        lashes: avatarPropsLocal.lashes,
        lipColor: avatarPropsLocal.lipColor,
        showBackground: avatarPropsLocal.showBackground,
        bgShape: avatarPropsLocal.bgShape,
        accessory: avatarPropsLocal.accessory,
        bgColor: avatarPropsLocal.bgColor,
        body: avatarPropsLocal.body,
        clothing: avatarPropsLocal.clothing,
        clothingColor: avatarPropsLocal.clothingColor,
        eyebrows: avatarPropsLocal.eyebrows,
        eyes: avatarPropsLocal.eyes,
        facialHair: avatarPropsLocal.facialHair,
        graphic: avatarPropsLocal.graphic,
        hair: avatarPropsLocal.hair,
        hairColor: avatarPropsLocal.hairColor,
        skinTone: avatarPropsLocal.skinTone,
        mouth: avatarPropsLocal.mouth,

      }
      const avatarName = name
      try {
        dispatch(updateUserAvatar(id, avatarProps, avatarName))
        navigation.navigate("MyQuestions")
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleValueChange = (type, newValue) => {

    switch(type) {
      case 'accessory':
        setAvatarPropsLocal({...avatarPropsLocal, accessory: newValue});
        break;
      case 'bgColor':
        setAvatarPropsLocal({...avatarPropsLocal, bgColor: newValue});
        break;
      case 'body':
        setAvatarPropsLocal({...avatarPropsLocal, body: newValue});
        break;
      case 'clothing':
        setAvatarPropsLocal({...avatarPropsLocal, clothing: newValue});
        break;
      case 'clothingColor':
        setAvatarPropsLocal({...avatarPropsLocal, clothingColor: newValue});
        break;
      case 'eyebrows':
        setAvatarPropsLocal({...avatarPropsLocal, eyebrows: newValue});
        break;
      case 'eyes':
        setAvatarPropsLocal({...avatarPropsLocal, eyes: newValue});
        break;
      case 'facialHair':
        setAvatarPropsLocal({...avatarPropsLocal,facialHair: newValue});
        break;
      case 'graphic':
        setAvatarPropsLocal({...avatarPropsLocal, graphic: newValue});
        break;
      case 'hair':
        setAvatarPropsLocal({...avatarPropsLocal, hair: newValue});
        break;
      case 'hairColor':
        setAvatarPropsLocal({...avatarPropsLocal, hairColor: newValue});
        break;
      case 'mouth':
        setAvatarPropsLocal({...avatarPropsLocal, mouth: newValue});
        break;
      case 'skinTone':
        setAvatarPropsLocal({...avatarPropsLocal,skinTone: newValue});
        break;
      case 'hat':
        setAvatarPropsLocal({...avatarPropsLocal, hat: newValue});
        break;
      case 'hatColor':
        setAvatarPropsLocal({...avatarPropsLocal, hatColor: newValue});
        break;
      case 'lipColor':
        setAvatarPropsLocal({...avatarPropsLocal, lipColor: newValue});
        break;
      }
  }

  const renderItem = ({ item, index}) => {
    return (
      <View
        style={styles.eachItemContainer}
      >
        <Item
          item={item}
          index={index}
          avatarPropsLocal={avatarPropsLocal}
          handleValueChange={handleValueChange}
          userLevel={userLevel}
        />
      </View>
    );
  };

  if(isLoading) {
    return(
      <View
        style={styles.loadingContainer}
      >
        <ActivityIndicator
          size="large" color="pink"
        />
      </View>
    )
  }

  return(
    <View
      style={styles.container}
    >
      <View
        style={styles.previewContainer}
      >
        <TextInput
          style={styles.textInput}
          mode='outlined'
          label="ชื่อ"
          value={name}
          dense
          onChangeText={text => setName(text)}
        />
        <BigHead
          accessory={avatarPropsLocal.accessory}
          bgColor={avatarPropsLocal.bgColor}
          bgShape={avatarPropsLocal.bgShape}
          body={avatarPropsLocal.body}
          clothing={avatarPropsLocal.clothing}
          clothingColor={avatarPropsLocal.clothingColor}
          eyebrows={avatarPropsLocal.eyebrows}
          eyes={avatarPropsLocal.eyes}
          facialHair={avatarPropsLocal.facialHair}
          graphic={avatarPropsLocal.graphic}
          hair={avatarPropsLocal.hair}
          hairColor={avatarPropsLocal.hairColor}
          hat={avatarPropsLocal.hat}
          hatColor={avatarPropsLocal.hatColor}
          lashes
          lipColor={avatarPropsLocal.lipColor}
          mouth={avatarPropsLocal.mouth}
          showBackground
          size={140}
          skinTone={avatarPropsLocal.skinTone}
          containerStyles={styles.avatarPreview}
        />
      </View>
      <View
        style={styles.flatListContainer}
      >
        <FlatList
          data={DATA}
          keyExtractor={item => item.type}
          horizontal
          showsHorizontalScrollIndicator={false}
          initialNumToRender={5}
          getItemLayout={(data, index) => ({length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index})}
          pagingEnabled={true}
          decelerationRate={'normal'}
          scrollEventThrottle={10}
          renderItem={(item, index, initTypes) => renderItem(item, index, initTypes)}
          onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          }
        )}
        >
        </FlatList>
      </View>
      <View
        style={styles.dotAndButtonContainer}
      >
        <ExpandingDot
          data={DATA}
          expandingDotWidth={30}
          dotSize={20}
          scrollX={scrollX}
          inActiveDotOpacity={0.3}
          dotStyle={{
        width: 10,
        height: 10,
        backgroundColor: 'lightgray',
        borderRadius: 5,
        marginHorizontal: 5
    }}
          containerStyle={{position: 'relative'}}
        />
        <Button
          mode='contained' style={styles.submitButton} onPress={submitUpdate}
        >
          <Text
            style={styles.submitButtonText}
          >
            บันทึก
          </Text>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatListContainer: {
    flex: 2,
  },
  eachItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: Dimensions.get('screen').width,
  },
  surface: {
    paddingTop: 5,
    elevation: 4,
    marginTop: 0,
    height: 240,
    width: 300
  },
  previewContainer: {
    flex: 1,
    paddingBottom: 20
  },
  avatarPreview: {
    alignSelf: 'center',
    marginTop: 0,
    paddingTop: 0,
  },
  textInput: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 0
  },
  groupCategoryText: {
    fontSize: 14,
    alignSelf: 'center',
    height: 24
  },
  radioButtonItems: {
    height: 33,
    paddingBottom: 10
  },
  dotAndButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitButton: {
    backgroundColor: 'pink',
    color: 'black',
    borderRadius: 20,
    width: 300,
    alignSelf: 'center',
    marginBottom: 10
  },
  submitButtonText: {
    alignSelf: 'center',
    color: 'black'
  }
})
export default AvatarPreview;