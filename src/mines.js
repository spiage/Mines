// jshint esversion: 6
(function () {
    let minesScript = document.getElementById("minesScript");
    let mainDiv = document.createElement("div");
    mainDiv.id = "mainDiv";
    document.body.insertBefore(mainDiv, minesScript);
    let minesPercent = document.getElementById("minesPercent");
    minesPercent.value = 10;
    minesPercent.addEventListener("change", function () { GenerateField(); });
    GenerateField();
}());
function getButtonAround(a, b) { return document.getElementById(`btn_${a}_${b}`); }
function CheckBoom(btnClicked) {
    if (!btnClicked.disabled) {
        let v = parseInt(btnClicked.value);
        btnClicked.disabled = true;
        if (9 == v) {
            btnClicked.innerHTML = "<img />";
        }
        else {
            /*TODO: change later by using Template literals + Babel (IE11 does not support it directly) */
            btnClicked.innerHTML = "<span class=\"sc" + v + "\">" + v + "</span>";
            let arr = btnClicked.id.split("_");
            let a = parseInt(arr[1]);
            let b = parseInt(arr[2]);
            if (0 == btnClicked.value) {
                let btn = getButtonAround(a - 1, b - 1); if (btn) { CheckBoom(btn); }
                btn = getButtonAround(a - 1, b); if (btn) { CheckBoom(btn); }
                btn = getButtonAround(a - 1, b + 1); if (btn) { CheckBoom(btn); }
                btn = getButtonAround(a, b - 1); if (btn) { CheckBoom(btn); }
                btn = getButtonAround(a, b + 1); if (btn) { CheckBoom(btn); }
                btn = getButtonAround(a + 1, b - 1); if (btn) { CheckBoom(btn); }
                btn = getButtonAround(a + 1, b); if (btn) { CheckBoom(btn); }
                btn = getButtonAround(a + 1, b + 1); if (btn) { CheckBoom(btn); }
            }
        }
    }
}
function getMineAround(a, b, fieldData) {
    try {
        return (isNaN(fieldData[a][b])) ? 0 : fieldData[a][b];
    }
    catch (e) {
        return 0;
    }
}
function ButtonHandler() {
    return function (e) { CheckBoom(e.target); };
}
function GenerateField() {
    let mainDiv = document.getElementById("mainDiv");
    mainDiv.innerHTML = "";
    let fieldWidth = 10;
    let fieldHeight = 10;
    let fieldData = [];
    for (let i1 = 0; i1 < fieldHeight; i1++) {
        let fieldLine = [];
        for (let j1 = 0; j1 < fieldWidth; j1++) {
            fieldLine[j1] = 0;
        }
        fieldData[i1] = fieldLine;
    }
    let minesPercent = document.getElementById("minesPercent");
    let mp = parseInt(minesPercent.value);
    let minesCount = Math.round(fieldHeight * fieldWidth * (mp / 100));
    let minesMined = 0;
    while (minesMined < minesCount) {
        let tmpI = Math.floor(Math.random() * fieldHeight);
        let tmpJ = Math.floor(Math.random() * fieldWidth);
        if (fieldData[tmpI][tmpJ] == 0) {
            fieldData[tmpI][tmpJ] = 1;
            minesMined++;
        }
    }
    for (let i = 0; i < fieldHeight; i++) {
        let p = document.createElement("p");
        mainDiv.appendChild(p);
        for (let j = 0; j < fieldWidth; j++) {
            let btn = document.createElement("button");
            p.appendChild(btn);
            let btnId = "btn_" + i + "_" + j;
            btn.id = btnId;
            if (1 == fieldData[i][j]) {
                btn.value = 9;
            }
            else {
                let minesAround = 0;
                minesAround += getMineAround(i - 1, j - 1, fieldData);
                minesAround += getMineAround(i - 1, j, fieldData);
                minesAround += getMineAround(i - 1, j + 1, fieldData);
                minesAround += getMineAround(i, j - 1, fieldData);
                minesAround += getMineAround(i, j + 1, fieldData);
                minesAround += getMineAround(i + 1, j - 1, fieldData);
                minesAround += getMineAround(i + 1, j, fieldData);
                minesAround += getMineAround(i + 1, j + 1, fieldData);
                btn.value = minesAround;
            }
            btn.addEventListener("click", ButtonHandler());
        }
    }
}
