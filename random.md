
https://stackoverflow.com/questions/22252214/making-text-blink-a-certain-number-of-times
https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke
https://dev.to/masteringjs/using-then-vs-async-await-in-javascript-2pma


label {
  position: relative;
  width: 200px;
  height: 100px;
  border-radius: 50px;
  cursor: pointer;
}

input {
  position: absolute;
  display: none;
}

.slider {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50px;
  transition: 0.3s;
  background-color: var(--dark)
}

input:checked ~ .slider {
  background-color: var(--light);
}

.slider::before {
  content: "";
  position: absolute;
  top: 13px;
  left: 16px;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  box-shadow: inset 28px -4px 0px 0px var(--light);
  background-color: var(--dark);
  transition: 0.3s;
}

input:checked ~ .slider::before {
  transform: translateX(95px);
  box-shadow: none;
}
