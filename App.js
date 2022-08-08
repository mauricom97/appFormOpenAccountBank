import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Switch,
  Button
} from 'react-native'

import { Picker } from '@react-native-picker/picker'
import Slider from '@react-native-community/slider'
import { TextInputMask } from 'react-native-masked-text'
import _ from 'lodash'
import moment from 'moment'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = new Object()
    this.state.name = ''
    this.state.birthday = ''
    this.state.sexo = null
    this.state.sexos = new Array()
    this.state.sexos.push({ key: 0, label: 'Select gender', value: 0 }, { key: 1, label: 'Masculino', value: 'M' }, { key: 2, label: 'Feminino', value: 'F' })
    this.state.creditLimit = 100
    this.state.student = false

    this.sendValuesClint = this.sendValuesClint.bind(this)
  }

  sendValuesClint() {
    if (!this.state.name) return alert('Invalid name')
    if (!this.state.birthday) return alert('Invalid birthday')
    if (!this.state.sexo) return alert('Invalid gender')
    const info = `Name: ${this.state.name} Birthday: ${this.state.birthday} Gener: ${this.state.sexo} Limit: ${this.state.creditLimit} Student: ${this.state.student ? 'Sim' : 'Não'}`
    alert(info)
  }
  render() {
    let sexos = this.state.sexos.map((sexo, key) => {
      return <Picker.Item key={key} label={sexo.label} value={sexo.value} />
    })
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Open your account</Text>
          <TextInput style={styles.inputs} onChangeText={(name) => this.setState({ name: name })} placeholder='Inform your name' />
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY'
            }}
            value={this.state.birthday}
            onChangeText={(text) => this.setState({ birthday: text })}
            style={styles.inputBirthday}
            placeholder='Birthday'
          />
          <Picker
            selectedValue={this.state.sexo}
            onValueChange={(itemValue, itemIndex) => { this.setState({ sexo: itemValue }) }}
            style={{ color: '#f0f0f0' }}
          >
            {sexos}
          </Picker>

          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
            <Text style={{color: '#f0f0f0'}}>Student</Text>
            <Switch
              value={this.state.student}
              onValueChange={(value) => this.setState({ student: value })}
            />

          </View>

        </View>

        <View style={styles.creditLimit}>
          <Text style={{ fontSize: 20, color: '#f0f0f0', textAlign: 'center' }}>Your limit</Text>
          <Slider
            minimumValue={100}
            maximumValue={2000}
            onValueChange={(value) => this.setState({ creditLimit: value.toFixed(0) })}
          />
          <Text
            style={{ textAlign: 'center', fontSize: 30, color: '#f0f0f0', marginBottom: 120 }}>$ {(this.state.creditLimit) ? this.state.creditLimit : 100},00
          </Text>

          <Button
            title='Send'
            onPress={this.sendValuesClint}
          />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    backgroundColor: '#d64161'
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: '#f0f0f0'
  },
  inputs: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    margin: 5,
    borderRadius: 10
  },
  creditLimit: {
    margin: 30,
    color: '#f0f0f0',
    textAlign: 'center'
  },
  isStudent: {
    alignContent: 'rigth',
    textAlign: 'right'
  },
  form: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20
  },
  inputBirthday: {
    margin: 5,
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10
  }
})

export default App


