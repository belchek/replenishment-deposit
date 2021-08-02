'use strict';

function calculateDeposit(initialDepositAmount, monthsOfInterestAccrual) {
    const monthCalendarYear = 12; // количество месяцев в календарном году
    const numberOfInterestPeriods = monthsOfInterestAccrual; // число периодов начисления процентов
    const termOfTheDeposit = [3, 6, 9, 12, 18];
    const annualInterestRate = [0, 2.0, 2.2, 2.3, 2.6, 2.7]; // годовая процентная ставка
    let annualsInterestRate = annualInterestRate[5];
    if (monthsOfInterestAccrual < termOfTheDeposit[0]) {
        annualsInterestRate = annualInterestRate[0];
    } else if (monthsOfInterestAccrual < termOfTheDeposit[1]) {
        annualsInterestRate = annualInterestRate[1];
    } else if (monthsOfInterestAccrual < termOfTheDeposit[2]) {
        annualsInterestRate = annualInterestRate[2];
    } else if (monthsOfInterestAccrual < termOfTheDeposit[3]) {
        annualsInterestRate = annualInterestRate[3];
    } else if (monthsOfInterestAccrual < termOfTheDeposit[4]) {
        annualsInterestRate = annualInterestRate[4];
    }
    const depositAmountWithInterest = initialDepositAmount * (1 + annualsInterestRate * (monthsOfInterestAccrual / monthsOfInterestAccrual) / monthCalendarYear / 100) ** numberOfInterestPeriods; // сумма вклада с процентами
    const interestAmount = depositAmountWithInterest - initialDepositAmount; // сумма процентов (доход)
    return {
        depositAmountWithInterest,
        interestAmount,
        annualsInterestRate,
    };
}

function handleSubmit(evt) {
    evt.preventDefault();

    depositAmountErrorEl.textContent = '';
    otherAmountErrorEl.textContent = '';
    totalEl.textContent = '';
    profitEl.textContent = '';
    percentEl.textContent = '';

    const depositAmount = Number(initialDepositAmountEl.value);
    if (Number.isNaN(depositAmount)) {
        depositAmountErrorEl.textContent = `Неверное значение. Введите число, например: 10000`;
        return;
    }

    const otherAmount = Number(monthsOfInterestAccrualEl.value);
    if (Number.isNaN(otherAmount)) {
        otherAmountErrorEl.textContent = `Неверное значение. Введите число, например: 12`;
        return;
    }

    const result = calculateDeposit(depositAmount, otherAmount);
    totalEl.textContent = result.depositAmountWithInterest.toFixed(0);
    profitEl.textContent = result.interestAmount.toFixed(0);
    percentEl.textContent = result.annualsInterestRate.toFixed(1);
}

const formEl = document.getElementById('deposit-form');
formEl.addEventListener('submit', handleSubmit, true);

const monthsOfInterestAccrualEl = document.getElementById('period-input'); // количество месяцев начисления процентов по привлеченному вкладу
const initialDepositAmountEl = document.getElementById('amount-input'); // первоначальная сумма вклада (капитал)
const depositAmountErrorEl = document.getElementById('deposit-amount-error');
const otherAmountErrorEl = document.getElementById('other-amount-error');
const totalEl = document.getElementById('total');
const profitEl = document.getElementById('profit');
const percentEl = document.getElementById('percent');