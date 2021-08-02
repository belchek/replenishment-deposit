'use strict';

function calculateDeposit(initialDepositAmount, monthsOfInterestAccrual) {
    const monthCalendarYear = 12; // количество месяцев в календарном году
    const numberOfInterestPeriods = monthsOfInterestAccrual; // число периодов начисления процентов
    const termOfTheDeposit = [3, 6, 9, 12, 18];
    const annualInterestRate = [0, 2.0, 2.2, 2.3, 2.6, 2.7]; // годовая процентная ставка
    let annualsInterestRate = annualInterestRate[0];
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
    } else if (monthsOfInterestAccrual === termOfTheDeposit[4]) {
        annualsInterestRate = annualInterestRate[5];
    }
    const depositAmountWithInterest = initialDepositAmount * (1 + annualsInterestRate * (monthsOfInterestAccrual / monthsOfInterestAccrual) / monthCalendarYear / 100) ** numberOfInterestPeriods; // сумма вклада с процентами
    const interestAmount = depositAmountWithInterest - initialDepositAmount; // сумма процентов (доход)
    const limit = 50000000;
    const limitInterestAmount = (limit * (1 + annualsInterestRate * (monthsOfInterestAccrual / monthsOfInterestAccrual) / monthCalendarYear / 100) ** numberOfInterestPeriods) - limit;
    return {
        depositAmountWithInterest: depositAmountWithInterest > limit ? limit : depositAmountWithInterest,
        interestAmount: interestAmount > limitInterestAmount ? limitInterestAmount : interestAmount,
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

    const limitDepositAmount = [14999, 50000001];
    const limitOtherAmount = [2, 19];
    const depositAmount = Number(initialDepositAmountEl.value);
    if (Number.isNaN(depositAmount)) {
        depositAmountErrorEl.textContent = 'Неверное значение. Введите число, например: 15000';
        return;
    }
    if (depositAmount <= limitDepositAmount[0]) {
        depositAmountErrorEl.textContent = 'Неверное значение. Минимальная сумма: 15000 ₽';
        return;
    }
    if (depositAmount >= limitDepositAmount[1]) {
        depositAmountErrorEl.textContent = 'Неверное значение. Максимальная сумма: 50000000 ₽';
        return;
    }

    const otherAmount = Number(monthsOfInterestAccrualEl.value);
    if (Number.isNaN(otherAmount)) {
        otherAmountErrorEl.textContent = 'Неверное значение. Введите число месяцев, например: 3';
        return;
    }
    if (otherAmount <= limitOtherAmount[0]) {
        otherAmountErrorEl.textContent = 'Неверное значение. Минимальный период: 3 месяца';
        return;
    }
    if (otherAmount >= limitOtherAmount[1]) {
        otherAmountErrorEl.textContent = 'Неверное значение. Максимальный период: 18 месяцев';
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
const depositAmountErrorEl = document.getElementById('amount-error');
const otherAmountErrorEl = document.getElementById('period-error');
const totalEl = document.getElementById('total');
const profitEl = document.getElementById('profit');
const percentEl = document.getElementById('percent');