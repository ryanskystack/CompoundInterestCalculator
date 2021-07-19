function sortAndCombineInvestments(investments) {
    /**
     *  Sort the investments by their years, for all the investments made in the same year, combine them into
     *  a single investment. 
     *  For example, [(1000, 3), (2000, 2), (500, 1), (1000, 2)] => [(500, 1), (3000, 2), (1000, 3)]
     *  
     *  investments: [(money, year)]. e.g, [(1000, 2), (2000, 3)] meaning at year two a $1000 investment
     *      was made, and at year 3 $2000 investment was made. 
     */
    if (investments.length == 0) return [] ; 
    let sortInvestments = investments.sort((a,b) => a[1]-b[1]) ;
    let result = [] ; 
    result.push(sortInvestments[0]) ;
    let size = 1 ; 
    for (let i = 1 ; i < sortInvestments.length ; i++) {
        // Combine the investments that has the same year. 
        if (result[size-1][1] == sortInvestments[i][1]) {
            result[size-1][0] += sortInvestments[i][0] ; 
        }
        else {
            result.push(sortInvestments[i]) ; 
            size += 1 ; 
        }
    }
    return result ; 
}

// for debug purposes
function printInvestmentData(investment, year) {
    let [deposit, contribution, interest] = investment ; 
    return `year ${year}: deposit=${deposit}, contribution=${contribution}, interest=${interest}` ;
}

function genYearList (year) {
    let result = [] ;
    for (let i = 0 ; i < year ; i++) result.push(i+1) ;
    return result ;
}

function debugMain() {
    let [deposit, regContribution, contributeFreq, interestRate, compoundFreq, investYear] = 
    /**
     *  Initial deposit: 10000
     *  regular fortnight investment: 200
     */
    [10000, 200, 26, 0.05, 12, 30] ; 
    let additionalInvestments = [[500, 2], [1500, 5], [5000, 1], [3500, 3], [4500, 29], [5000, 30]] ;
    let result = getYearlyDataWithAdditionalInvestment
        (deposit, regContribution, contributeFreq, interestRate, compoundFreq, investYear, additionalInvestments) ;
    
    console.log(result) ; // debug
    // let result2 = getYearlyData(deposit, regContribution, contributeFreq, interestRate, compoundFreq, investYear)  ;
    // console.log(result2) ; 
    chart(genYearList(investYear), result) ; 
}

function getYearlyDataWithAdditionalInvestment 
(deposit, regContribution, contributeFreq, interestRate, compoundFreq, investYear, additionalInvestments) {
    /*
     *  deposit: Int -> The initial deposit for the interest calculation. e.g, $10,000.
     *  regContribution: Int -> the amount of regular contribution. $100.
     *  contributeFreq: Int -> the frequency of contribution.
     *      1 -> yearly, 12 -> monthly, 26 -> fortnightly, 52 -> weekly, 365 -> daily. 
     *  interestRate: Float -> the compound interest Rate (annual rate). 0.05 => 5%
     *  compoundFreq: Int -> the frequency of compounding the interest. 1 -> yearly, 12 -> monthly.
     *  investYear: Int -> number of years of investment. 
     *  additionalInvestments: List[(investment, year)], data for additional investments. 
     * 
     *  Returns an array of data series, each element in the array is [deposit, contribution, interest] 
     *  that's accumulated to that year. Consider the additional Investments. 
     * 
     */
    let addInvestments = sortAndCombineInvestments(additionalInvestments) ; 
    // debug
    // console.log(deposit, regContribution, contributeFreq, interestRate, compoundFreq, investYear, additionalInvestments) ;

    // if there's no additional investments. 
    if (addInvestments.length == 0) {
        // temp is [[deposit, accuContribution, interest]]
        let temp = getYearlyData(deposit, regContribution, contributeFreq, interestRate, compoundFreq, investYear) ;
        let depositList = temp.map(elem => Math.ceil(elem[0])) ;
        let contributionList = temp.map(elem => Math.ceil(elem[1])) ; 
        let interestList = temp.map(elem => Math.ceil(elem[2])) ; 
        let result = [
            { name: 'Deposit', data: depositList }, 
            { name: 'Regular Contribution', data: contributionList },
            { name: 'Interest', data: interestList }
        ] ;
        return result ;
    }

    const generateDepositList = (year) => {
        let curDeposit = deposit ; 
        let result = [] ;
        let curYear = 1 ; 
        addInvestments.forEach(item => {
            for (let i = curYear ; i < item[1] ; i++) {
                result.push(curDeposit) ;
            }
            curDeposit += item[0] ;
            curYear = item[1]+1 ;
            result.push(curDeposit) ; 
        }) ; 
        while (curYear <= year) {
            result.push(curDeposit) ; 
            curYear += 1 ; 
        }
        return result ; 
    }
    const generateRegContributionList = (year) => {
        let monthlyContribution = calculateMonthlyContribution(regContribution, contributeFreq) ; 
        let yearlyContribution = 12 * monthlyContribution ;
        let result = [] ; 
        let curContribution = yearlyContribution ; 
        for (let i = 0 ; i < year ; i++) {
            result.push(curContribution) ; 
            curContribution += yearlyContribution ;
        }
        return result ; 
    }
    let depositList = generateDepositList(investYear) ; 
    let contributionList = generateRegContributionList(investYear) ; 
   
    let monthlyContribution = calculateMonthlyContribution(regContribution, contributeFreq) ; 
    let yearlyContribution = 12 * monthlyContribution ;
    // calculate the investment performance year by year
    let curDeposit = deposit ; 
    let interestList = [] ; 
    let curInterest = 0 ; 
    for (let i = 0 ; i < investYear ; i++) {
        if (addInvestments.length > 0 && additionalInvestments[0][1] == i) {
            curDeposit += addInvestments[0][0] ; 
            addInvestments.splice(0, 1) ; 
        }
        let temp = getYearlyData(curDeposit, regContribution, contributeFreq, interestRate, compoundFreq, 1)[0] ; 
        let interest = temp[2] ;
        let contribution = temp[1] ; 
        curDeposit = curDeposit + contribution + interest; 
        curInterest += interest ; 
        interestList.push(curInterest) ; 
    }
    let result = [
        { name: 'Deposit', data: depositList.map(num => Math.ceil(num)) }, 
        { name: 'Regular Contribution', data: contributionList.map(num => Math.ceil(num)) },
        { name: 'Interest', data: interestList.map(num => Math.ceil(num))}
    ] ;
    // console.log(result) ; // debug
    return result ; 
}

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
    let contMap = new Map([[1, 1/12], [12, 1], [26, 26/12], [52, 52/12], [365, 30]]) ;
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