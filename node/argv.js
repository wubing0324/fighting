function testargv(args) {
    console.log(args.slice(2))
}
testargv(process.argv)
// console.log(process.argv)
console.log(process.cwd)