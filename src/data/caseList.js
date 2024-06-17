export default [
  ...Array.from({ length: 18 }, (_, i) => i + 1).filter(
    (n) => ![4, 13, 14].includes(n)
  ),
];
