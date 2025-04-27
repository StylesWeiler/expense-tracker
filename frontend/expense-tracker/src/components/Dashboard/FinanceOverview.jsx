import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ['#875Cf5', '#f5c75c', '#b0b0b0'];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpenses }) => {

    const balanceData = [
        { name: "Total Expenses", amount: totalExpenses },
        { name: "Total Income", amount: totalIncome },
    ];

    return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Financial Overview</h5>
        </div>

        <CustomPieChart
            data={balanceData}
            label="Total Balance"
            totalAmount={`${totalBalance}`}
            colors={COLORS}
            showTextAnchor
        />
    </div>
    )
};

export default FinanceOverview;
