import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function App() {

  //B9x2wD3ZmG6ag7FvSxHdV2kRq2vSGcAe

const [currency, setCurrency] = useState('Not selected');
const [selectedCurrency, setSelectedCurrency] = useState();
const [sum, setSum] = useState('');
const [endResult, setEndResult] = useState('');

var myHeaders = new Headers();
myHeaders.append("apikey", "B9x2wD3ZmG6ag7FvSxHdV2kRq2vSGcAe");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const getCurrencies = () => {
fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=GBP%2CUSD&base=EUR", requestOptions)
  .then(response => response.json())
  console.log(response)
  .then(responseJson => setCurrency(responseJson.rates))
  console.log(responseJson)
  .catch(error => console.log('error', error));
}

//HUOM: muuta sum EUR exchange rate -laskutoimitukseksi:
//(selectedCurrency * sum) * EUR exchange rate
const getConversion = () => {
    const endResult = parseFloat(selectedCurrency) * parseFloat(sum);
    setEndResult(endResult);
  }

  return (
    <View style={styles.container}>

    <MaterialCommunityIcons name="currency-eur" size={ 70 } color="black" />

      <View>
        <Text style={ styles.text }>
          { endResult }
        </Text>
      </View>
      
      <View>
        <TextInput
          style={ styles.input }
          keyboardType='numeric'
          onChangeText={ text => setSum(text) } 
          value={ sum }
          />
      </View>
      
      <View>
        <Picker
          style={ styles.picker }
          selectedValue={ selectedCurrency }
          onValueChange={ (itemValue, itemIndex) =>
            setSelectedCurrency(itemValue)
          }>
          <Picker.Item label='Please select currency' value='Unknown' />
          <Picker.Item label='Dummy option' value='10' />
          <Picker.Item label='GBP' value='0.877119' />
          <Picker.Item label='USD' value='1.00163' />
          
        </Picker>
        <Text style={{ textAlign: 'center', fontSize: 15, marginBottom: 4 }}>
          Your currency rate: { selectedCurrency }
        </Text>
      </View>

      <View style={ styles.button }>
        <Button title='CONVERT' onPress={ getConversion } />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 150
  },
  input : {
    width: 100,
    height: 30,
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
button : {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'lightblue',
    margin: 5,
    marginBottom: 50,
    borderColor: 'black',
    borderWidth: 1,
    width: '30%'
  },
text : {
  color: 'black',
  fontSize: 20,
  marginBottom: 4,
  },
picker : {
  padding: 2,
  margin: 2,
  borderColor: 'black',
  width: 300
}
});
