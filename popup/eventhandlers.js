const useollama = document.getElementById("useLocalLLM");

useollama.addEventListener("change", function() {
    var state = useollama.checked;
    setToStorage("useLocalLLM", state); 
});

document.addEventListener('DOMContentLoaded', async () => {
    const useollama_ = await getFromStorage('useLocalLLM', false); 
    useollama.checked = Boolean(useollama_);
});

document.getElementById("solveQuizBtn").addEventListener("click", function() {
    if (useollama.checked) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                func: quizOllama,
            });
        });
    } else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                func: quizCloud,
            });
        });
    }
});
document.getElementById("gradePeersBtn").addEventListener("click", function() {
    console.log('eventhandler');
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                func: grade,
            });
    });
});