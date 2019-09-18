import React, { Component } from 'react'
import {
  View,
  FlatList,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  ActivityIndicator,
  Keyboard,
} from 'react-native'
import Config from 'react-native-config'
import { Input } from 'ui'
const WINDOW = Dimensions.get('window')

global.XMLHttpRequest = global.originalXMLHttpRequest
  ? global.originalXMLHttpRequest
  : global.XMLHttpRequest
global.FormData = global.originalFormData ? global.originalFormData : global.FormData

fetch // Ensure to get the lazy property

if (window.__FETCH_SUPPORT__) {
  // it's RNDebugger only to have
  window.__FETCH_SUPPORT__.blob = false
} else {
  /*
   * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
   * If you're using another way you can just use the native Blob and remove the `else` statement
   */
  global.Blob = global.originalBlob ? global.originalBlob : global.Blob
  global.FileReader = global.originalFileReader ? global.originalFileReader : global.FileReader
}

class GooglePlacesAutocomplete extends Component {
  public _isMounted = false
  public _results = []
  public _requests = []

  constructor(props) {
    super(props)
    this.state = this.getInitialState.call(this)
  }

  public getInitialState = () => ({
    text: this.props.getDefaultValue(),
    dataSource: this.buildRowsFromResults([]),
    listViewDisplayed:
      this.props.listViewDisplayed === 'auto' ? false : this.props.listViewDisplayed,
  })

  public setAddressText = address => this.setState({ text: address })

  public getAddressText = () => this.state.text

  public buildRowsFromResults = results => {
    let res = []

    if (results.length === 0 || this.props.predefinedPlacesAlwaysVisible === true) {
      res = [...this.props.predefinedPlaces]

      if (this.props.currentLocation === true) {
        res.unshift({
          description: this.props.currentLocationLabel,
          isCurrentLocation: true,
        })
      }
    }

    res = res.map(place => ({
      ...place,
      isPredefinedPlace: true,
    }))

    return [...res, ...results]
  }

  public componentDidMount() {
    // This will load the default value's search results after the view has
    // been rendered
    this._handleChangeText(this.state.text)
    this._isMounted = true
  }

  public componentWillReceiveProps(nextProps) {
    let listViewDisplayed = true

    if (nextProps.listViewDisplayed !== 'auto') {
      listViewDisplayed = nextProps.listViewDisplayed
    }

    if (typeof nextProps.text !== 'undefined' && this.state.text !== nextProps.text) {
      this.setState(
        {
          listViewDisplayed,
        },
        this._handleChangeText(nextProps.text)
      )
    } else {
      this.setState({
        listViewDisplayed,
      })
    }
  }

  public componentWillUnmount() {
    this._abortRequests()
    this._isMounted = false
  }

  public _abortRequests = () => {
    this._requests.map(i => i.abort())
    this._requests = []
  }

  /**
   * This method is exposed to parent components to focus on textInput manually.
   * @public
   */
  public triggerFocus = () => {
    if (this.refs.textInput) {
      this.refs.textInput.focus()
    }
  }

  /**
   * This method is exposed to parent components to blur textInput manually.
   * @public
   */
  public triggerBlur = () => {
    if (this.refs.textInput) {
      this.refs.textInput.blur()
    }
  }

  // public getCurrentLocation = () => {
  //   let options = {
  //     enableHighAccuracy: false,
  //     timeout: 20000,
  //     maximumAge: 1000,
  //   }

