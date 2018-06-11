/*API keys for students
var fAPI1 = '023f1661f6244d3e9f81501646ef9a0f';
var fAPI2 = '17a26f2fbc9240aebfb272df98928812';
var tAPI1 = '8e9100485bab4a7a8b3b261626e7e3c6';
var tAPI2 = '7e3029df2246402ebd81c3b480eb813b';
*/


(function() {
  const SUBSCRIPTION_KEY = '17a26f2fbc9240aebfb272df98928812';
  const URI_BASE = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';
  const URL = `${URI_BASE}?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender`;

  //cache DOM
  let img = document.getElementsByTagName('img')[0];
  let attributesSection = document.getElementById('attributes');
  let input = document.getElementById('input');
  const analyseButton = document.getElementById('analyseButton');

  //bind events
  analyseButton.addEventListener('click', () => {
    processImage();
  });

  function processImage() {
    const sourceImageUrl = input.value;
    img.src = sourceImageUrl;
    attributesSection.innerHTML = '';

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY
    });

    const initObject = {
      method: 'POST',
      headers,
      body: JSON.stringify({url: sourceImageUrl})
    }

    fetch(URL, initObject)
      .then(result => result.json())
      .then(result => {
        if(result.length) {
          result.forEach((face, index) => {
            let personNumber = index + 1;
            let person = document.createElement('div');

            let h4 = document.createElement('h4');
            let h4Text = document.createTextNode(`person ${personNumber}:`);

            let age = document.createElement('p');
            let ageText = document.createTextNode(`age: ${face.faceAttributes.age}`);

            let gender = document.createElement('p');
            let genderText = document.createTextNode(`gender: ${face.faceAttributes.gender}`);

            h4.appendChild(h4Text);
            age.appendChild(ageText);
            gender.appendChild(genderText);

            person.appendChild(h4);
            person.appendChild(age);
            person.appendChild(gender);

            attributesSection.appendChild(person);
          });
        } else {
          let p = document.createElement('p');
          p.innerText = 'No Faces Detected';
          attributesSection.appendChild(p);
        }
      })
      .catch(err => console.error(err));
  }
})();
