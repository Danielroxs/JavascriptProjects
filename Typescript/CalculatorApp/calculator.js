"use strict";
function calculateInvestment(data) {
    const { initialAmount, annualContribution, expectedReturn, duration } = data;
    if (initialAmount <= 0) {
        return 'El importe de inversión inicial debe ser mayor que 0';
    }
    if (duration <= 0) {
        return 'Cantidad de tiempo no válida';
    }
    if (expectedReturn < 0) {
        return 'El retorno esperado debe ser al menos 0';
    }
    let total = initialAmount;
    let totalContributions = 0;
    const annualResults = [];
    for (let i = 0; i < duration; i++) {
        total += annualContribution;
        totalContributions += annualContribution;
        total *= 1 + expectedReturn;
        const totalInterestEarned = total - totalContributions - initialAmount;
        annualResults.push({
            year: i + 1,
            totalAmount: total,
            totalContributions,
            totalInterestEarned,
        });
    }
    return annualResults;
}
function printResults(results) {
    if (typeof results === 'string') {
        console.log(results);
        return;
    }
    for (const yearEndResults of results) {
        console.log(`Año: ${yearEndResults.year}`);
        console.log(`Total invertido: ${yearEndResults.totalContributions.toFixed(0)}`);
        console.log(`Total acumulado: ${yearEndResults.totalAmount.toFixed(0)}`);
        console.log(`Intereses ganados: ${yearEndResults.totalInterestEarned.toFixed(0)}`);
        console.log('-------------------');
    }
}
const investmentData = {
    initialAmount: 5000,
    annualContribution: 500,
    expectedReturn: 0.08,
    duration: 10,
};
const results = calculateInvestment(investmentData);
printResults(results);