  //   if (this.props.enableHighAccuracyLocation && Platform.OS === 'android') {
  //     options = {
  //       enableHighAccuracy: true,
  //       timeout: 20000,
  //     }
  //   }

  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       if (this.props.nearbyPlacesAPI === 'None') {
  //         const currentLocation = {
  //           description: this.props.currentLocationLabel,
  //           geometry: {
  //             location: {
  //               lat: position.coords.latitude,
  //               lng: position.coords.longitude,
  //             },
  //           },
  //         }

  //         this._disableRowLoaders()
  //         this.props.onPress(currentLocation, currentLocation)
  //       } else {
  //         // this._requestNearby(position.coords.latitude, position.coords.longitude)
  //       }
  //     },
  //     error => {
  //       this._disableRowLoaders()
  //       alert(error.message)
  //     },
  //     options
  //   )
  // }

  public _onPress = rowData => {
    if (rowData.isPredefinedPlace !== true && this.props.fetchDetails === true) {
      if (rowData.isLoading === true) {
        // already requesting
        return
      }

      Keyboard.dismiss()

      this._abortRequests()

      // display loader
      this._enableRowLoader(rowData)

      // fetch details
      const request = new XMLHttpRequest()
      this._requests.push(request)
      request.timeout = this.props.timeout
      request.ontimeout = this.props.onTimeout
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return
        }

        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText)

          if (responseJSON.status === 'OK') {
            if (this._isMounted === true) {
              const details = responseJSON.result
              this._disableRowLoaders()
              this._onBlur()

              this.setState({
                text: this._renderDescription(rowData),
              })

              delete rowData.isLoading
              this.props.onPress(rowData, details)
            }
          } else {
            this._disableRowLoaders()

            if (this.props.autoFillOnNotFound) {
              this.setState({
                text: this._renderDescription(rowData),
              })
              delete rowData.isLoading
            }

            if (!this.props.onNotFound) {
              console.warn('google places autocomplete: ' + responseJSON.status)
            } else {
              this.props.onNotFound(responseJSON)
            }
          }
        } else {
          this._disableRowLoaders()

          if (!this.props.onFail) {
            console.warn(
              'google places autocomplete: request could not be completed or has been aborted'
            )
          } else {
            this.props.onFail('request could not be completed or has been aborted')
          }
        }
      }

      // request.open(
      //   'GET',
      //   'https://maps.googleapis.com/maps/api/place/details/json?' +
      //     // url.format({
      //     //   key: this.props.query.key,
      //     //   placeid: rowData.place_id,
      //     //   language: this.props.query.language,
      //     //   ...this.props.GooglePlacesDetailsQuery,
      //     // })
      // )

      if (this.props.query.origin !== null) {
        request.setRequestHeader('Referer', this.props.query.origin)
      }

      request.send()
    } else if (rowData.isCurrentLocation === true) {
      // display loader
      this._enableRowLoader(rowData)

      this.setState({
        text: this._renderDescription(rowData),
      })

      this.triggerBlur() // hide keyboard but not the results
      delete rowData.isLoading
      // this.getCurrentLocation()
    } else {
      this.setState({
        text: this._renderDescription(rowData),
      })

      this._onBlur()
      delete rowData.isLoading
      const predefinedPlace = this._getPredefinedPlace(rowData)

      // sending predefinedPlace as details for predefined places
      this.props.onPress(predefinedPlace, predefinedPlace)
    }
  }

  public _enableRowLoader = rowData => {
    const rows = this.buildRowsFromResults(this._results)
    for (let i = 0; i < rows.length; i++) {
      if (
        rows[i].place_id === rowData.place_id ||
        (rows[i].isCurrentLocation === true && rowData.isCurrentLocation === true)
      ) {
        rows[i].isLoading = true
        this.setState({
          dataSource: rows,
        })
        break
      }
    }
  }

  public _disableRowLoaders = () => {
    if (this._isMounted === true) {
      for (let i = 0; i < this._results.length; i++) {
        if (this._results[i].isLoading === true) {
          this._results[i].isLoading = false
        }
      }

      this.setState({
        dataSource: this.buildRowsFromResults(this._results),
      })
    }
  }

  public _getPredefinedPlace = rowData => {
    if (rowData.isPredefinedPlace !== true) {
      return rowData
    }

    for (let i = 0; i < this.props.predefinedPlaces.length; i++) {
      if (this.props.predefinedPlaces[i].description === rowData.description) {
        return this.props.predefinedPlaces[i]
      }
    }

    return rowData
  }

  public _filterResultsByTypes = (unfilteredResults, types) => {
    if (types.length === 0) {
      return unfilteredResults
    }

    const results = []
    for (let i = 0; i < unfilteredResults.length; i++) {
      let found = false

      for (let j = 0; j < types.length; j++) {
        if (unfilteredResults[i].types.indexOf(types[j]) !== -1) {
          found = true
          break
        }
      }

      if (found === true) {
        results.push(unfilteredResults[i])
      }
    }
    return results
  }

  // public _requestNearby = (latitude, longitude) => {
  //   this._abortRequests()

  //   if (
  //     latitude !== undefined &&
  //     longitude !== undefined &&
  //     latitude !== null &&
  //     longitude !== null
  //   ) {
  //     const request = new XMLHttpRequest()
  //     this._requests.push(request)
  //     request.timeout = this.props.timeout
  //     request.ontimeout = this.props.onTimeout
  //     request.onreadystatechange = () => {
  //       if (request.readyState !== 4) {
  //         return
  //       }

  //       if (request.status === 200) {
  //         const responseJSON = JSON.parse(request.responseText)

  //         this._disableRowLoaders()

  //         if (typeof responseJSON.results !== 'undefined') {
  //           if (this._isMounted === true) {
  //             let results = []
  //             if (this.props.nearbyPlacesAPI === 'GoogleReverseGeocoding') {
  //               results = this._filterResultsByTypes(
  //                 responseJSON.results,
  //                 this.props.filterReverseGeocodingByTypes
  //               )
  //             } else {
  //               results = responseJSON.results
  //             }

  //             this.setState({
  //               dataSource: this.buildRowsFromResults(results),
  //             })
  //           }
  //         }
  //         if (typeof responseJSON.error_message !== 'undefined') {
  //           if (!this.props.onFail) {
  //             console.warn('google places autocomplete: ' + responseJSON.error_message)
  //           } else {
  //             this.props.onFail(responseJSON.error_message)
  //           }
  //         }
  //       } else {
  //         // console.warn("google places autocomplete: request could not be completed or has been aborted");
  //       }
  //     }

  //     let url = ''
  //     if (this.props.nearbyPlacesAPI === 'GoogleReverseGeocoding') {
  //       // your key must be allowed to use Google Maps Geocoding API
  //       url =
  //         'https://maps.googleapis.com/maps/api/geocode/json?' +
  //         // url.format({
  //         //   latlng: latitude + ',' + longitude,
  //         //   key: this.props.query.key,
  //         //   ...this.props.GoogleReverseGeocodingQuery,
  //         // })
  //     } else {
  //       url =
  //         'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' +
  //         // url.format({
  //         //   location: latitude + ',' + longitude,
  //         //   key: this.props.query.key,
  //         //   ...this.props.GooglePlacesSearchQuery,
  //         // })
  //     }

  //     request.open('GET', url)

  //     if (this.props.query.origin !== null) {
  //       request.setRequestHeader('Referer', this.props.query.origin)
  //     }

  //     request.send()
  //   } else {
  //     this._results = []
  //     this.setState({
  //       dataSource: this.buildRowsFromResults([]),
  //     })
  //   }
  // }

  public _request = text => {
    this._abortRequests()
    if (text.length >= this.props.minLength) {
      const request = new XMLHttpRequest()
      this._requests.push(request)
      request.timeout = this.props.timeout
      request.ontimeout = this.props.onTimeout
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return
        }

        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText)
          if (typeof responseJSON.predictions !== 'undefined') {
            if (this._isMounted === true) {
              const results =
                this.props.nearbyPlacesAPI === 'GoogleReverseGeocoding'
                  ? this._filterResultsByTypes(
                      responseJSON.predictions,
                      this.props.filterReverseGeocodingByTypes
                    )
                  : responseJSON.predictions

              this._results = results
              this.setState({
                dataSource: this.buildRowsFromResults(results),
              })
            }
          }
          if (typeof responseJSON.error_message !== 'undefined') {
            if (!this.props.onFail) {
              console.warn('google places autocomplete: ' + responseJSON.error_message)
            } else {
              this.props.onFail(responseJSON.error_message)
            }
          }
        } else {
          // console.warn("google places autocomplete: request could not be completed or has been aborted");
        }
      }
      if (this.props.preProcess) {
        text = this.props.preProcess(text)
      }
      request.open(
        'GET',
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=${encodeURIComponent(
          text
        )}&key=${Config.GOOGLE_PLACES_API_KEY}`
      )
      if (this.props.query.origin !== null) {
        request.setRequestHeader('Referer', this.props.query.origin)
      }

      request.send()
    } else {
      this._results = []
      this.setState({
        dataSource: this.buildRowsFromResults([]),
      })
    }
  }

  public clearText() {
    this.setState({
      text: '',
    })
  }

  public _onChangeText = text => {
    this._request(text)

    this.setState({
      text,
      listViewDisplayed: this._isMounted || this.props.autoFocus,
    })
  }

  public _handleChangeText = text => {
    this._onChangeText(text)

    const onChangeText =
      this.props && this.props.textInputProps && this.props.textInputProps.onChangeText

    if (onChangeText) {
      onChangeText(text)
    }
  }

  public _getRowLoader() {
    return <ActivityIndicator animating={true} size="small" />
  }

  public _renderRowData = rowData => {
    if (this.props.renderRow) {
      return this.props.renderRow(rowData)
    }

    return <Text>{this._renderDescription(rowData)}</Text>
  }

  public _renderDescription = rowData => {
    if (this.props.renderDescription) {
      return this.props.renderDescription(rowData)
    }

    return rowData.description || rowData.formatted_address || rowData.name
  }

  public _renderLoader = rowData => {
    if (rowData.isLoading === true) {
      return this._getRowLoader()
    }

    return null
  }

  public _renderRow = (rowData = {}, sectionID, rowID) => {
    return (
      <ScrollView
        style={{ flex: 1 }}
        scrollEnabled={this.props.isRowScrollable}
        keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <TouchableHighlight
          style={{ width: WINDOW.width }}
          onPress={() => this._onPress(rowData)}
          underlayColor={this.props.listUnderlayColor || '#c8c7cc'}
        >
          <View>
            {this._renderLoader(rowData)}
            {this._renderRowData(rowData)}
          </View>
        </TouchableHighlight>
      </ScrollView>
    )
  }

  public _renderSeparator = (sectionID, rowID) => {
    if (rowID == this.state.dataSource.length - 1) {
      return null
    }

    return <View key={`${sectionID}-${rowID}`} />
  }

  public _onBlur = () => {
    this.triggerBlur()

    this.setState({
      listViewDisplayed: false,
    })
  }

  public _onFocus = () => this.setState({ listViewDisplayed: true })

  public _renderPoweredLogo = () => {
    // if (!this._shouldShowPoweredLogo()) {
    //   return null
    // }
    // return (
    //   <View
    //     style={[
    //       this.props.suppressDefaultStyles ? {} : defaultStyles.row,
    //       defaultStyles.poweredContainer,
    //       this.props.styles.poweredContainer,
    //     ]}
    //   >
    //     <Image
    //       style={[
    //         this.props.suppressDefaultStyles ? {} : defaultStyles.powered,
    //         this.props.styles.powered,
    //       ]}
    //       resizeMode="contain"
    //       source={require('./images/powered_by_google_on_white.png')}
    //     />
    //   </View>
    // )

    return null
  }

  public _shouldShowPoweredLogo = () => {
    if (!this.props.enablePoweredByContainer || this.state.dataSource.length == 0) {
      return false
    }

    for (let i = 0; i < this.state.dataSource.length; i++) {
      const row = this.state.dataSource[i]

      if (!row.hasOwnProperty('isCurrentLocation') && !row.hasOwnProperty('isPredefinedPlace')) {
        return true
      }
    }

    return false
  }

  public _renderLeftButton = () => {
    if (this.props.renderLeftButton) {
      return this.props.renderLeftButton()
    }
  }

  public _renderRightButton = () => {
    if (this.props.renderRightButton) {
      return this.props.renderRightButton()
    }
  }

  public _getFlatList = () => {
    const keyGenerator = () =>
      Math.random()
        .toString(36)
        .substr(2, 10)

    if (
      (this.state.text !== '' ||
        this.props.predefinedPlaces.length ||
        this.props.currentLocation === true) &&
      this.state.listViewDisplayed === true
    ) {
      return (
        <FlatList
          scrollEnabled={!this.props.disableScroll}
          data={this.state.dataSource}
          keyExtractor={keyGenerator}
          extraData={[this.state.dataSource, this.props]}
          ItemSeparatorComponent={this._renderSeparator}
          renderItem={({ item }) => this._renderRow(item)}
          ListHeaderComponent={
            this.props.renderHeaderComponent && this.props.renderHeaderComponent(this.state.text)
          }
          ListFooterComponent={this._renderPoweredLogo}
          {...this.props}
        />
      )
    }

    return null
  }

  public render() {
    const { onFocus, clearButtonMode, ...userProps } = this.props.textInputProps
    return (
      <>
        <Input
          color="dark"
          placeholder="Search location"
          value={this.state.text}
          onFocus={
            onFocus
              ? () => {
                  this._onFocus()
                  onFocus()
                }
              : this._onFocus
          }
          autoFocus
          style={{ marginLeft: 20 }}
          onBlur={this._onBlur}
          onChangeText={this._handleChangeText}
        />

        {this._getFlatList()}
        {this.props.children}
      </>
    )
  }
}

GooglePlacesAutocomplete.defaultProps = {
  placeholder: 'Search',
  placeholderTextColor: '#A8A8A8',
  isRowScrollable: true,
  underlineColorAndroid: 'transparent',
  returnKeyType: 'default',
  keyboardAppearance: 'default',
  onPress: () => {},
  onNotFound: () => {},
  onFail: () => {},
  minLength: 0,
  fetchDetails: false,
  autoFocus: false,
  autoFillOnNotFound: false,
  keyboardShouldPersistTaps: 'always',
  getDefaultValue: () => '',
  timeout: 20000,
  onTimeout: () => console.warn('google places autocomplete: request timeout'),
  query: {
    key: 'missing api key',
    language: 'en',
    types: 'geocode',
  },
  GoogleReverseGeocodingQuery: {},
  GooglePlacesDetailsQuery: {},
  GooglePlacesSearchQuery: {
    rankby: 'distance',
    type: 'restaurant',
  },
  styles: {},
  textInputProps: {},
  enablePoweredByContainer: true,
  predefinedPlaces: [],
  currentLocation: false,
  currentLocationLabel: 'Current location',
  nearbyPlacesAPI: 'GooglePlacesSearch',
  enableHighAccuracyLocation: true,
  filterReverseGeocodingByTypes: [],
  predefinedPlacesAlwaysVisible: false,
  enableEmptySections: true,
  listViewDisplayed: 'auto',
  textInputHide: false,
  suppressDefaultStyles: false,
  numberOfLines: 1,
  onSubmitEditing: () => {},
  editable: true,
}

export default GooglePlacesAutocomplete
