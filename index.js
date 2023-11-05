const wordSearchForm = document.getElementById('word-search-form');
const wordAppBody = document.querySelector('.word-app-body');
const wordListContainer = document.getElementById('word-list');
const loadingSpinner = document.getElementById('spinner');
const copyBtn = document.getElementById('copy-btn');
const Copys = document.getElementById("copys")
let wordNotFound = true;

const getInputWord = () => {
    wordSearchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let searchWord = wordSearchForm.search_word.value;
        fetchSynWords(searchWord);
        wordAppBody.style.display = "none";
    });
}

getInputWord();

const fetchSynWords = async(searchWord) => {
    let url = `https://api.datamuse.com/words?rel_syn=${searchWord}`;
    try {
        loadingSpinner.style.display = "flex";
        let response = await axios.get(url);
        let fetchedData = response.data;
        loadingSpinner.style.display = "none";
        renderWords(fetchedData);
    } catch (error) {
        console.log(error);
    }
}

const renderWords = (wordsArr) => {
    let htmlCode;
    if (wordsArr.length > 0) {
        wordNotFound = false;
        htmlCode = wordsArr.map(word => {
            return `<span class="word-item">${word.word}</span>`;
        });
        wordListContainer.innerHTML = htmlCode.join("");

        
        const wordItems = document.querySelectorAll('.word-item');
        wordItems.forEach(wordItem => {
            wordItem.addEventListener('click', () => {
                Copys.style.display = "block";
                Copys.innerText = "This Word is copyed";
                const clickedWord = wordItem.textContent.trim();
                navigator.clipboard.writeText(clickedWord);
                setTimeout(() => {
                    Copys.style.display = "none";
                }, 2000);
            });
        });
    } else {
        wordNotFound = true;
        htmlCode = "No search results found!";
        wordListContainer.innerHTML = htmlCode;
    }
    wordAppBody.style.display = "block";
}



const copyWordList = () => {
    if(!wordNotFound){
        Copys.style.display = "block";
        Copys.innerText = "All Words is Copyed";
        let words = (wordListContainer.textContent).split(" ");
        // removing the empty string element from the array
        let filteredWords = words.filter(word => word.length !== 0);
        console.log(word.length);
        let wordToCopy = filteredWords.join(", ");
        navigator.clipboard.writeText(wordToCopy);
        setTimeout(() => {
            Copys.style.display = "none";
        }, 2000);
    } else {
        console.log("Nothing to copy");
    }
}

copyBtn.addEventListener('click', copyWordList);





