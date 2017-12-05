import { connect } from 'react-redux';
import { getCurrencies } from 'reducers';
import CurrencyAnswer from '../components/CurrencyAnswer';

const mapStateToProps = (state) => ({
  currencies: getCurrencies(state),
});

export default connect(mapStateToProps)(CurrencyAnswer);