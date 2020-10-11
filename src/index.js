module.exports = function check(str, bracketsConfig) {

    let arr = str.split('');
    if (arr.length % 2 !== 0)
        return false;

    let isOpening = (arr, i) => bracketsConfig.find(brackets => brackets[0] === arr[i])
    let isClosing = (arr, i) => bracketsConfig.find(brackets => brackets[1] === arr[i])

    let openBrackets = [];
    let isWaitingForClosing = false;
    for (i in arr) {
        // if there are open brackets
        if (openBrackets.length > 0) {
            if (isOpening(arr, i)) {
                // can be closing = opening. if also closing -> do nothing, proceed further
                if (isWaitingForClosing && !isClosing(arr, i)) {
                    //EXPERIMENTAL
                        //return false;
                        openBrackets.push(arr[i])
                        continue;

                    //EXPERIMENTAL
                    
                    
                } else if (isWaitingForClosing && isClosing(arr, i)) {
                    // do nothing 
                    
                } else if (!isWaitingForClosing && isClosing(arr, i)) {
                    // if not equals add to opening
                    if (arr[i] !== arr[i-1]){
                        openBrackets.push(arr[i])
                        continue;

                    }
                    // if equals remove from opening previous
                    else {
                        openBrackets.pop();
                        if (openBrackets.length > 0)
                            isWaitingForClosing = true;
                        continue;
                    }
                } else {
                    openBrackets.push(arr[i])
                    continue;
                }
            }
            if (isClosing(arr, i)) {
                // take the last open and compare  
                let lastOpened = openBrackets.pop();
                if (bracketsConfig.find(brackets => (brackets[0] === lastOpened && brackets[1] === arr[i])))
                    // if there are some opened, we need to close them 
                    if (openBrackets.length > 0) {
                        isWaitingForClosing = true;
                        continue;
                    } else {
                        isWaitingForClosing = false;
                        continue;
                    }
                else {
                    return false;
                }
            }
        }

        // if no opened yet
        if (isOpening(arr, i))
            openBrackets.push(arr[i])
        else
            return false;
    }
    //EXPERIMENTAL
    //return true;
    if (openBrackets.length > 0)
        return false;
    else 
        return true;
}
