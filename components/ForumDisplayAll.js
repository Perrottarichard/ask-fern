import React, { useEffect, useState, useCallback } from 'react';
import {
  View, FlatList, StyleSheet, ActivityIndicator, RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {BigHead} from 'react-native-bigheads'
import { List, Chip, Text, Card , Menu, Provider, Button, useTheme} from 'react-native-paper';
import { initializeForumAnswered, activePost } from '../reducers/forumReducer';
import NoPostsYet from './NoPostsYet'
import Micon from 'react-native-vector-icons/MaterialCommunityIcons'

const tagOptions = [
  { tag: 'ปัญหาเรื่องเพศ', backgroundColor: '#ff5c4d', icon: 'gender-male-female' },
  { tag: 'relationships', backgroundColor: '#63ba90', icon: 'account-heart-outline' },
  { tag: 'ความรัก', backgroundColor: '#ffa64d', icon: 'heart-broken' },
  { tag: 'lgbt', backgroundColor: '#ff4da6', icon: 'gender-transgender' },
  { tag: 'เพื่อน', backgroundColor: '#5050ff', icon: 'account-group' },
  { tag: 'โรคซึมเศร้า', backgroundColor: '#343a40', icon: 'emoticon-sad-outline' },
  { tag: 'ความวิตกกังวล', backgroundColor: '#5e320f', icon: 'lightning-bolt' },
  { tag: 'ไบโพลาร์', backgroundColor: '#f347ff', icon: 'arrow-up-down' },
  { tag: 'การทำงาน', backgroundColor: '#8e2bff', icon: 'cash' },
  { tag: 'สุขภาพจิต', backgroundColor: '#1e45a8', icon: 'brain' },
  { tag: 'การรังแก', backgroundColor: '#5e320f', icon: 'emoticon-angry-outline' },
  { tag: 'ครอบครัว', backgroundColor: '#ffa64d', icon: 'home-heart' },
  { tag: 'อื่นๆ', backgroundColor: '#707571', icon: 'head-question' },
  { tag: 'การเสพติด', backgroundColor: '#eb4034', icon: 'pill' },
];
const chooseTagColor = (passed) => {
  const color = tagOptions.find((t) => t.tag === passed);
  if (color) {
    return color.backgroundColor;
  }
  return 'magenta';
};

const chooseIcon = (passed) => {
  const icon = tagOptions.find(t => t.tag === passed);
  if(icon) {
    return icon.icon;
  }
  return 'star'
}

export const timeSince = (date) => {
  if (typeof date !== 'object') {
    date = new Date(date);
  }
  const seconds = Math.floor((new Date() - date) / 1000);
  let intervalType;

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'ปี';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'เดือน';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'วัน';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "ชั่วโมง";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "นาที";
          } else {
            interval = seconds;
            intervalType = "วินาที";
          }
        }
      }
    }
  }
  return `${interval  }${  intervalType}`;
};

const wait = (timeout) => new Promise((resolve) => {
  setTimeout(resolve, timeout);
});

const applyFilterByTag = (allAnsweredPosts, filter) => {
  if(filter === 'แสดงทั้งหมด'){
    return allAnsweredPosts;
  }
  return allAnsweredPosts.filter(f => f.tags.includes(filter))
}
const Item = ({ item, onPress}) => (
  <Card
    style={styles.cardStyle} key={item._id}
  >
    <List.Item
      title={item.title}
      description={`โพสต์ของ ${item.user?.avatarName} ${timeSince(item.date)} ที่ผ่านมา`}
      left={() => <BigHead
        {...item.user?.avatarProps} size={50}
                  />}
      titleStyle={styles.headTitle}
      descriptionStyle={styles.descriptionStyle}
      titleNumberOfLines={3}
      descriptionNumberOfLines={2}
      underlayColor='white'
      rippleColor='#f2f2f2'
      titleEllipsizeMode='tail'
      onPress={onPress}
      style={styles.listItemStyle}
    />
    <View
      style={styles.bottomTags}
    >
      <Chip
        key={item._id} mode='outlined' backgroundColor='white' icon={chooseIcon(item.tags[0])} style={styles.chip} textStyle={{ color: chooseTagColor(item.tags[0]), ...styles.chipText}}
      >{item.tags[0]}
      </Chip>
      <Micon.Button
        name='comment'
        size={24}
        style={styles.commentMiconButton}
        color='lightgray'
        underlayColor='transparent'
        backgroundColor='transparent'
      >
        <Text
          style={styles.miconText}
        >{item.comments.length}
        </Text>
      </Micon.Button>
      <Micon.Button
        name="heart"
        color="pink"
        size={26}
        style={styles.commentMiconButton}
        underlayColor='transparent'
        backgroundColor='transparent'
        iconStyle={styles.fixHeartPosition}
      >
        <Text
          style={styles.miconText}
        >
          {item.likes}
        </Text>
      </Micon.Button>
    </View>
  </Card>
);

