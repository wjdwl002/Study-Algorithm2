"use strict";

const ps = (function (process) {
  const readline = require("readline");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let lines = [];
  let cursor = 0;

  rl.on("line", function (line) {
    lines.push(line);
  });

  return {
    main(f) {
      f()
        .catch((err) => {
          console.error(err);
          process.exit(1);
        })
        .finally(() => {
          rl.close();
        });
    },
    use(name, f) {
      this[name] = f;
    },
    readLine: async function readLine() {
      return new Promise((resolve) => {
        if (cursor < lines.length) {
          resolve(lines[cursor++]);
        } else {
          setTimeout(() =>
            readLine().then((line) => {
              resolve(line);
            })
          );
        }
      });
    },
    async readArrayLine() {
      const line = await this.readLine();
      return line.split(/\s/).map((t) => parseInt(t));
    },
    write(data) {
      process.stdout.write(data + "");
    },
    writeLine(data) {
      process.stdout.write((data === undefined ? "" : data) + "\n");
    },
    range(start, end, step = 1) {
      if (end === undefined) {
        end = start;
        start = 0;
      }
      return {
        [Symbol.iterator]: function* () {
          for (let i = start; i < end; i += step) {
            yield i;
          }
        },
      };
    },
  };
})(process);


ps.main(async () => {
  /* main logic goes here */

  let x, y;
  let [num] = await ps.readArrayLine()
  let arr = [];
  let smallest = [];
  for (let i =0; i<num; i++){
      arr.push( [x,y] = await ps.readArrayLine()
      );
  }

  for(let i=0; i<arr.length-1; i++){
    if(arr[i][1]<arr[i+1][1]) smallest = arr[i];
    else if(arr[i][1]==arr[i+1][1]){
        smallest = arr[i][0] < arr[i+1][0] ? arr[i] : arr[i+1];
    }
    console.log('smallest',smallest);
    arr.splice(arr.findIndex((elem)=> elem= smallest)+1,1);
    console.log('arr',arr);
  }
});