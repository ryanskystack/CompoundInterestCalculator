// Validating input:
// all the input of years, iniPrincipal, rate, regContri : not null && num && >0;
// 0<rate<21
// 0<year<51
// when  of addContri and addYear: 
//     addContri num&&!<0 
//     if addContri ===0, addYear should exists.
//     addYear!==0;
//     addYear1!==addYear2;
//     addYear1<addYear2;
//     addYear2!==total years;

const yearArrGenerator = (year) => {
    let temp = new Array(year);
    for (let i = 0; i < temp.length; i++) {
        temp[i] = i + 1;
    };
    return temp;
};

const iniPrincipalArrGenerator = (year, ini) => {
    let temp = new Array(year);
    for (let i = 0; i < temp.length; i++) {
        temp[i] = Math.round(ini);
    };
    return temp;
};

const regContriArrGenerator = (year, regAmount, regFre) => {
    let temp = new Array(year);
    for (let i = 0; i < temp.length; i++) {
        temp[i] = Math.round(regAmount * regFre * (i + 1));
    };
    return temp;
};

const addContriArrGenerator = (year) => {
    let addContri1Input = document.getElementById("input1a");
    let addYear1Input = parseInt(document.getElementById("input1b").value);
    let addContri2Input = document.getElementById("input2a");
    let addYear2Input = parseInt(document.getElementById("input2b").value);
    if (addContri1Input || addContri2Input) {
        addContri1 = parseInt(addContri1Input.value);
        addYear1 = Math.round(addYear1Input);
        addContri2 = parseInt(addContri2Input.value);
        addYear2 = Math.round(addYear2Input);
    } else {
        return
    }

    let temp = new Array(year);
    if (addContri1 !== 0) {
        for (let i = 0; i < addYear1; i++) {
            temp[i] = 0;
        };
        temp[addYear1 - 1] = Math.round(
            temp[addYear1 - 1]
            + addContri1
        );

        if (addContri2 !== 0) {
            for (let i = addYear1; i < addYear2; i++) {
                temp[i] = Math.round(
                    temp[i - 1]
                );
            };
            temp[addYear2 - 1] = Math.round(
                temp[addYear2 - 1]
                + addContri2
            );
            for (let i = addYear2; i < temp.length; i++) {
                temp[i] = Math.round(
                    temp[i - 1]
                );
            };
        } else {
            for (let i = addYear1; i < temp.length; i++) {
                temp[i] = Math.round(
                    temp[i - 1]
                );
            };
        }
    } else {
        if (addContri2 !== 0) {
            for (let i = 0; i < addYear2; i++) {
                temp[i] = 0;
            };
            temp[addYear2 - 1] = Math.round(
                temp[addYear2 - 1]
                + addContri2
            );
            for (let i = addYear2; i < temp.length; i++) {
                temp[i] = Math.round(
                    temp[i - 1]
                );
            };
        } else {
            for (let i = 0; i < temp.length; i++) {
                temp[i] = 0;
            };
        }
    }

    return temp;
}

