import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Text, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'Users.db',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

const Timer = ({navigation, seconds}) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [Double, setDouble] = useState(0);
  const [UserId, setUserId] = useState('');

  function navegat() {
    navigation.navigate('SorryView'); //WARNING
  }

  if (seconds != 9999) {
    if (timeLeft <= 0) {
      navegat();
    }

    useFocusEffect(
      React.useCallback(() => {
        getUser();
      }, []),
    );

    useFocusEffect(
      React.useCallback(() => {
        // exit early when we reach 0
        if (!timeLeft) return;

        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
      }, [timeLeft]),
    );

    const getUser = async () => {
      const storageUser = await AsyncStorage.getItem('IdUser');
      const storageTimeDouble = await AsyncStorage.getItem('Double');
      setUserId(storageUser);
      setDouble(storageTimeDouble - 1);

      if (storageTimeDouble >= 1) {
        setData();
        setTimeLeft(seconds * 2);
      }
    };

    const setData = async () => {
      await db.transaction(async tx => {
        await tx.executeSql('UPDATE Users SET Double=? WHERE ID = ?;', [
          Double,
          UserId,
        ]);
        await AsyncStorage.setItem('Double', JSON.stringify(Double));
        //forceUpdate()
      });
    };

    return (
      <View style={styles.view}>
        <Text style={styles.text}>{timeLeft}</Text>
      </View>
    );
  } else {
    return <View></View>;
  }
};

export default Timer;

const styles = StyleSheet.create({
  text: {
    color: '#637aff',
    fontSize: 22,
  },
  view: {
    position: 'absolute',
    right: '50%',
    top: 25,
  },
});
