let numbers = [1, 2, 11, 22, 333]
let filterNumbers = []

for (let i = 0; i < numbers.length; i++) { 
    if (numbers[i] > 10) {
        filterNumbers.push(numbers[i])
    }
}