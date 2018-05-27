import React from 'react';
import PropTypes from 'prop-types';

const Disputes = ({
  data,
  loading,
  toggleSortOrder,
  setSortBy,
  sortOrder
}) => {
  const disputes = data.map(dispute => <Dispute dispute={dispute} key={dispute.id} />);
  return (
    <div>
      <h1>See all your disputes here.</h1>
      <div>
        <h2>Disputes</h2>
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
              <td onClick={() => setSortBy('refund')}>Reason</td>
            </tr>
          </thead>
          <tbody>
            {disputes}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Dispute = ({ dispute }) =>
  (
    <tr>
      <td>{dispute.id}</td>
      <td>{dispute.currency.toUpperCase()}: {(dispute.amount / 100).toFixed(2)}</td>
      <td>N/A</td>
      <td>{dispute.reason}</td>
      <td><button disabled={dispute.status !== 'needs_response'} /></td>
    </tr>
  );

export default Disputes;

Dispute.propTypes = {
  dispute: PropTypes.object,
};

Disputes.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  setSortBy: PropTypes.func,
  toggleSortOrder: PropTypes.func,
  sortOrder: PropTypes.string,
};

