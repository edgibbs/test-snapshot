import {Map, List, fromJS} from 'immutable'
import {buildSelector} from 'selectors'
import {systemCodeDisplayValue} from 'selectors/systemCodeSelectors'

export const mapLanguages = (state, result) => buildSelector(
  (state) => state.get('languages'),
  () => (result.get('languages') || List()),
  (statusCodes, languages) => (
    languages
      .sort((first, second) => second.get('primary') - first.get('primary'))
      .map((language) => (
        systemCodeDisplayValue(language.get('id'), statusCodes))
      )

  )
)(state)

export const mapIsSensitive = (result) => (result.get('sensitivity_indicator', '').toUpperCase() === 'S')
export const mapIsSealed = (result) => (result.get('sensitivity_indicator', '').toUpperCase() === 'R')

export const mapRaces = (state, result) => buildSelector(
  (state) => state.get('ethnicityTypes'),
  (state) => state.get('raceTypes'),
  (state) => state.get('unableToDetermineCodes'),
  () => (result.getIn(['race_ethnicity', 'race_codes']) || List()),
  () => result.get('unable_to_determine_code'),
  (ethnicityTypes, raceTypes, unableToDetermineCodes, races, unableToDetermineCode) => {
    if (unableToDetermineCode) {
      return List([systemCodeDisplayValue(unableToDetermineCode, unableToDetermineCodes)])
    } else {
      return races
        .map((race) => (Map({
          race: systemCodeDisplayValue(race.get('id'), raceTypes),
          race_detail: systemCodeDisplayValue(race.get('id'), ethnicityTypes),
        })))
    }
  }
)(state)

export const mapEthnicities = (state, result) => buildSelector(
  (state) => state.get('hispanicOriginCodes'),
  () => (result.getIn(['race_ethnicity', 'hispanic_codes']) || List()),
  () => (result.getIn(['race_ethnicity', 'hispanic_origin_code'])),
  (hispanicOriginCodes, ethnicities, hispanicLatinoOriginCode) => fromJS({
    hispanic_latino_origin: systemCodeDisplayValue(hispanicLatinoOriginCode, hispanicOriginCodes),
    ethnicity_detail: ethnicities.map((ethnicity) => ethnicity.get('description')).toJS(),
  })
)(state)

export const mapAddress = (state, result) => buildSelector(
  (state) => state.get('addressTypes'),
  () => (result.get('addresses') || List()).isEmpty(),
  () => result.getIn(['addresses', 0, 'city']),
  () => result.getIn(['addresses', 0, 'state_code']),
  () => result.getIn(['addresses', 0, 'zip']),
  () => result.getIn(['addresses', 0, 'type', 'id']),
  () => result.getIn(['addresses', 0, 'street_number']),
  () => result.getIn(['addresses', 0, 'street_name']),
  (addressTypes, addressesEmpty, city, stateCode, zip, typeId, streetNumber, streetName) => {
    if (addressesEmpty) { return null } else {
      const type = systemCodeDisplayValue(typeId, addressTypes)
      return Map({
        city: city,
        state: stateCode,
        zip: zip,
        type: type ? type : '',
        streetAddress: `${streetNumber} ${streetName}`,
      })
    }
  }
)(state)

export const mapDoraPersonToParticipant = (state, person) => Map({
  date_of_birth: person.get('date_of_birth'),
  approximate_age: null,
  approximate_age_units: null,
  first_name: person.get('first_name'),
  middle_name: person.get('middle_name'),
  last_name: person.get('last_name'),
  gender: person.get('gender'),
  ssn: person.get('ssn'),
  sealed: mapIsSealed(person),
  sensitive: mapIsSensitive(person),
  phone_numbers: person.get('phone_numbers'),
  addresses: List([(mapAddress(state, person) || Map())
    .mapKeys((k) => (k === 'streetAddress' ? 'street_address' : k))]),
  legacy_id: person.get('id') || person.getIn(['legacy_descriptor', 'legacy_id']),
  id: person.get('id') || person.getIn(['legacy_descriptor', 'legacy_id']),
  roles: List(),
  languages: mapLanguages(state, person),
  races: mapRaces(state, person),
  ethnicity: mapEthnicities(state, person),
})
