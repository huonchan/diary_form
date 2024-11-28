const dateInput = document.getElementById('date');
const textInput = document.getElementById('text');
const free1Input = document.getElementById('free1');
const free2Input = document.getElementById('free2');
const saveButton = document.getElementById('saveButton');
const diaryList = document.getElementById('diaryList');

// 保存ボタンクリック時の処理
saveButton.addEventListener('click', () => {
    const date = dateInput.value;
    const text = textInput.value;
    const free1 = free1Input.value;
    const free2 = free2Input.value;

    // ローカルストレージに保存
    const diaryEntry = {
        date: date,
        text: text,
        free1: free1,
        free2: free2
    };
    saveDiaryEntry(diaryEntry);

    // 日記一覧を更新
    displayDiaryEntries();

    // フォームをクリア
    clearForm();
});

// 日記エントリをローカルストレージに保存
function saveDiaryEntry(entry) {
    let diaryEntries = loadDiaryEntries();
    diaryEntries.push(entry);
    localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
}

// ローカルストレージから日記エントリを読み込み
function loadDiaryEntries() {
    const storedEntries = localStorage.getItem('diaryEntries');
    return storedEntries ? JSON.parse(storedEntries) : [];
}

// 日記一覧を表示
function displayDiaryEntries() {
    diaryList.innerHTML = ''; // 一旦クリア
    const diaryEntries = loadDiaryEntries();
    diaryEntries.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.innerHTML = `
            <h3>${entry.date}</h3>
            <p>${entry.text}</p>
            <p>自由入力欄1: ${entry.free1}</p>
            <p>自由入力欄2: ${entry.free2}</p>
        `;
        diaryList.appendChild(entryDiv);
    });
}

// フォームをクリア
function clearForm() {
    dateInput.value = '';
    textInput.value = '';
    free1Input.value = '';
    free2Input.value = '';
}

// 初期表示時に日記一覧を表示
displayDiaryEntries();