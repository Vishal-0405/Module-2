let img1Clicked = false;
let img2Clicked = false;
let img3Clicked = false;
let img4Clicked = false;
let attempt = 0;
let allowedTimes = 2;
let sum = 0;
let name;
let username;

const form = document.getElementById("form");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");
const displayUsername = document.getElementById("displayUsername");
const dice = document.getElementById("dice");
const coupon = document.getElementById("coupon");
const result = document.getElementById("result");
const congo = document.getElementById("congoImg");

img1.addEventListener("click", function () {
  if (!img1Clicked) {
    form.style.display = "block";
    img1Clicked = true;
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  fname = document.getElementById("fname").value;
  username = document.getElementById("username").value;
  form.style.display = "none";
});

img2.addEventListener("click", function () {
  if (!img2Clicked && img1Clicked) {
    displayUsername.innerHTML = "Name: " + fname + "<br>" + "Username: " + username;
    displayUsername.style.display = "block";
    img2Clicked = true;
  }
});


img3.addEventListener("click", function () {
  if (!img3Clicked && img2Clicked) {
    dice.style.display = "block";
    // diceImg.style.display = "block";
    let diceImg = document.createElement("img");
    diceImg.src = "images/dice.jpg";
    diceImg.id = "diceImg";
    dice.appendChild(diceImg);
    img3Clicked = true;
    diceImg.addEventListener("click", function () {
        validateDiceAttempts()
      });
  }
});

function validateDiceAttempts() {
  if (attempt < 3 && allowedTimes > 0) {
    let randomNum = Math.floor(Math.random() * 6) + 1;
    result.innerHTML = ` The number you got is ${randomNum}. ${attempt - 2} attempt left`;
    result.style.display = "block";
    sum += randomNum;
    attempt++;

    if (attempt === 3) {
      allowedTimes--
      if (sum > 10) {
        img4.style.cursor = "pointer";
        result.innerHTML = `The number you got is ${randomNum}. Your total sum is ${sum}. You can click on next image to see your coupon code`;
        result.style.display = "block";
      } else 
       {
         if (attempt === 3) {
            if (allowedTimes <= 0) {
              result.innerHTML = `Bad luck. The number you got is ${randomNum}. Your present total is ${sum}. You missed by ${10 - sum}. Score more than 10 to unlock next image.  `;
              result.style.display = "block";
            } else {
              result.innerHTML = `Your Total Sum is ${sum} , which is less than 10 . Please Try Again. Click on Image 3. You have one more attempt left.`;
              result.style.display = "block";
          
              dice.removeChild(diceImg)
              img3Clicked=false;
              attempt = 0
              sum = 0
            }
          
         }

       }
    }
  }
}


img4.addEventListener("click", function () {
  if (!img4Clicked && sum > 10 && attempt === 3) {
    let couponCode = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 12; i++) {
      couponCode += characters.charAt(Math.floor(Math.random() * charactersLength));

    }
    diceImg.style.display = "none";
    coupon.innerHTML = `You have unlocked a coupon. Your coupon code is ${couponCode}`;
    coupon.style.display = "block";

    result.innerHTML = "Congratulations!";
    result.style.display = "block";

    img4Clicked = true;
    congo.style.display = "block";
    let congoImg = document.createElement("img");
    congoImg.src = "images/cc.png";
    congoImg.id = "congoImg";
    congo.appendChild(congoImg);
  }
});