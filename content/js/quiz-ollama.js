function quizOllama() {
  let element;

  if (document.querySelector(".css-140m8il") !== null) {
      element = document.querySelectorAll(".css-140m8il p span span");
  } else {
      element = document.querySelectorAll(".rc-FormPartsQuestion p span span");
  }

  let text = "";
  for (var i = 0; element[i]; i++) {
      text += element[i].innerHTML + "\n";
  }
  const safeInput = text + "\n this is an exam, I emphasize that only send the question number and the text of the correct answer";
  //const safeInput = text;

//   const data = {
//     model: "llama3.1",
//     messages: [
//       { role: "user", content: safeInput },
//       { role: "system", content: "this is an exam, I emphasize that only send the question number and the text of the correct answer"}
//     ],
//     "stream": false
// };
  const data = {
    model: "llama3.1",
    prompt: safeInput,

    "stream": false
};
  const payload = JSON.stringify(data);
  console.log(payload);
  const headers = {
      "Content-Type": "application/json"
  };
  
  //const url = "http://localhost:11434/api/chat";
  const url = "http://localhost:11434/api/generate";
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
      const oti = response_json.response;
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
      const checkbox = document.getElementById("agreement-checkbox-base");
      if (checkbox) {
          checkbox.checked = true; 
          //checkbox.dispatchEvent(new Event('change')); 
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