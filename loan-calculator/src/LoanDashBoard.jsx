import { useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LoanDashBoard() {

    const [principle, setPrinciple] = useState(1000000);
    const [downPayment, setDownPayment] = useState(200000);
    const [loanAmount, setLoanAmount] = useState(800000);
    const [tenure, setTenure] = useState(5);
    const [interesetRate, setInteresetRate] = useState(9);

    const totalLoanMonths = tenure * 12;
    const interestPerMonth = interesetRate / 100 /12;
    const monthlyEMI = (loanAmount * interestPerMonth *(1 + interestPerMonth) ** totalLoanMonths) / ((1 + interestPerMonth) ** totalLoanMonths - 1);
    const totalInterest = monthlyEMI * totalLoanMonths - loanAmount;

    const chartData = {
        labels : ['Loan Amount', 'Total Interest'],
        datasets : [
            {
                data: [loanAmount, totalInterest],
                backgroundColor: ['#84CC16', '#60A5FA']
            },
        ],
    };

    const changeDownPayment = (value) => {
        setDownPayment(value);
        setLoanAmount(principle - value);
    }

    const changeLoanAmount = (value) => {
        setLoanAmount(value);
        setDownPayment(principle - value);
    }


  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
        <h1 className="text-center text-4xl">EMI Calculator</h1>

        <div className="container w[80vw] flex gap-4 justify-between items-center mt-8">
            <div className="input-container w-1/2">
                <div className="input-element w-full">
                    <h3 className="mb-2">Principle</h3>
                    <h1 className="text-2xl">₹ {principle}</h1>
                    <input 
                        type="range"
                        min="100000"
                        max="30000000"
                        step="50000"
                        value={principle}
                        onChange={(e) => {
                            const newValue = Number(e.target.value);
                            setPrinciple(newValue);
                            setLoanAmount(newValue - downPayment);
                        }}
                         className="w-full"
                    />
                </div>

                <div className="input-element w-full">
                    <h3 className="mb-2">DownPayment</h3>
                    <h1 className="text-2xl">₹ {downPayment}</h1>
                    <input 
                        type="range"
                        min="0"
                        max={principle}
                        step="50000"
                        value={downPayment}
                        onChange={(e) => changeDownPayment(Number(e.target.value))}
                        className="w-full"      
                    />
                </div>

                <div className="input-element w-full">
                    <h3 className="mb-2">Loan Amount</h3>
                    <h1 className="text-2xl">₹ {loanAmount}</h1>
                    <input 
                        type="range"
                        min="0"
                        max={principle}
                        step="50000"
                        value={loanAmount}
                        onChange={(e) => changeLoanAmount(Number(e.target.value))}
                        className="w-full"      
                    />
                </div>

                <div className="input-element w-full">
                    <h3 className="mb-2">Tenure (Years)</h3>
                    <h1 className="text-2xl">{tenure} years</h1>
                    <input 
                        type="range"
                        min="0"
                        max="30"
                        step="1"
                        value={tenure}
                        onChange={(e) => setTenure(Number(e.target.value))}
                        className="w-full"      
                    />
                </div>

                <div className="input-element w-full">
                    <h3 className="mb-2">Interest Rate</h3>
                    <h1 className="text-2xl">{interesetRate}%</h1>
                    <input 
                        type="range"
                        min="0"
                        max="20"
                        step="0.1"
                        value={interesetRate}
                        onChange={(e) => setInteresetRate(Number(e.target.value))}
                        className="w-full"      
                    />
                </div>


            </div>
            <div className="output-container flex flex-col items-center w-1/3 text-2xl md:text-lg">
                <h1>Monthly Emi : <strong>₹ {monthlyEMI.toFixed(2)}</strong></h1>
                <h1>Total Interest : <strong>₹ {totalInterest.toFixed(2)}</strong></h1>
                <Pie data={chartData}/>
            </div>
        </div>
    </div>
  )
}