const ForumDisplayAll = ({navigation}) => {
  const dispatch = useDispatch();
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  let forumAnswered = useSelector((state) => state.forum.answered);
  const [selectedFilterTag, setSelectedFilterTag] = useState('แสดงทั้งหมด')
  const [filterMenuVisible, setFilterMenuVisible] = useState(false)

  forumAnswered = applyFilterByTag(forumAnswered, selectedFilterTag)
  const DATA = forumAnswered.sort((a, b) => new Date(b.date) - new Date(a.date))
 
  const openMenu = () => setFilterMenuVisible(true);

  const closeMenu = () => setFilterMenuVisible(false);

  const handleSetFilter = (value) => {
    setSelectedFilterTag(value)
    closeMenu(  )
  }

  const onRefresh = useCallback(() => {
    console.log('Callback Refresh init answered')
    setRefreshing(true);
    dispatch(initializeForumAnswered());
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

  useEffect(() => {
    if(!forumAnswered){
      dispatch(initializeForumAnswered());
    }else{
      setIsLoading(false)
    }
  }, [dispatch, forumAnswered]);

  const renderItem = ({item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          dispatch(activePost(item))
          navigation.navigate('SinglePostDisplay', {
            post: item,
          });
        }}
      />
    );
  };

  if (isLoading) {
    return (
      <View
        style={styles.loadingContainer}
      >
        <ActivityIndicator
          size="large" color="pink"
        />
      </View>
    );
  }
  return (
    <Provider>
      <View
        style={{...styles.container, backgroundColor: theme.colors.background}}
      >
        <View
          style={styles.filterContainer}
        >
          <Menu
            style={styles.picker}
            visible={filterMenuVisible}
            onDismiss={closeMenu}
            anchor={<Button
              mode='text'
              onPress={openMenu}
                    ><Text
                      style={{color: theme.colors.accent}}>ตัวกรอง: </Text><Text
                        > {selectedFilterTag}</Text></Button>}
          >
            <Menu.Item
              title='แสดงทั้งหมด' onPress={() => handleSetFilter('แสดงทั้งหมด')}
            />
            <Menu.Item
              title='ปัญหาเรื่องเพศ' value='ปัญหาเรื่องเพศ' onPress={() => handleSetFilter('ปัญหาเรื่องเพศ')}
            />
            <Menu.Item
              title='การเสพติด' value='การเสพติด' onPress={() => handleSetFilter('การเสพติด')}
            />
            <Menu.Item
              title='เพื่อน' value='เพื่อน' onPress={() => handleSetFilter('เพื่อน')}
            />
            <Menu.Item
              title='lgbt' value='lgbt' onPress={() => handleSetFilter('lgbt')}
            />
            <Menu.Item
              title='โรคซึมเศร้า' value='โรคซึมเศร้า' onPress={() => handleSetFilter('โรคซึมเศร้า')}
            />
            <Menu.Item
              title='ความวิตกกังวล' value='ความวิตกกังวล' onPress={() => handleSetFilter('ความวิตกกังวล')}
            />
            <Menu.Item
              title='ไบโพลาร์' value='ไบโพลาร์' onPress={() => handleSetFilter('ไบโพลาร์')}
            />
            <Menu.Item
              title='relationships' value='relationships' onPress={() => handleSetFilter('relationships')}
            />
            <Menu.Item
              title='การทำงาน' value='การทำงาน' onPress={() => handleSetFilter('การทำงาน')}
            />
            <Menu.Item
              title='สุขภาพจิต' value='สุขภาพจิต' onPress={() => handleSetFilter('สุขภาพจิต')}
            />
            <Menu.Item
              title='การรังแก' value='การรังแก' onPress={() => handleSetFilter('การรังแก')}
            />
            <Menu.Item
              title='ครอบครัว' value='ครอบครัว' onPress={() => handleSetFilter('ครอบครัว')}
            />
            <Menu.Item
              title='อื่นๆ' value='อื่นๆ' onPress={() => handleSetFilter('อื่นๆ')}
            />
            <Menu.Item
              title='ความรัก' value='ความรัก' onPress={() => handleSetFilter('ความรัก')}
            />
          </Menu>
        </View>
      
        <FlatList 
          style={styles.scroll} 
          refreshControl={<RefreshControl
            refreshing={refreshing} onRefresh={onRefresh}
                          />}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          ListEmptyComponent={<NoPostsYet />}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterContainer: {
    flex: 0.05,
    flexDirection: 'row',
    marginBottom: 0,
    paddingBottom: 10,
    paddingTop: 0,
    width: '100%',
    justifyContent: 'flex-start'
  },
  picker: {
    flex: 1,
    width: 200,
    justifyContent: 'center'
  },
  scroll: {
    flex: 1,
  },
  cardStyle: {
    flex: 1,
    borderRadius: 10,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 4,
    paddingRight: 0,
    marginBottom: 14
  },
  listItemStyle: {
    paddingLeft: 5, 
    margin: 0,
    borderRadius: 10,
  },
  bottomTags: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    height: 40,
  },
  headTitle: {
    fontWeight: 'bold',
    padding: 0,
  },
  descriptionStyle: {
    color: 'gray',
    fontSize: 10
  },
  chip: {
    marginTop: 10,
    marginRight: 5,
    height: 20,
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
  chipText: {
    fontSize: 10,
    marginLeft: 0,
    marginRight: 2,
    opacity: 0.7
  },
  commentMiconButton: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderColor: 'white',
    alignSelf: 'center',
    marginTop: 3,
    height: 40,
  },
  miconText: {
    color: 'gray',
    padding: 0,
    margin: 0,
    fontSize: 11,
    backgroundColor: 'transparent'
  },
  fixHeartPosition: {
    paddingBottom: 2
  },
});
export default ForumDisplayAll;
