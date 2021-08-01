'use strict';

function calculateDeposit(monthsOfInterestAccrual, initialDepositAmount) {
    const depositAmountWithInterest = initialDepositAmount * (1 + annualInterestRate * monthsOfInterestAccrual / monthCalendarYear / 100) ** numberOfInterestPeriods; // сумма вклада с процентами
    const interestAmount = depositAmountWithInterest - initialDepositAmount; // сумма процентов (доход)
    const numberOfInterestPeriods = monthsOfInterestAccrual; // число периодов начисления процентов
    let annualInterestRate = ['2', '2.2', '2.3', '2.6', '2.7']; // годовая процентная ставка
    const monthCalendarYear = 12; // количество месяцев в календарном году

    if (numberOfInterestPeriods >= 3) {
        annualInterestRate = annualInterestRate[0];
    }
    else if (numberOfInterestPeriods >= 6) {
        annualInterestRate = annualInterestRate[1];
    }
    else if (numberOfInterestPeriods >= 9) {
        annualInterestRate = annualInterestRate[2];
    }
    else if (numberOfInterestPeriods >= 12) {
        annualInterestRate = annualInterestRate[3];
    }
    else if (numberOfInterestPeriods >= 18) {
        annualInterestRate = annualInterestRate[4];
    }

    return {
        depositAmountWithInterest,
        interestAmount,
        annualInterestRate,
    };
}

function handleSubmit(evt) {
    evt.preventDefault();

    depositAmountErrorEl.textContent = '';
    otherAmountErrorEl.textContent = '';
    totalEl.textContent = '';
    profitEl.textContent = '';
    percentEl.textContent = '';

    const depositAmount = Number(depositAmountErrorEl.value);
    if (Number.isNaN(depositAmount)) {
        depositAmountErrorEl.textContent = `Неверное значение. Введите число, например: 10000`;
        return;
    }

    const otherAmount = Number(otherAmountErrorEl.value);
    if (Number.isNaN(otherAmount)) {
        otherAmountErrorEl.textContent = `Неверное значение. Введите число, например: 10000`;
        return;
    }

    const result = calculateDeposit(depositAmount, otherAmount);
    totalEl.textContent = result.depositAmountWithInterest.toFixed(0);
    profitEl.textContent = result.interestAmount.toFixed(0);
    percentEl.textContent = result.annualInterestRate.toFixed(0);
}

const formEl = document.getElementById('deposit-form');
formEl.onsubmit = handleSubmit;

const monthsOfInterestAccrual = document.getElementById('period-input'); // количество месяцев начисления процентов по привлеченному вкладу
const initialDepositAmount = document.getElementById('amount-input'); // первоначальная сумма вклада (капитал)
const depositAmountErrorEl = document.getElementById('deposit-amount-error');
const otherAmountErrorEl = document.getElementById('other-amount-error');
const totalEl = document.getElementById('total');
const profitEl = document.getElementById('other-cashback');
const percentEl = document.getElementById('total-cashback');