
// フォームを取得
const form = document.getElementById("touring-form");

// ルート形式と目的地入力欄を取得
const routeTypes = document.querySelectorAll(
    'input[name="routeType"]'
);

const destinationGroup =
    document.getElementById("destination-group");

const destinationInput =
    document.getElementById("destination");

// ルート形式が変更されたときの処理
routeTypes.forEach(function (routeType) {
    routeType.addEventListener("change", function () {

        const isOneWay = this.value === "oneway";

        // 片道なら目的地を表示
        destinationGroup.hidden = !isOneWay;

        // 片道なら目的地を必須にする
        destinationInput.required = isOneWay;
    });
});

// 送信結果を表示する場所を取得
const resultMessage = document.getElementById("result-message");

// フォームが送信されたときの処理
form.addEventListener("submit", function (event) {

    // ページの再読み込みを防ぐ
    event.preventDefault();

    // 入力された値を取得
    const time = document.getElementById("time").value;
    const distance = document.getElementById("distance").value;
    const direction = document.getElementById("direction").value;

    // 選択された道路の特徴を取得
    const roads = document.querySelectorAll('input[name="road"]:checked');

    const selectedRoads = [];

    roads.forEach(function (road) {
        selectedRoads.push(road.parentElement.textContent.trim());
    });

    // 入力内容を表示
    resultMessage.textContent =
        `${time}時間 / ${distance || "指定なし"}km`;

    // コンソールにも入力内容を表示
    console.log("希望時間:", time);
    console.log("希望距離:", distance);
    console.log("走りたい道:", selectedRoads);
    console.log("希望方面:", direction);

});
