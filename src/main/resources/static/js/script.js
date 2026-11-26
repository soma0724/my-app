
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

form.addEventListener("submit", async function (event) {

    // ページの再読み込みを防ぐ
    event.preventDefault();

    // 選択された道路の特徴を取得
    const roads = document.querySelectorAll(
        'input[name="road"]:checked'
    );

    const selectedRoads = [];

    roads.forEach(function (road) {
        selectedRoads.push(road.value);
    });

    // 利用者が入力した条件をオブジェクトにまとめる
    const touringConditions = {
        routeType: document.querySelector(
            'input[name="routeType"]:checked'
        ).value,

        destination: destinationInput.value,

        time: document.getElementById("time").value,

        distance: document.getElementById("distance").value,

        roads: selectedRoads,

        direction: document.getElementById("direction").value
    };

    // 入力内容を表示
    resultMessage.textContent = "ルートを検索しています...";

    // Spring Bootにデータを送信
    try {
        const response = await fetch("/api/touring", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(touringConditions)
        });

        // Spring Bootからの返答を取得
        const result = await response.text();

        if (!response.ok) {
            throw new Error(result);
        }

        resultMessage.textContent = result;

        console.log("送信した条件:", touringConditions);
        console.log("サーバーからの返答:", result);

    } catch (error) {
        console.error("通信エラー:", error);
        resultMessage.textContent =
            "サーバーとの通信に失敗しました。";
    }

});

