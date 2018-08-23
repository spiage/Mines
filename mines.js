(function () {
    var minesScript = document.getElementById("minesScript");
    var mainDiv = document.createElement("div");
    mainDiv.id = "mainDiv";
    document.body.insertBefore(mainDiv, minesScript);
    var minesPercent = document.getElementById("minesPercent");
    minesPercent.value = 10;
    minesPercent.addEventListener("change", function () { GenerateField(); });
    GenerateField();
}());
function getButtonAround(a, b) { return document.getElementById("btn_" + a + "_" + b); }
function CheckBoom(btnClicked) {
    if (!btnClicked.disabled) {
        var v = parseInt(btnClicked.value);
        btnClicked.disabled = true;
        if (9 == v) {
            btnClicked.innerHTML = "<img />";
        }
        else {
            /*TODO: change later by using Template literals + Babel (IE11 does not support it directly) */
            btnClicked.innerHTML = "<span class=\"sc" + v + "\">" + v + "</span>";
            var arr = btnClicked.id.split("_");
            var a = parseInt(arr[1]);
            var b = parseInt(arr[2]);
            if (0 == btnClicked.value) {
                var btn = getButtonAround(a - 1, b - 1); if (btn) { CheckBoom(btn); }
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
function GenerateField() {
    var mainDiv = document.getElementById("mainDiv");
    mainDiv.innerHTML = "";
    var fieldWidth = 10;
    var fieldHeight = 10;
    var fieldData = [];
    for (var i1 = 0; i1 < fieldHeight; i1++) {
        var fieldLine = [];
        for (var j1 = 0; j1 < fieldWidth; j1++) {
            fieldLine[j1] = 0;
        }
        fieldData[i1] = fieldLine;
    }
    var minesPercent = document.getElementById("minesPercent");
    var mp = parseInt(minesPercent.value);
    var minesCount = Math.round(fieldHeight * fieldWidth * (mp / 100));
    var minesMined = 0;
    while (minesMined < minesCount) {
        var tmpI = Math.floor(Math.random() * fieldHeight);
        var tmpJ = Math.floor(Math.random() * fieldWidth);
        if (fieldData[tmpI][tmpJ] == 0) {
            fieldData[tmpI][tmpJ] = 1;
            minesMined++;
        }
    }
    for (var i = 0; i < fieldHeight; i++) {
        var p = document.createElement("p");
        mainDiv.appendChild(p);
        for (var j = 0; j < fieldWidth; j++) {
            var btn = document.createElement("button");
            p.appendChild(btn);
            var btnId = "btn_" + i + "_" + j;
            btn.id = btnId;
            if (1 == fieldData[i][j]) {
                btn.value = 9;
            }
            else {
                var minesAround = 0;
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
function ButtonHandler() {
    return function (e) { CheckBoom(e.target); };
}

