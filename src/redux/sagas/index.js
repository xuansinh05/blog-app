import { all } from 'redux-saga/effects';
import blogSaga from '../../containers/Blogs/store/sagas';
// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield all([blogSaga()]);
}
