import React, { useState, useEffect } from 'react';
import { LuPlus } from 'react-icons/lu';
import { prepareExpenseBarChartData } from '../../utils/helper';
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
      const result = prepareExpenseLineChartData(transactions);
      setChartData(result);
    
      return () => {};
    }, [transactions]);
    
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Expense Details</h5>
                <p className='text-xs text-gray-400 mt-0.5'>
                    Track your spending over time and analyze your expenses trends.
                </p>
            </div>
    
            <button className='add-btn' onClick={onExpenseIncome}>
                <LuPlus className='text-lg'/>
                Add Expense
            </button>
    
            <div className='mt-10'>
                <CustomLineChart data={chartData} />
            </div>
        </div>
      );
};

export default ExpenseOverview