const totalArrGenerator = (year, compFreq0, iniPrincipal0, rate0, regContri0, regFreq0) => {   
    let addContri1Input = document.getElementById("input1a");
    let addYear1Input = parseInt(document.getElementById("input1b").value);
    let addContri2Input = document.getElementById("input2a");
    let addYear2Input = parseInt(document.getElementById("input2b").value);
    let addContri1 = parseInt(addContri1Input.value);
    let addYear1 = Math.round(addYear1Input);
    let addContri2 = parseInt(addContri2Input.value);
    let addYear2 = Math.round(addYear2Input);
    let iniPrincipal = parseInt(iniPrincipal0);
    let rate = parseInt(rate0);
    let regContri = parseInt(regContri0);
    let compFreq = parseInt(compFreq0);
    let regFreq = parseInt(regFreq0);
    let output1;
    let output2;
    switch (parseInt(regFreq)) {
        case 1:
            output1 = 365;
            break;
        case 12:
            output1 = 30;
            break;
        case 26:
            output1 = 14;
            break;
        case 52:
            output1 = 7;
            break;
        case 365:
            output1 = 1;
            break;
        default:
            output1 = 0;
            break;
    }
    let duration = parseInt(output1, 10);

    switch (parseInt(compFreq)) {
        case 1:
            output2 = 1;
            break;
        case 12:
            output2 = 12;
            break;
        default:
            output2 = 0;
            break;
    }

    let calPeriods = parseInt(output2, 10);

    let temp = new Array(year);

    if (addContri1 !== 0) {
        if (addYear1 === 1) {
            temp[0] = Math.round(
                iniPrincipal * ((1 + (rate * 0.01 / calPeriods)) ** (calPeriods))
                + regContri * (regFreq + rate * 0.01 / 365 * (365 * regFreq - duration * regFreq * (regFreq + 1) / 2))
                + addContri1
            );
            console.log('add1=1: Year1:', temp[0]);
            if (addContri2 !== 0) {
                for (let i = 1; i < addYear2; i++) {
                    temp[i] = Math.round(
                        temp[i - 1] * ((1 + (rate * 0.01 / calPeriods)) ** (calPeriods))
                        + regContri * (regFreq + rate * 0.01 / 365 * (365 * regFreq - duration * regFreq * (regFreq + 1) / 2))
                    );
                    console.log(`add1=1$add2!=0: Year ${i} <add2 :`, temp[i]);
                };
                temp[addYear2 - 1] = Math.round(
                    temp[addYear2 - 1]
                    + addContri2
                );
                console.log('add1=1&add2!=0: Year add2:', temp[addYear2 - 1]);
                for (let i = addYear2; i < temp.length; i++) {
                    temp[i] = Math.round(
                        temp[i - 1] * ((1 + (rate * 0.01 / calPeriods)) ** (calPeriods))
                        + regContri * (regFreq + rate * 0.01 / 365 * (365 * regFreq - duration * regFreq * (regFreq + 1) / 2))
                    );
                    console.log(`add1=1&add2!=0: Year ${i} > add2 :`, temp[i]);
                };
            }
            else {
                for (let i = 1; i < temp.length; i++) {
                    temp[i] = Math.round(
                        temp[i - 1] * ((1 + (rate * 0.01 / calPeriods)) ** (calPeriods))
                        + regContri * (regFreq + rate * 0.01 / 365 * (365 * regFreq - duration * regFreq * (regFreq + 1) / 2))
                    );
                    console.log(`add1=1&add2=0: Year  ${i}> 1:`, temp[i]);
                };
            }
        }
        else {

            temp[0] = Math.round(
                iniPrincipal * (1 + (rate * 0.01 / calPeriods)) ** (calPeriods)
                +  regContri * (regFreq + rate * 0.01 / 365 * (365 * regFreq - duration * regFreq * (regFreq + 1) / 2)) 
            )
                ;
            console.log('add1!=1: Year1:', temp[0]);

            if (addContri2 !== 0) {
                for (let i = 1; i < addYear1; i++) {
                    temp[i] = Math.round(
                        ((1 + (rate * 0.01 / calPeriods)) ** (calPeriods)) * temp[i - 1]
                        + (regFreq + rate * 0.01 * (365 * regFreq - duration * regFreq * (regFreq + 1) / 2) / 365) * regContri
                    );
                    console.log(`add1!=1$add2!=0: Year ${i} <add1 :`, temp[i]);
                };
                temp[addYear1 - 1] = Math.round(
                    temp[addYear1 - 1]
                    + addContri1
                );
                console.log('add1!=1&add2!=0: Year add1:', temp[addYear1 - 1]);

                for (let i = addYear1; i < addYear2; i++) {
                    temp[i] = Math.round(
                        temp[i - 1] * ((1 + (rate * 0.01 / calPeriods)) ** (calPeriods))
                        + regContri * (regFreq + rate * 0.01 / 365 * (365 * regFreq - duration * regFreq * (regFreq + 1) / 2))
                    );
                    console.log(`add1!=1&add2!=0: add1 <Year ${i}<add2:`, temp[i]);
                };
                temp[addYear2 - 1] = Math.round(
                    temp[addYear2 - 1]
                    + addContri2
                );
                console.log('add1!=1&add2!=0: Year add2:', temp[addYear2 - 1]);
                for (let i = addYear2; i < temp.length; i++) {
                    temp[i] = Math.round(
                        temp[i - 1] * ((1 + (rate * 0.01 / calPeriods)) ** (calPeriods))
                        + regContri * (regFreq + rate * 0.01 / 365 * (365 * regFreq - duration * regFreq * (regFreq + 1) / 2))
                    );
                    console.log(`add1!=1&add2!=0: Year ${i} > add2 :`, temp[i]);
                };
            } else {
                for (let i = 1; i < addYear1; i++) {
                    temp[i] = Math.round(
                        temp[i - 1] * ((1 + (rate * 0.01 / calPeriods)) ** (calPeriods))
                        + regContri * (regFreq + rate * 0.01 / 365 * (365 * regFreq - duration * regFreq * (regFreq + 1) / 2))
                    );
                    console.log(`add1!=1$add2=0: Year ${i} <add1 :`, temp[i]);
                };
                temp[addYear1 - 1] = Math.round(
                    temp[addYear1 - 1] * ((1 + (rate * 0.01 / calPeriods)) ** (calPeriods))
                    + regContri * (regFreq + rate * 0.01 / 365 * (365 * regFreq - duration * regFreq * (regFreq + 1) / 2))
                    + addContri1
                );
                console.log('add1!=1&add2=0: Year add1:', temp[addYear1 - 1]);

                for (let i = addYear1; i < temp.length; i++) {
                    temp[i] = Math.round(
                        temp[i - 1] * ((1 + (rate * 0.01 / calPeriods)) ** (calPeriods))
                        + regContri * (regFreq + rate * 0.01 / 365 * (365 * regFreq - duration * regFreq * (regFreq + 1) / 2))
                    );
                    console.log(`add1!=1&add2=0: add1 <Year ${i}<add2:`, temp[i]);
                };
            }
        }
    } else {
        if (addYear2 !== 0) {
            if (addYear2 === 1) {
                temp[0] = Math.round(
                    iniPrincipal * ((1 + (rate * 0.01 / calPeriods)) ** (calPeriods))
                    + regContri * (regFreq + rate * 0.01 / 365 * (365 * regFreq - duration * regFreq * (regFreq + 1) / 2))
                    + addContri2
                );
                console.log('add1=0&add2=1: Year1:', temp[0]);
                for (let i = 1; i < temp.length; i++) {
                    temp[i] = Math.round(
                        temp[i - 1] * ((1 + (rate * 0.01 / calPeriods)) ** (calPeriods))
                        + regContri * (regFreq + rate * 0.01 / 365 * (365 * regFreq - duration * regFreq * (regFreq + 1) / 2))
                    );
                    console.log(`add1=0&add2=1: Year  ${i}> 1:`, temp[i]);
                }
            } else {
                //addYear2!==1
                temp[0] = Math.round(
                    iniPrincipal * ((1 + (rate * 0.01 / calPeriods)) ** (calPeriods))
                    + regContri * (regFreq + rate * 0.01 / 365 * (365 * regFreq - duration * regFreq * (regFreq + 1) / 2))
                );
                console.log('add1=0&add2!=1: Year1:', temp[0]);
                for (let i = 1; i < addYear2; i++) {
                    temp[i] = Math.round(
                        temp[i - 1] * ((1 + (rate * 0.01 / calPeriods)) ** (calPeriods))
                        + regContri * (regFreq + rate * 0.01 / 365 * (365 * regFreq - duration * regFreq * (regFreq + 1) / 2))
                    );
                    console.log(`add1=0&add2!=1: Year ${i}<add2:`, temp[i]);
                };
                temp[addYear2 - 1] = Math.round(
                    temp[addYear2 - 1]
                    + addContri2
                );
                console.log('add1=0&add2!=1: Year add2:', temp[addYear2 - 1]);
                for (let i = addYear2; i < temp.length; i++) {
                    temp[i] = Math.round(
                        temp[i - 1] * ((1 + (rate * 0.01 / calPeriods)) ** (calPeriods))
                        + regContri * (regFreq + rate * 0.01 / 365 * (365 * regFreq - duration * regFreq * (regFreq + 1) / 2))
                    );
                    console.log(`add1=0&add2!=1: Year ${i} > add2 :`, temp[i]);
                };
            }
        } else {
            for (let i = 1; i < temp.length; i++) {
                temp[i] = Math.round(
                    temp[i - 1] * ((1 + (rate * 0.01 / calPeriods)) ** (calPeriods))
                    + regContri * (regFreq + rate * 0.01 / 365 * (365 * regFreq - duration * regFreq * (regFreq + 1) / 2))
                );
                console.log(`add1=0&add2=0: Year ${i} :`, temp[i]);
            }
        }
    }

    return temp;
};

