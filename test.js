const IDs = [1,2,3, 1, 3, 4, 5, 10];

const uniqIDs = Array.from(new Set(IDs).values());

console.log(uniqIDs);