import React, { Component } from 'react'
import { Select } from '../../form/index'
import addressData from '../../../consts/addressData'
import Option from '../../form/select/Option'
import style from '../style.scss'
import { multStyle } from '../../../utils/common'
import PropTypes from 'prop-types'

export default class Cascade extends Component {
  constructor (props) {
    super(props)
    this.state = {
      recipientProvince: '110000',
      recipientProvinceLabel: '',
      recipientCityLabel: '',
      recipientCountryLabel: '',
      recipientCity: '',
      cityArr: [],
      recipientCountry: '',
      areaArr: []
    }
    this.getValue = this.getValue.bind(this)
  }

  getValue (value) {
    let name = value.name
    let recipientProvince = this.state.recipientProvince
    let recipientProvinceLabel = this.state.recipientProvinceLabel
    let recipientCity = this.state.recipientCity
    let recipientCityLabel = this.state.recipientCityLabel
    let recipientCountry = this.state.recipientCountry
    let recipientCountryLabel = this.state.recipientCountryLabel
    let cityArr = this.state.cityArr
    let areaArr = this.state.areaArr
    switch (name) {
      case 'recipientProvince':
        recipientProvince = value.value
        recipientCity = ''
        recipientCountry = ''
        areaArr = []
        for (let i in addressData) {
          if (addressData[i].value === recipientProvince) {
            recipientProvinceLabel = addressData[i].label
            cityArr = addressData[i].children
          }
        }
        break
      case 'recipientCity':
        recipientCity = value.value
        recipientCountry = ''
        for (let i in cityArr) {
          if (cityArr[i].value === recipientCity) {
            recipientCityLabel = cityArr[i].label
            areaArr = cityArr[i].children
          }
        }
        break
      case 'recipientCountry':
        recipientCountry = value.value
        for (let i in areaArr) {
          if (recipientCountry === areaArr[i].value) {
            recipientCountryLabel = areaArr[i].label
          }
        }
        break
    }
    this.setState({
      recipientProvince,
      recipientCity,
      recipientProvinceLabel,
      recipientCountryLabel,
      recipientCityLabel,
      cityArr,
      recipientCountry,
      areaArr
    })
    if (name === 'recipientCountry') {
      this.props.getDistrict({
        recipientProvince:recipientProvinceLabel,
        recipientCity:recipientCityLabel,
        recipientCountry:recipientCountryLabel
      })
    }
    // 获取地址字符串，例如：广东省，深圳市，南山区
  }

  componentDidMount () {
    // let district = this.props.district
    this.setState({
      ...this.props.district
    })
  }
  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    let district = nextProps.district
    let recipientProvinceLabel = district.recipientProvince
    let recipientCityLabel = district.recipientCity
    let recipientCountryLabel = district.recipientCountry
    let recipientProvince = ''
    let recipientCity = ''
    let recipientCountry = ''
    let cityArr = []
    let areaArr = []
    for (let i in addressData) {
      if (addressData[i].label === recipientProvinceLabel) {
        recipientProvince = addressData[i].value
        cityArr = addressData[i].children
        for (let j in cityArr) {
          if (cityArr[j].label === recipientCityLabel) {
            recipientCity = cityArr[j].value
            areaArr = cityArr[j].children
            for (let k in areaArr) {
              if (areaArr[k].label === recipientCountryLabel) {
                recipientCountry = areaArr[k].value
              }
            }
          }
        }
      }
    }
    this.setState({
      recipientProvince,
      recipientCity,
      recipientProvinceLabel,
      recipientCountryLabel,
      recipientCityLabel,
      cityArr,
      recipientCountry,
      areaArr
    })
  }

  render () {
    return (
      <div>
        <Select name={'recipientProvince'} className={multStyle(style.cascade_select)} onChange={
          this.getValue
        } selectValue={this.state.recipientProvince}>
          {
            addressData.map(item => {
              return <Option value={item.value} key={item.value}>{item.label}</Option>
            })
          }
        </Select>
        <Select name={'recipientCity'} className={multStyle(style.cascade_select)} onChange={
          this.getValue
        } selectValue={this.state.recipientCity}>
          {
            this.state.cityArr.map(item => {
              return <Option value={item.value} key={item.value}>{item.label}</Option>
            })
          }
        </Select>
        <Select name={'recipientCountry'} className={multStyle(style.cascade_select)} onChange={
          this.getValue
        } selectValue={this.state.recipientCountry}>
          {
            this.state.areaArr.map(item => {
              return <Option value={item.value} key={item.value}>{item.label}</Option>
            })
          }
        </Select>
      </div>
    )
  }
}
Cascade.propTypes = {
  getDistrict: PropTypes.func.isRequired,
  district:PropTypes.object
}
