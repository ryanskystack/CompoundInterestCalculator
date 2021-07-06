var iniPrincipal = document.getElementById("pv").value;
var rate = document.getElementById("anualInterest").value;
var regContri = document.getElementById("reg").value;
var regFreq = document.getElementById("freq").value;
var years = document.getElementById("investYears").value;
var compFreq = document.getElementById("compFreq").value;
var addContri1 = document.getElementById("input1a").value;
var addYear1 = document.getElementById("input1b").value;
var addContri1 = document.getElementById("input2a").value;
var addYear1 = document.getElementById("input2b").value;

var yearArr = [];
var iniPrincipalArr = [];
var regContriArr = [];
var addContriArr = [];
var interestArr = [];

var iniPrincipalObj = {
    name: 'Initial Principal',
    data: iniPrincipalArr
};

var regContriObj = {
    name: 'Regular Deposits',
    data: regContriArr
};

var addContriObj = {
    name: 'Additional Investment',
    data: addContriArr
};


var dataArr = [];


const 





function getYearlyData(deposit, regContribution, contributeFreq, interestRate, compoundFreq, investYear) {
    /**
     *  deposit: Int -> The initial deposit for the interest calculation. e.g, $10,000.
     *  regContribution: Int -> the amount of regular contribution. $100.
     *  contributeFreq: Int -> the frequency of contribution.
     *      1 -> yearly, 12 -> monthly, 26 -> fortnightly, 52 -> weekly, 365 -> daily. 
     *  interestRate: Float -> the compound interest Rate (annual rate). 0.05 => 5%
     *  compoundFreq: Int -> the frequency of compounding the interest. 1 -> yearly, 12 -> monthly.
     *  investYear: Int -> number of years of investment. 
     * 
     *  Returns an array of data series, each element in the array is [deposit, contribution, interest] 
     *  that's accumulated to that year.
     * 
     */
    let monthlyContribution = calculateMonthlyContribution(regContribution, contributeFreq) ; 
    let currentInvest = deposit ;
    let data = [] ;
    let accuContribution = 0 ; 
    let accuInterest = 0 ; 
    for (let i = 0 ; i < investYear ; i++) {
        let interest = calculateInterest(currentInvest, regContribution, contributeFreq, interestRate, compoundFreq) ; 
        accuContribution = accuContribution + monthlyContribution * 12 ; 
        accuInterest = accuInterest + interest ; 
        currentInvest = currentInvest + monthlyContribution * 12 + interest ; 
        data.push([deposit, accuContribution, accuInterest]) ; 
    }
    // console.log(data) ; // debug
    return data ; 
}

function calculateInterest (deposit, regContribution, contributeFreq, interestRate, compoundFreq) {
    /**
     *  deposit: Int -> The initial deposit for the interest calculation.
     *  regContribution: Int -> the amount of regular contribution.
     *  contributeFreq: Int -> the frequency of contribution. 1 -> yearly, 12 -> monthly, 26 -> fortnightly, 
     *      52 -> weekly, 365 -> daily. 
     *  interestRate: Float -> the compound interest Rate (annual rate).
     *  compoundFreq: Int -> the frequency of compounding the interest. 1 -> yearly, 12 -> monthly.
     *  Returns: the amount of interest generated in a year, by the given parameters. 
     * 
     *  Assuming contribution happens on the end of each cycle. 
     */
    return contributeInterest(regContribution, contributeFreq, interestRate, compoundFreq) + 
           depositInterest(deposit, interestRate, compoundFreq) ;    
}

function calculateMonthlyContribution (regContribution, contributionFreq) {
    /**
     *  Calculate the equal monthly contribution.
     * 
     */
    let contMap = new Map([[12, 1], [26, 26/12], [52, 52/12], [365, 30]]) ;
    let monthlyContribution = regContribution * contMap.get(contributionFreq) ; 
    return monthlyContribution ;
}

function contributeInterest (regContribution, contFreq, interestRate, compoundFreq) {
    /**
     *  Calculate the interest generated by the regular contribution. 
     *  regContribution: Int -> contribution amount, i.e., $100 
     *  contFreq: Int -> the frequency of contribution. 1 -> yearly, 12 -> monthly, 26 -> fortnightly,
     *      52 -> weekly, 365 -> daily. 
     *  interestRate: Float. The annual interest rate.
     *  compoundFreq: Int. 1 -> yearly, 12 -> monthly.
     *  Return only the *Interest* generated in this period (1 year), not including the contribution itself.
     */
    if (contFreq === 1 || compoundFreq == 1) {
        // Assuming the contribution made at the end of the year, so it doesn't accure any interest at all. 
        // When the interest only compound yearly, the interest for this year is zero. 
        return 0.0 ; 
    }

    // let contMap = new Map([[12, 1], [26, 26/12], [52, 52/12], [365, 30]]) ;
    // let monthlyContribution = regContribution * contMap.get(contFreq) ; 
    let monthlyContribution = calculateMonthlyContribution( regContribution, contFreq) ; 
    let monthlyInterestRate = interestRate / 12 ; 
    let result = 0.0 ; 
    for (let i = 0 ; i < 12 ; i++) {
        let interest = result * monthlyInterestRate ; 
        result = result + interest + monthlyContribution ; 
    }
    return Math.ceil(result - monthlyContribution * 12) ; 
}

function depositInterest (deposit, interestRate, compoundFreq) {
    /**
     *  Calculate the interest generated by the deposit.
     *  deposit: Int -> initial deposit amount.
     *  interestRate: Float -> must be non less than zero. The compounding interest annual rate. 
     *  compoundFreq: Int -> compounding frequency. 1 -> yearly, 12 -> monthly.  
     *  Return only the *INTEREST* generated in this period, not including the deposit.
     */ 
    return Math.ceil(deposit * (Math.pow(1+interestRate/compoundFreq, compoundFreq) - 1)) ; 
}