var xValues = [0, 2880, 5760, 8640, 11520, 14400, 17280, 20160, 23040, 25920, 28800, 31680, 34560, 37440, 40320,
        43200, 46080, 48960, 51840, 54720, 57600, 60480, 63360, 66240, 69120, 72000, 74880, 77760, 80640, 83520,
        86400, 89280, 92160, 95040, 97920, 100800, 103680, 106560, 109440, 112320, 115200
    ];
    var navettes = [1111, 1112, 1113, 1114,
        1211, 1212, 1213, 1214,
        2111, 2112, 2113, 2114,
        2211, 2212, 2213, 2214,
        3111, 3112, 3113, 3114,
        3211, 3212, 3213, 3214,
        4111, 4112, 4113, 4114,
        4211, 4212, 4213, 4214,
        5111, 5112, 5113, 5114,
        5211, 5212, 5213, 5214,
        6111, 6112, 6113, 6114,
        6211, 6212, 6213, 6214
    ];
    var rack = [11, 12, 13, 14, 15, 16, 17, 18,
        21, 22, 23, 24, 25, 26, 27, 28
    ];
    function parseData() {
        document.getElementById("resultText").value = "Success!";
        var shelf_left = document.getElementById("left_side").querySelectorAll("div");
        var elements_left = document.getElementById("left_side").querySelectorAll("div");
        var elements_right = document.getElementById("right_side").querySelectorAll("div");
        var shelf_right = document.getElementById("left_side").querySelectorAll("div");
        console.log(shelf_left);
        console.log(elements_left);
        console.log(elements_right);
        console.log(shelf_right);
        for (var i = 0; i < elements_left.length; i++) {
            elements_left[i].style.backgroundColor = "#7A8B99";
        }
        for (var i = 0; i < elements_right.length; i++) {
            elements_right[i].style.backgroundColor = "#7A8B99";
        }
        var inputText = document.getElementById("inputText").value;
        // Empty check
        if (inputText == "" || inputText == null) {
            document.getElementById("resultText").value = "Empty!";
        }
        // Length check
        if (inputText.length < 14 || inputText.length > 20) {
            document.getElementById("resultText").value = "Invalid length!";
        } else {
            // NRA check
            if (inputText[0] != "N" || inputText[1] != "R" || inputText[2] != "A") {
                document.getElementById("resultText").value = "Not a rack location!";
            }
            var aValue = inputText.substring(inputText.lastIndexOf("A") + 1, inputText.lastIndexOf("X"));
            if ((aValue.length != 4) || (isNaN(parseInt(aValue)))) {
                document.getElementById("resultText").value = "Invalid aisle value!";
            } else {
                var aValueArr = aValue.split("");
                aValueArr[2] = "1";
                aValue = aValueArr.join("");
                //Highlight the selected Navette
                for (var i = 0; i < navettes.length; i++) {
                    if (aValue == navettes[i]) {
                        document.getElementById(aValue).style.backgroundColor = "yellow";
                    } else {
                        document.getElementById(navettes[i]).style.backgroundColor = "#7A8B99";
                    }
                }
                var xValue = inputText.substring(inputText.lastIndexOf("X") + 1, inputText.lastIndexOf("Y"));
                document.getElementById("xtable").innerHTML = xValue;
                if (isNaN(parseInt(xValue))) {
                    document.getElementById("resultText").value = "Invalid X: not a number!";
                } else {
                    if (xValues.indexOf(parseInt(xValue)) == -1)
                        document.getElementById("resultText").value = "Invalid X value!";
                    else {
                        var fValue = 0;
                        while (xValue > -1) {
                            xValue -= 2880;
                            fValue++;
                        }
                        // correction due field numbering starting with 2 not 1
                        fValue++;
                        document.getElementById("ftable").innerHTML = fValue;
                    }
                }
                var yValue = inputText.substring(inputText.lastIndexOf("Y") + 1, inputText.lastIndexOf("Z"));
                var zValue = inputText.substring(inputText.lastIndexOf("Z") + 1);
                switch (yValue) {
                    case "01":
                    case "02":
                    case "03":
                    case "04":
                    case "05":
                        document.getElementById("ytable").innerHTML = yValue;
                        if (zValue[0] == "1") {
                            document.getElementById("l" + yValue).style.backgroundColor = "yellow";
                        } else if (zValue[0] == "2") {
                            document.getElementById("r" + yValue).style.backgroundColor = "yellow";
                        }
                        break;
                    default:
                        document.getElementById("resultText").value = "Invalid Y value!";
                }
                if (zValue.length == 1) {
                    if (zValue == "1") {
                        document.getElementById("x11").style.backgroundColor = "yellow";
                    } else if (zValue == "2") {
                        document.getElementById("x21").style.backgroundColor = "yellow";
                    } else {
                        document.getElementById("resultText").value = "Invalid Z value!";
                    }
                } else {
                    for (var i = 0; i < rack.length; i++) {
                        if (zValue != rack[i]) {
                            document.getElementById("x" + rack[i]).style.backgroundColor = "#7A8B99";
                            document.getElementById("ztable").innerHTML = "Invalid Z value!";
                        } else {};
                    }
                    switch (zValue) {
                        case "11":
                        case "12":
                        case "13":
                        case "14":
                        case "15":
                        case "16":
                        case "17":
                        case "18":
                        case "21":
                        case "22":
                        case "23":
                        case "24":
                        case "25":
                        case "26":
                        case "27":
                        case "28":
                            document.getElementById("x" + zValue).style.backgroundColor = "yellow";
                            document.getElementById("ztable").innerHTML = zValue;
                            break;
                        default:
                            document.getElementById("resultText").value = "Invalid Z value!";
                    }
                }
            }
        }
    }