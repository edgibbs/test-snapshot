import {takeEvery, put, select} from 'redux-saga/effects'
import {CLEAR_CARD_EDITS} from 'actions/screeningActions'
import {getScreeningSelector} from 'selectors/screeningSelectors'
import {resetAllegations} from 'actions/allegationsFormActions'
import {resetFieldValues as resetScreeningInformationValues} from 'actions/screeningInformationFormActions'
import {resetFieldValues as resetIncidentInformationValues} from 'actions/incidentInformationFormActions'
import {resetFieldValues as resetNarrativeFormValues} from 'actions/narrativeFormActions'
import {resetFieldValues as resetScreeningDecisionFormValues} from 'actions/screeningDecisionFormActions'

export function* clearCardEdits({payload: {card}}) {
  const screening = yield select(getScreeningSelector)
  const actions = {
  }
  yield put(actions[card](screening.toJS()))
}
export function* clearCardEditsSaga() {
  yield takeEvery(CLEAR_CARD_EDITS, clearCardEdits)
}
