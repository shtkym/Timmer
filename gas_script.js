function doPost(e) {
  // 1. データの解析
  var jsonString = e.postData.getDataAsString();
  var data = JSON.parse(jsonString);

  // 2. スプレッドシートを開く
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();

  // 3. パスワード確認（任意ですが推奨）
  var correctPassword = "YOUR_PASSWORD_HERE"; // ★ここに設定した合言葉を入れてください
  if (data.password !== correctPassword) {
    return ContentService.createTextOutput("Error: Wrong Password");
  }

  // 5. データの書き込み (Logs)
  if (data.logs && data.logs.length > 0) {
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Date", "Daily Goal", "Achieved", "Time", "Plan", "Actual", "Overtime (min)"]);
    }

    var date = data.date;
    var dailyGoal = data.dailyGoal;
    var achieved = data.goalAchieved ? "Yes" : "No";

    data.logs.forEach(function (log) {
      sheet.appendRow([
        date,
        dailyGoal,
        achieved,
        log.time,
        log.planned,
        log.actual,
        log.overtime || 0
      ]);
    });
  }

  // 6. アイデアの書き込み (Ideas) - NEW
  // アイデアがあれば "Ideas" シートに追記する
  if (data.ideas && data.ideas.length > 0) {
    var ideaSheet = ss.getSheetByName("Ideas");
    if (!ideaSheet) {
      ideaSheet = ss.insertSheet("Ideas");
      ideaSheet.appendRow(["Date", "Idea", "Context (Source)"]); // Header
    }

    // ヘッダーが無い場合のチェック（安全策）
    if (ideaSheet.getLastRow() === 0) {
      ideaSheet.appendRow(["Date", "Idea", "Context (Source)"]);
    }

    var date = data.date;
    data.ideas.forEach(function (idea) {
      ideaSheet.appendRow([
        date,
        idea.text,
        idea.source || "Quick Capture" // どこから登録したか（将来拡張用）
      ]);
    });
  }

  return ContentService.createTextOutput("Success");
}
