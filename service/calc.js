const nums = [1,2,3,4,5,6,7,8,9,10];
const combinations = [];

for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    for (let k = j + 1; k < nums.length; k++) {
      combinations.push([nums[i], nums[j], nums[k]]);
    }
  }
}

export default function getRandomNumber() {
  const randomIndex = Math.floor(Math.random() * combinations.length);
  return combinations[randomIndex];
}
