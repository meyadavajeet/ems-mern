import { Progress } from 'antd';
import React from 'react';
import './analytics.css';

const Analytics = ({ allTransaction }) => {

  /**
   * Total Transaction
   */
  // console.log(allTransaction,'allTransaction');
  const totalTransaction = allTransaction.length;
  const totalIncomeTransaction = allTransaction.filter((transaction) => transaction.type === 'income');
  const totalExpanseTransaction = allTransaction.filter((transaction) => transaction.type === 'expanse');
  const totalIncomePercent = (totalIncomeTransaction.length / totalTransaction) * 100;
  const totalExpansePercent = (totalExpanseTransaction.length / totalTransaction) * 100

  /**
   * Total Turnover
   */
  const totalTurnover = allTransaction
    .reduce(
      (accumulator, transaction) => accumulator + transaction.amount,
      0
    );

  const totalIncomeTurnOver = allTransaction
    .filter(
      (transaction) => transaction.type === 'income')
    .reduce(
      (accumulator, transaction) => accumulator + transaction.amount,
      0
    );

  const totalExpenseTurnOver = allTransaction
    .filter(
      (transaction) => transaction.type === 'expanse'
    )
    .reduce(
      (accumulator, transaction) => accumulator + transaction.amount,
      0
    );

  const totalIncomeTurnOverPercentage = (totalIncomeTurnOver / totalTurnover) * 100;
  const totalExpenseTurnOverPercentage = (totalExpenseTurnOver / totalTurnover) * 100;


  return (
    <>
      <div className="row mt-2">
        {/* Total Transaction */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Transaction : {totalTransaction}
            </div>
            <div className="card-body">
              <h5 className="card-title text-success">
                Income : {totalIncomeTransaction.length}
              </h5>
              <h5 className="card-title text-danger">
                Income : {totalExpanseTransaction.length}
              </h5>
              <div className="ex-progress-bar">
                <Progress
                  type='circle'
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type='circle'
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpansePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Total Income  */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Turnover : {totalTurnover}
            </div>
            <div className="card-body">
              <h5 className="card-title text-success">
                Income : {totalIncomeTurnOver}
              </h5>
              <h5 className="card-title text-danger">
                Income : {totalExpenseTurnOver}
              </h5>
              <div className="ex-progress-bar">
                <Progress
                  type='circle'
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomeTurnOverPercentage.toFixed(0)}
                />
                <Progress
                  type='circle'
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpenseTurnOverPercentage.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Analytics;
