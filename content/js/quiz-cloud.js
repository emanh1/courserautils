function quizCloud() {
    let element;
  
    if (document.querySelector(".css-17s9u7d") !== null) {
        element = document.querySelectorAll(".css-17s9u7d p span span");
    } else {
        element = document.querySelectorAll(".rc-FormPartsQuestion p span span");
    }
  
    let text = "";
    for (var i = 0; element[i]; i++) {
        text += element[i].innerHTML + "\n";
    }
    console.log("collected text:");
    console.log(text);
    //const safeInput = text + "\n this is an exam, I emphasize that only send the question number and the text of the correct answer";
    const safeInput = text;
  
    const data = {
        messages: [{ role: "user", content: safeInput }, {role: "system", content: "this is an exam, I emphasize that only send the question number and the text of the correct answer"}]
    };
    
    const payload = JSON.stringify(data);
    const headers = {
        "Content-Type": "application/json"
    };
    
    const url = "https://api.pawan.krd/cosmosrp/v1/chat/completions";
    const startTime = performance.now(); 
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: payload
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    })
    .then(response_json => {
        const oti = response_json.choices[0].message.content;
        console.log(oti);
        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2); 
        console.log(`Time taken: ${timeTaken} ms`);
        for (var i = 0; element[i]; i++) {
            if (oti.toLowerCase().includes(element[i].innerHTML.toLowerCase())) {
                element[i].style = "border-style: solid; border-color: #0d7a0d;";
                element[i].click();
            }
        }
        // oti.forEach((qa) => {
        //     for (var i = 0; element[i]; i++) {
        //         // Match the element's innerHTML with the answer
        //         if (qa.answer && element[i].innerHTML.toLowerCase().includes(qa.answer.toLowerCase())) {
        //             element[i].style = "border-style: solid; border-color: #0d7a0d;";
        //             element[i].click(); // Click the correct answer
        //             break; // Move to the next question once the correct answer is found
        //         }
        //     }
        // });
        const checkbox = document.getElementById("agreement-checkbox-base");
        if (checkbox) {
            checkbox.checked = true; 
            checkbox.dispatchEvent(new Event('change')); 
        }
        
        const submitButton = document.querySelector("button.cds-105.cds-button-disableElevation.cds-button-primary");
        if (submitButton) {
            submitButton.click(); 
        }
  
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }