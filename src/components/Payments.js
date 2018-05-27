import React from 'react';
import PropTypes from 'prop-types';

const Payments = ({
  data,
  loading,
  toggleSortOrder,
  setSortBy,
  sortOrder,
}) => {
  const payments = data.map(payment => <Payment payment={payment} key={payment.id} />);
  return (
    <div>
      <h1>See all your payments here.</h1>
      <div>
        <h2>Payments</h2>
        <button className="sort-button" title="toggle" onClick={() => toggleSortOrder()}>
          Sort Order: {sortOrder}
        </button>
        {loading ? <div>Loading...</div> : null}
        <table className="payment-table" cellSpacing="0">
          <thead>
            <tr className="table-header">
              <td onClick={() => setSortBy('id')}>ID</td>
              <td onClick={() => setSortBy('amount')}>Amount</td>
              <td onClick={() => setSortBy('refunded')}>Refunded</td>
              <td onClick={() => setSortBy('disputed')}>Disputed</td>
              <td onClick={() => setSortBy('refund')}>Refund</td>
            </tr>
          </thead>
          <tbody>
            {payments}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Payment = ({ payment }) =>
  (
    <tr>
      <td>{payment.id}</td>
      <td>{payment.currency.toUpperCase()}: {(payment.amount / 100).toFixed(2)}</td>
      <td>{payment.refunded.toString()}</td>
      <td>{(payment.dispute != null).toString()}</td>
      <td>{payment.refundReason}</td>
      <td><button disabled={payment.refund || payment.dispute} /></td>
    </tr>
  );

export default Payments;

Payment.propTypes = {
  payment: PropTypes.object,
};

Payments.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  setSortBy: PropTypes.func,
  toggleSortOrder: PropTypes.func,
  sortOrder: PropTypes.string,
};

