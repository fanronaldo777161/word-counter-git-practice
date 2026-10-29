# Подсчёт слов — практика Git

Участники команды: Сихарулидзе, Чигрин.

Публичный репозиторий: https://github.com/fanronaldo777161/word-counter-git-practice

Фамилия Сихарулидзе добавлена через принятый PR #1. Осталось получить и принять PR Чигрина из его собственного форка. Подробности выполнения — в `REPORT.md`.

Программа на JavaScript считает слова в строке, UTF-8 файле или стандартном вводе. Нужен Node.js 18 или новее; зависимости устанавливать не требуется.

```powershell
node word-counter.js "Привет, мир! Это простой пример."
# Количество слов: 5
node word-counter.js --file README.md
$OutputEncoding = [System.Text.UTF8Encoding]::new($false)
"Один два три" | node word-counter.js
```

Слово — последовательность букв или цифр. Дефис и апостроф внутри слова сохраняются: «кто-то» считается одним словом. Знаки препинания и эмодзи сами по себе не считаются словами.

## Публикация на GitHub

1. Войдите в свой аккаунт на https://github.com или зарегистрируйтесь.
2. Создайте **публичный** репозиторий `word-counter-git-practice`. Не добавляйте на GitHub README, лицензию или .gitignore: они уже есть локально.
3. В PowerShell из папки проекта выполните команды, заменив `YOUR_LOGIN` своим логином:

```powershell
git remote add origin https://github.com/YOUR_LOGIN/word-counter-git-practice.git
git push -u origin main
git push origin revert-demo three-files
git push origin empty-team-file
```

Если `origin` уже существует, замените первую команду на `git remote set-url origin https://github.com/YOUR_LOGIN/word-counter-git-practice.git`.

## Пустой файл и пул-реквесты участников

Файл участников — `team.txt`. Метка `empty-team-file` указывает на отдельный коммит, в котором этот файл пуст. В текущей `main` уже есть фамилия Сихарулидзе после слияния PR #1.

Каждый участник, включая владельца, если преподаватель требует форк от каждого, выполняет работу из своего аккаунта GitHub. GitHub не разрешает создать личный форк собственного репозитория в том же аккаунте: в этом случае используйте отдельную ветку основного репозитория или согласуйте с преподавателем репозиторий организации.

### Второму участнику

1. Откройте опубликованный основной репозиторий, нажмите **Fork**, создайте форк в своём аккаунте.
2. В своём форке откройте `team.txt`, нажмите карандаш и допишите `Чигрин` отдельной строкой, сохранив уже имеющуюся фамилию. Сохраните строку с переводом строки в конце.
3. Нажмите **Commit changes**, затем **Contribute → Open pull request**. Проверьте, что базовый репозиторий — основной, базовая ветка — `main`.
4. Отправьте пул-реквест владельцу. Не заменяйте фамилию другого участника, если она уже появилась в файле.

Если преподаватель требует начинать именно с пустого файла, после создания форка выполните следующие команды (замените `CHIGRIN_LOGIN` своим логином):

```powershell
git clone https://github.com/CHIGRIN_LOGIN/word-counter-git-practice.git
cd word-counter-git-practice
git fetch origin --tags
git switch -c add-chigrin empty-team-file
[System.IO.File]::WriteAllText((Join-Path $PWD 'team.txt'), "Чигрин`n", [System.Text.UTF8Encoding]::new($false))
git add team.txt
git commit -m "Add Chigrin surname"
git push -u origin add-chigrin
```

Затем откройте PR из ветки `add-chigrin` своего форка в `main` основного репозитория. В этом варианте возможен конфликт с уже принятой фамилией Сихарулидзе: при разрешении конфликта сохраните обе фамилии на отдельных строках.

### Владельцу

Фамилия Сихарулидзе уже добавлена через PR #1. Примите PR второго участника кнопкой **Merge pull request**. Если оба начали с пустого файла, возможен конфликт: сохраните обе фамилии на отдельных строках. После слияний выполните `git pull --ff-only origin main`.

## Демонстрация операций Git

- `.gitignore` содержит `*.bin`. Локальный `ignored-example.bin` оставлен для проверки; он не отслеживается Git.
- `empty-team-file` — метка коммита с пустым `team.txt`.
- `revert-demo` создана от этого коммита. В ней текст добавлен в `team.txt`, затем отменён новым коммитом через `git revert`. Ветка слита в `main` с `--no-ff`.
- В `three-files` три файла добавлены тремя отдельными коммитами. В `main` через `git cherry-pick` перенесён только второй — `second.txt`.

```powershell
git log --all --graph --decorate --oneline
git show empty-team-file:team.txt
git check-ignore -v ignored-example.bin
git ls-files '*.bin'
git log --oneline three-files
git ls-tree --name-only main
```

Пустой вывод `git ls-files '*.bin'` означает, что bin-файлы не попали в репозиторий. В `main` должны отсутствовать `first.txt` и `third.txt`, а `second.txt` должен присутствовать.
