import { Progress } from 'antd';
import React from 'react';
import './analytics.css';

const Analytics = ({ allTransaction }) => {

  // category
  const totalCategories = ["other", "salary", "tip", "project", "movie", "bills", "tax", "medical", "fees"];


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
      <div className="row mt-3 text-center">
        {/* Total Transaction */}
        <div className="col-md-2"></div>

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
                Expanse : {totalExpanseTransaction.length}
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
                Expanse : {totalExpenseTurnOver}
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
      <div className="row mt-3 text-center">
        <div className="col-md-2"></div>
        <div className="col-md-4">
          <div className='card'>
            <div className="card-header">
              Category wise Income
            </div>
            <div className='card-body'>
              {
                totalCategories.map((category) => {
                  const amount = allTransaction.filter(
                    (transaction) => transaction.type === 'income' && transaction.categories === category
                  ).reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
                  console.log(amount)
                  return (
                    (amount > 0) &&
                    <div className='card'>
                      <div className="card-header">
                        {category}
                      </div>
                      <div className='card-body'>
                        <Progress
                          percent={((amount / totalIncomeTurnOver) * 100).toFixed(0)}
                        />
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className='card'>
            <div className="card-header">
              Category wise Expanse
            </div>
            <div className='card-body'>
              {
                totalCategories.map((category) => {
                  const amount = allTransaction.filter(
                    (transaction) => transaction.type === 'expanse' && transaction.categories === category
                  ).reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
                  console.log(amount)
                  return (
                    (amount > 0) &&
                    <div className='card'>
                      <div className="card-header">
                        {category}
                      </div>
                      <div className='card-body'>
                        <Progress
                          percent={((amount / totalExpenseTurnOver) * 100).toFixed(0)}
                        />
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Analytics;
