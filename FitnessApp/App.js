/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import GoogleFit, {Scopes} from 'react-native-google-fit';
const App: () => React$Node = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    onRequestToGetSteps();
  }, []);

  const onFetchSteps = async () => {
    await onRequestToGetSteps();
    await onGetSteps();
  };
  const onRequestToGetSteps = async () => {
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ_WRITE,
        Scopes.FITNESS_ACTIVITY_READ,
      ],
    };
    await GoogleFit.authorize(options)
      .then((res) => {
        console.log('authorized >>>', res);
      })
      .catch((err) => {
        console.log('err >>> ', err);
      });
  };
  const onGetSteps = async () => {
    await GoogleFit.startRecording((STEP_RECORDING) => {
      console.log('Recording...');
    });
    await GoogleFit.getDailySteps(new Date())
      .then(async (res) => {
        await setData(res);
      })
      .catch();
  };
  console.log('app rendered!');
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Số bước chân trong ngày:</Text>
              <Text style={styles.sectionDescription}>
                {data[2]?.steps[0] ? data[2]?.steps[0]?.value : '...loading'}
              </Text>
            </View>
          </View>
          <Button onPress={onFetchSteps} title={'Fetch Step'}></Button>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