const interestArrGenerator = (year, totalArr, iniPrincipalArr, regContriArr, addContriArr) => {
    let temp = new Array(year);
    for (let i = 0; i < temp.length; i++) {
        temp[i] = totalArr[i] - iniPrincipalArr[i] - regContriArr[i] - addContriArr[i];
    }
    return temp;
};

const objGenerator = (label, array) => {
    // Creating a JS object to add array into it
    let Obj = {
        name: label,
        data: array
    };
    return Obj
};

const dataGenerator = (iniPrincipalArr, regContriArr, addContriArr, interestArr) => {
    let iniPrincipalObj = objGenerator('Initial Principal', iniPrincipalArr);
    let regContriObj = objGenerator('Regular Deposits', regContriArr);
    let addContriObj = objGenerator('Additional Investment', addContriArr);
    let interestObj = objGenerator('Total Interest', interestArr);
    let temp = [
        iniPrincipalObj, regContriObj, addContriObj, interestObj
    ];
    return temp;
};

const calculator = () => {
    let iniPrincipal = document.getElementById("pv").value;
    let rate = document.getElementById("anualInterest").value;
    let regContri = document.getElementById("reg").value;
    let regFreq = document.getElementById("freq").value;
    let yearsInput = document.getElementById("investYears").value;
    let compFreq = document.getElementById("compFreq").value;
    let years = Math.round(yearsInput);
    // let addContri1Input = document.getElementById("input1a");
    // let addYear1Input = parseInt(document.getElementById("input1b").value);
    // let addContri2Input = document.getElementById("input2a");
    // let addYear2Input = parseInt(document.getElementById("input2b").value);
    // if (addContri1Input || addContri2Input) {
    //     addContri1 = parseInt(addContri1Input.value);
    //     addYear1 = Math.round(addYear1Input);
    //     addContri2 = parseInt(addContri2Input.value);
    //     addYear2 = Math.round(addYear2Input);
    //     // validation:
    //     // if (addContri1===0) {

    //     // }
    // } else {
    //     return
    // }

    let yearArr = yearArrGenerator(years);
    let iniPrincipalArr = iniPrincipalArrGenerator(years, iniPrincipal);
    let regContriArr = regContriArrGenerator(years, regContri, regFreq);
    let addContriArr = addContriArrGenerator(years);
    let totalArr = totalArrGenerator(years, compFreq, iniPrincipal, rate, regContri, regFreq);
    let interestArr = interestArrGenerator(years, totalArr, iniPrincipalArr, regContriArr, addContriArr);
    let dataArr = dataGenerator(iniPrincipalArr, regContriArr, addContriArr, interestArr);
    chart(yearArr, dataArr);
}