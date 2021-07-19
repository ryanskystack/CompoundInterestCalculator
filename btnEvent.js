// global variable for additional investment
var cur_id = 1;
var deposit_limit = 2 ; // number of additional investment can be made. Subject to change.

// Create node
const addElement = (type) => {
    let element = document.createElement(type);
    return element;
};

// Create <label> node with for attribute
const addLabel = (txt, i) => {
    let forId = "input" + cur_id + i;
    let label = addElement("LABEL");
    let t = document.createTextNode(txt);
    label.setAttribute("for", forId);
    label.appendChild(t);
    return label;
};

// Create <label> node with attributes
const addInput = (i, defaultInputValue=null) => {
    let inputId = "input" + cur_id + i;
    let input = addElement("INPUT");
    input.setAttribute("id", inputId);
    input.setAttribute("inputmode", "numeric");
    input.setAttribute("type", "text");
    input.setAttribute("aria-required", "true");
    input.setAttribute("value",  defaultInputValue) ; 
    return input;
};

// Create the node pair of <label> and <input>
const addPair = (txt, i, defaultInputValue) => {
    let div = addElement("p");
    let label = addLabel(txt, i);
    let input = addInput(i, defaultInputValue);
    div.appendChild(label);
    div.appendChild(input);
    return div;
};

// Create the node block of 2 pairs with className
const addBlock = () => {
    let pair1 = addPair("Additional investment " + cur_id + ":", "a", 10000);
    let pair2 = addPair("At Year:", "b", 5);

    // place holder, hidden
    let pair3 = addPair("", "", "") ;
    pair3.children[1].setAttribute("style", "background-color:#fbfbfb;border:0px") ; 
    return [pair1, pair2, pair3];
};

// Create the documentFragment
const addContainer = () => {
    let addButton = document.getElementById("additionalDepositButton") ;
    let container = document.getElementsByClassName("yourStrategy")[0] ;
    addBlock().forEach(pair =>  
        container.insertBefore(pair, addButton) 
    );
    cur_id += 1;
    if (cur_id > deposit_limit) {
        addButton.setAttribute("style", "visibility:hidden") ;
    }
};

const confirmBtn = () => {
    if (cur_id <= 2) {
        addContainer();
    } 
};
