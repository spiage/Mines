(function () {
    let minesScript = document.getElementById("minesScript");
    let mainDiv = document.createElement("div");
    document.body.insertBefore(mainDiv, minesScript);
    let fieldWidth = 30;
    let fieldHeight = 20;
    let fieldData = new Array();
    for (var i = 0; i < fieldHeight; i++) {
        let fieldLine = new Array();
        for (var j = 0; j < fieldWidth; j++) {
            fieldLine[j] = 0;
        }
        fieldData[i] = fieldLine;
    }
    let minesCount = 100;
    let minesMined = 0;
    while (minesMined < minesCount) {
        let tmpI = Math.floor(Math.random() * fieldHeight);
        let tmpJ = Math.floor(Math.random() * fieldWidth);
        if (fieldData[tmpI][tmpJ] == 0) {
            fieldData[tmpI][tmpJ] = 1;
            minesMined++;
        }
    }
    for (var i = 0; i < fieldHeight; i++) {
        let p = document.createElement("p");
        mainDiv.appendChild(p);
        for (var j = 0; j < fieldWidth; j++) {
            let btn = document.createElement("button");
            p.appendChild(btn);
            btn.id = "btn_" + i + "_" + j;
            if (1 == fieldData[i][j]) {
                btn.value = 9;
            }
            else {
                let minesAround = 0;
                function getMineAround(a, b) {
                    try {
                        return (isNaN(fieldData[a][b])) ? 0 : fieldData[a][b];
                    }
                    catch (e) {
                        return 0;
                    }
                }
                minesAround += getMineAround(i - 1, j - 1);
                minesAround += getMineAround(i - 1, j);
                minesAround += getMineAround(i - 1, j + 1);
                minesAround += getMineAround(i, j - 1);
                minesAround += getMineAround(i, j + 1);
                minesAround += getMineAround(i + 1, j - 1);
                minesAround += getMineAround(i + 1, j);
                minesAround += getMineAround(i + 1, j + 1);
                btn.value = minesAround;
            }
            btn.addEventListener("click", function () { CheckBoom(btn); })
        }
    }
    function CheckBoom(btnClicked) {
        if (!btnClicked.disabled) {
            let v = parseInt(btnClicked.value);
            btnClicked.disabled = true;
            if (9 == v) {
                btnClicked.innerHTML = "<img src=\"boom.png\" height=\"35px\" width=\"35px\" />";
            }
            else {
                btnClicked.innerHTML = "<span class=\"sc" + v + "\">" + v + "</span>";
                let arr = btnClicked.id.split("_");
                let a = parseInt(arr[1]);
                let b = parseInt(arr[2]);
                if (0 == btnClicked.value) {
                    function getButtonAround(a, b) { return document.getElementById("btn_" + a + "_" + b); }
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
}());