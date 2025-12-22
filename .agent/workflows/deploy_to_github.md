---
description: ローカルの変更をGitHubに反映（デプロイ）する
---

1. 変更をステージング
// turbo
git add .

2. 変更をコミット（日時の自動付与）
// turbo
git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')"

3. GitHubへプッシュ
// turbo
git push
